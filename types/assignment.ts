export type AssignmentCategory =
  | 'Essay'
  | 'Research Paper'
  | 'Thesis'
  | 'Dissertation'
  | 'Presentation'
  | 'Coding Assignment'
  | 'Math Problems'
  | 'Science Lab Report'
  | 'Case Study'
  | 'Literature Review'
  | 'Business Plan'
  | 'Book Report';

export type ReferencingStyle = 'APA' | 'MLA' | 'Harvard' | 'Chicago' | 'IEEE';

export type UrgencyLevel = 'Normal' | 'Urgent' | 'Very Urgent';

export type OrderStatus =
  | 'Submitted'
  | 'Writer Assigned'
  | 'In Progress'
  | 'Review'
  | 'Completed'
  | 'Revision Requested'
  | 'Cancelled';

export interface Assignment {
  id: string;
  studentId: string;
  writerId?: string;
  title: string;
  subject: string;
  category: AssignmentCategory;
  description: string;
  deadline: number;
  wordCount: number;
  budget: number;
  urgencyLevel: UrgencyLevel;
  specialInstructions?: string;
  referencingStyle: ReferencingStyle;
  plagiarismFree: boolean;
  files: string[];
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  completedFile?: string;
  rating?: number;
  review?: string;
  revisionHistory: Revision[];
}

export interface Revision {
  id: string;
  reason: string;
  message: string;
  requestedAt: number;
  completedAt?: number;
  status: 'Pending' | 'Completed';
}

export interface Bid {
  id: string;
  assignmentId: string;
  writerId: string;
  price: number;
  deliveryTime: number;
  coverMessage: string;
  sampleFile?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Withdrawn';
  createdAt: number;
}
