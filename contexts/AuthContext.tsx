import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUser, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  userData: BaseUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    userData: Partial<BaseUser>
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as BaseUser;
          setUserData(data);
          await AsyncStorage.setItem('userId', firebaseUser.uid);
          await AsyncStorage.setItem('userRole', data.role);
        }
      } else {
        setUserData(null);
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    additionalData: Partial<BaseUser>
  ) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser: BaseUser = {
      id: credential.user.uid,
      email,
      createdAt: Date.now(),
      ...additionalData,
    } as BaseUser;

    await setDoc(doc(db, 'users', credential.user.uid), newUser);
    setUserData(newUser);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.clear();
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
