import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedInput } from '@/components/AnimatedInput';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useAuth } from '@/contexts/AuthContext';
import { Writer } from '@/types/user';

const SUBJECTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Business',
  'Economics',
  'Psychology',
];

export default function WriterRegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    qualification: '',
    university: '',
    yearsOfExperience: '',
    cnic: '',
    bio: '',
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = 'CNIC is required';
    }

    if (selectedSubjects.length === 0) {
      Alert.alert('Error', 'Please select at least one subject');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const writerData: Partial<Writer> = {
        fullName: formData.fullName,
        role: 'writer',
        qualification: formData.qualification,
        university: formData.university,
        expertiseSubjects: selectedSubjects,
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        cnic: formData.cnic,
        bio: formData.bio,
        isVerified: false,
        isAvailable: true,
        rating: 0,
        totalReviews: 0,
        completedOrders: 0,
        earnings: 0,
        badge: 'Bronze',
        performanceScore: 0,
      };

      await signUp(formData.email, formData.password, writerData);
      Alert.alert(
        'Success',
        'Your account has been created and is pending verification!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(writer)/home'),
          },
        ]
      );
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }

      Alert.alert('Registration Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  return (
    <AnimatedBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Writer Registration</Text>
          <Text style={styles.subtitle}>Join as an expert writer</Text>
        </View>

        <GlassCard style={styles.card}>
          <AnimatedInput
            label="Full Name"
            value={formData.fullName}
            onChangeText={(text) => updateField('fullName', text)}
            placeholder="Enter your full name"
            error={errors.fullName}
          />

          <AnimatedInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <AnimatedInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="Create a password"
            isPassword
            error={errors.password}
          />

          <AnimatedInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            placeholder="Confirm your password"
            isPassword
            error={errors.confirmPassword}
          />

          <AnimatedInput
            label="Qualification"
            value={formData.qualification}
            onChangeText={(text) => updateField('qualification', text)}
            placeholder="e.g., PhD in Computer Science"
            error={errors.qualification}
          />

          <AnimatedInput
            label="University"
            value={formData.university}
            onChangeText={(text) => updateField('university', text)}
            placeholder="Your university name"
            error={errors.university}
          />

          <AnimatedInput
            label="Years of Experience"
            value={formData.yearsOfExperience}
            onChangeText={(text) => updateField('yearsOfExperience', text)}
            placeholder="Years of experience"
            keyboardType="numeric"
            error={errors.yearsOfExperience}
          />

          <AnimatedInput
            label="CNIC Number"
            value={formData.cnic}
            onChangeText={(text) => updateField('cnic', text)}
            placeholder="XXXXX-XXXXXXX-X"
            keyboardType="numeric"
            error={errors.cnic}
          />

          <AnimatedInput
            label="Short Bio"
            value={formData.bio}
            onChangeText={(text) => updateField('bio', text)}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Expertise Subjects *</Text>
          <View style={styles.subjectsContainer}>
            {SUBJECTS.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.subjectChip,
                  selectedSubjects.includes(subject) &&
                    styles.subjectChipSelected,
                ]}
                onPress={() => toggleSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectText,
                    selectedSubjects.includes(subject) &&
                      styles.subjectTextSelected,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AnimatedButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginTextBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
  },
  card: {
    width: '100%',
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  subjectChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  subjectChipSelected: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  subjectText: {
    color: '#d1d5db',
    fontSize: 14,
  },
  subjectTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
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
