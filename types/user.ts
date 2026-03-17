export type UserRole = 'student' | 'writer' | 'admin';

export interface BaseUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  profilePicture?: string;
  phone?: string;
  createdAt: number;
}

export interface Student extends BaseUser {
  role: 'student';
  university: string;
  degreeProgram: string;
  semester: string;
  city: string;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  favoriteWriters: string[];
}

export interface Writer extends BaseUser {
  role: 'writer';
  qualification: string;
  university: string;
  expertiseSubjects: string[];
  yearsOfExperience: number;
  cnic: string;
  bio: string;
  sampleWork?: string;
  isVerified: boolean;
  isAvailable: boolean;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  earnings: number;
  badge: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  performanceScore: number;
}

export interface Admin extends BaseUser {
  role: 'admin';
  isSuperAdmin: boolean;
}
