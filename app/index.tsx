import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function SplashScreen() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  const scale = useSharedValue(0.5);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withTiming(1, { duration: 1000 });
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: 3000 }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (user && userData) {
          if (userData.role === 'student') {
            router.replace('/(student)/home');
          } else if (userData.role === 'writer') {
            router.replace('/(writer)/home');
          } else if (userData.role === 'admin') {
            router.replace('/(admin)/home');
          }
        } else {
          router.replace('/onboarding');
        }
      }, 2500);
    }
  }, [user, userData, loading]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <AnimatedLinearGradient
            colors={['#7c3aed', '#a78bfa', '#c4b5fd']}
            style={styles.logo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoText}>UC</Text>
          </AnimatedLinearGradient>
        </Animated.View>
        <Animated.View style={textStyle}>
          <Text style={styles.title}>UniCraft</Text>
          <Text style={styles.tagline}>Your Academic Success Partner</Text>
        </Animated.View>
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#a78bfa',
    textAlign: 'center',
  },
});
