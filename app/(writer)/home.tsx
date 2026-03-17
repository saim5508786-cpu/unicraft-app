import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { useAuth } from '@/contexts/AuthContext';
import { Writer } from '@/types/user';
import { DollarSign, TrendingUp, Star, Award, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';

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

  return <Text style={styles.statValue}>${displayValue}</Text>;
};

export default function WriterHomeScreen() {
  const { userData } = useAuth();
  const writer = userData as Writer;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum':
        return '#e5e7eb';
      case 'Gold':
        return '#fbbf24';
      case 'Silver':
        return '#9ca3af';
      default:
        return '#92400e';
    }
  };

  return (
    <AnimatedBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name}>{writer?.fullName || 'Writer'}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>{writer?.fullName?.[0] || 'W'}</Text>
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.card} delay={100}>
          <View style={styles.badgeContainer}>
            <Award size={32} color={getBadgeColor(writer?.badge || 'Bronze')} />
            <Text style={styles.badgeText}>{writer?.badge || 'Bronze'} Writer</Text>
            {writer?.isVerified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle size={16} color="#34d399" fill="#34d399" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
        </GlassCard>

        <GlassCard style={styles.earningsCard} delay={200}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <AnimatedNumber value={writer?.earnings || 0} />
          <View style={styles.earningsFooter}>
            <TrendingUp size={16} color="#34d399" />
            <Text style={styles.earningsGrowth}>+12% this month</Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.statsCard} delay={300}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <CheckCircle size={20} color="#34d399" />
              </View>
              <Text style={styles.statNumber}>{writer?.completedOrders || 0}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Star size={20} color="#fbbf24" />
              </View>
              <Text style={styles.statNumber}>{writer?.rating?.toFixed(1) || '0.0'}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <TrendingUp size={20} color="#7c3aed" />
              </View>
              <Text style={styles.statNumber}>{writer?.performanceScore || 0}%</Text>
              <Text style={styles.statLabel}>Performance</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <DollarSign size={20} color="#34d399" />
              </View>
              <Text style={styles.statNumber}>
                ${Math.floor((writer?.earnings || 0) / Math.max(writer?.completedOrders || 1, 1))}
              </Text>
              <Text style={styles.statLabel}>Avg. Order</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.section} delay={400}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Assignments</Text>
            <Text style={styles.count}>12 new</Text>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Browse assignments to start earning
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.section} delay={500}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Clock size={24} color="#a78bfa" />
              <Text style={styles.actionText}>Set Availability</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Award size={24} color="#a78bfa" />
              <Text style={styles.actionText}>View Portfolio</Text>
            </TouchableOpacity>
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
  card: {
    marginBottom: 20,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34d399',
  },
  earningsCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#34d399',
  },
  earningsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  earningsGrowth: {
    fontSize: 14,
    color: '#34d399',
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
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
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a78bfa',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  actionText: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
  },
});
