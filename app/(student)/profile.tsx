import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useAuth } from '@/contexts/AuthContext';
import { Student } from '@/types/user';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  LogOut,
  Settings,
  Star,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { userData, logout } = useAuth();
  const student = userData as Student;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <AnimatedBackground>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <GlassCard style={styles.card} delay={100}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student?.fullName?.[0] || 'S'}
              </Text>
            </View>
            <Text style={styles.name}>{student?.fullName}</Text>
            <Text style={styles.role}>Student</Text>
            <View style={styles.loyaltyContainer}>
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.loyaltyPoints}>
                {student?.loyaltyPoints || 0} Points
              </Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.card} delay={200}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoRow}>
            <Mail size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{student?.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Phone size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{student?.phone || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>{student?.city}</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.card} delay={300}>
          <Text style={styles.sectionTitle}>Academic Information</Text>

          <View style={styles.infoRow}>
            <GraduationCap size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>University</Text>
              <Text style={styles.infoValue}>{student?.university}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <BookOpen size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Degree Program</Text>
              <Text style={styles.infoValue}>{student?.degreeProgram}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <BookOpen size={20} color="#a78bfa" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Semester</Text>
              <Text style={styles.infoValue}>{student?.semester}</Text>
            </View>
          </View>
        </GlassCard>

        <TouchableOpacity style={styles.settingsButton}>
          <GlassCard style={styles.settingsCard} delay={400}>
            <Settings size={24} color="#a78bfa" />
            <Text style={styles.settingsText}>Settings</Text>
          </GlassCard>
        </TouchableOpacity>

        <AnimatedButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>UniCraft v1.0.0</Text>
        </View>
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
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#a78bfa',
    marginBottom: 12,
  },
  loyaltyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loyaltyPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fbbf24',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
  },
  settingsButton: {
    marginBottom: 20,
  },
  settingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  logoutButton: {
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
