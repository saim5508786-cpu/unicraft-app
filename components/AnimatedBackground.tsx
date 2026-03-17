import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  const rotation = useSharedValue(0);
  const opacity1 = useSharedValue(0.8);
  const opacity2 = useSharedValue(0.6);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );

    opacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0.6, { duration: 3000 })
      ),
      -1,
      true
    );

    opacity2.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 4000 }),
        withTiming(0.4, { duration: 4000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={['#0a0015', '#1a0033', '#2d1b4e', '#1a0033', '#0a0015']}
        style={[styles.gradient, animatedStyle]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AnimatedLinearGradient
        colors={['#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed', '#8b5cf6']}
        style={[styles.aurora, animatedStyle2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.particles}>
        {[...Array(30)].map((_, i) => (
          <Particle key={i} delay={i * 200} />
        ))}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const Particle = ({ delay }: { delay: number }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(-600, { duration: 8000 + Math.random() * 4000, easing: Easing.linear })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: delay }),
        withTiming(1, { duration: 1000 }),
        withTiming(1, { duration: 5000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const randomLeft = Math.random() * 100;
  const randomSize = Math.random() * 3 + 1;

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: `${randomLeft}%`,
          width: randomSize,
          height: randomSize,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  aurora: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
    opacity: 0.3,
  },
  particles: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    top: '100%',
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});
