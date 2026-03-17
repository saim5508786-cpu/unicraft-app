import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { GraduationCap, PenTool, Shield } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const RoleCard = ({
  title,
  description,
  icon: Icon,
  onPress,
  delay,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  onPress: () => void;
  delay: number;
  color: string;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={animatedStyle}
    >
      <GlassCard style={styles.card} delay={delay}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={40} color="#ffffff" strokeWidth={2} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </GlassCard>
    </AnimatedTouchable>
  );
};

export default function RoleSelectionScreen() {
  const router = useRouter();

  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Join UniCraft</Text>
          <Text style={styles.subtitle}>Select your role to continue</Text>
        </View>

        <View style={styles.cardsContainer}>
          <RoleCard
            title="Student"
            description="Submit assignments and get expert help"
            icon={GraduationCap}
            onPress={() => router.push('/auth/student-register')}
            delay={0}
            color="#7c3aed"
          />

          <RoleCard
            title="Writer"
            description="Earn by helping students with assignments"
            icon={PenTool}
            onPress={() => router.push('/auth/writer-register')}
            delay={200}
            color="#8b5cf6"
          />

          <RoleCard
            title="Admin"
            description="Manage platform and users"
            icon={Shield}
            onPress={() => router.push('/auth/admin-login')}
            delay={400}
            color="#a78bfa"
          />
        </View>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginTextBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  loginLink: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  loginTextBold: {
    color: '#a78bfa',
    fontWeight: '600',
  },
});
