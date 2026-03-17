import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { FileText } from 'lucide-react-native';

export default function OrdersScreen() {
  return (
    <AnimatedBackground>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Orders</Text>
        <GlassCard style={styles.card} delay={100}>
          <View style={styles.emptyState}>
            <FileText size={48} color="#6b7280" strokeWidth={1.5} />
            <Text style={styles.emptyText}>No orders yet</Text>
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
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },
  card: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 16,
  },
});
