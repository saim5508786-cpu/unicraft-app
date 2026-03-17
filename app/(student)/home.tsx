import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useAuth } from '@/contexts/AuthContext';
import { Student } from '@/types/user';
import { Plus, FileText, Clock, CircleCheck as CheckCircle, DollarSign, TrendingUp, Star, Users } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <Text style={styles.statValue}>{displayValue}</Text>;
};

export default function StudentHomeScreen() {
  const router = useRouter();
  const { userData } = useAuth();
  const student = userData as Student;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <AnimatedBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name}>{student?.fullName || 'Student'}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student?.fullName?.[0] || 'S'}
            </Text>
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.statsCard} delay={100}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <FileText size={20} color="#a78bfa" />
              </View>
              <AnimatedNumber value={student?.totalOrders || 0} />
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Clock size={20} color="#fbbf24" />
              </View>
              <AnimatedNumber value={student?.activeOrders || 0} />
              <Text style={styles.statLabel}>Active</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <CheckCircle size={20} color="#34d399" />
              </View>
              <AnimatedNumber value={student?.completedOrders || 0} />
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <DollarSign size={20} color="#7c3aed" />
              </View>
              <AnimatedNumber value={student?.totalSpent || 0} />
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>
        </GlassCard>

        <AnimatedButton
          title="Submit New Assignment"
          onPress={() => router.push('/(student)/submit-assignment' as any)}
          style={styles.submitButton}
        />

        <GlassCard style={styles.section} delay={200}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Orders</Text>
            <TouchableOpacity onPress={() => router.push('/(student)/orders' as any)}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {student?.activeOrders === 0 ? (
            <View style={styles.emptyState}>
              <FileText size={48} color="#6b7280" strokeWidth={1.5} />
              <Text style={styles.emptyText}>No active orders</Text>
              <Text style={styles.emptySubtext}>
                Start by submitting your first assignment
              </Text>
            </View>
          ) : (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Sample Assignment</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>In Progress</Text>
                </View>
              </View>
              <Text style={styles.orderSubject}>Computer Science</Text>
              <View style={styles.orderFooter}>
                <View style={styles.deadlineContainer}>
                  <Clock size={16} color="#fbbf24" />
                  <Text style={styles.deadline}>2 days left</Text>
                </View>
                <Text style={styles.orderPrice}>$50</Text>
              </View>
            </View>
          )}
        </GlassCard>

        <GlassCard style={styles.section} delay={300}>
          <Text style={styles.sectionTitle}>Recommended Writers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.writerCard}>
                <View style={styles.writerAvatar}>
                  <Text style={styles.writerAvatarText}>W{index + 1}</Text>
                </View>
                <Text style={styles.writerName}>Writer {index + 1}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.rating}>4.{8 - index}</Text>
                </View>
                <Text style={styles.writerSubject}>Computer Science</Text>
              </View>
            ))}
          </ScrollView>
        </GlassCard>

        <GlassCard style={styles.section} delay={400}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <TrendingUp size={24} color="#34d399" />
              <Text style={styles.quickStatValue}>85%</Text>
              <Text style={styles.quickStatLabel}>Success Rate</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Star size={24} color="#fbbf24" />
              <Text style={styles.quickStatValue}>
                {student?.loyaltyPoints || 0}
              </Text>
              <Text style={styles.quickStatLabel}>Loyalty Points</Text>
            </View>
          </View>
        </GlassCard>
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#d1d5db',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  statsCard: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  submitButton: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  viewAll: {
    fontSize: 14,
    color: '#a78bfa',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  orderCard: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  orderSubject: {
    fontSize: 14,
    color: '#a78bfa',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadline: {
    fontSize: 14,
    color: '#fbbf24',
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#34d399',
  },
  writerCard: {
    width: 120,
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  writerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  writerAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  writerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#d1d5db',
  },
  writerSubject: {
    fontSize: 12,
    color: '#9ca3af',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});
