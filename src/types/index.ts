export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  title?: string;
  enrolledCourseIds: string[];
  wishlistCourseIds: string[];
  completedCourseIds: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  courseCount: number;
  color: string;
  gradient: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  coursesCount: number;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export interface LessonResource {
  title: string;
  url: string;
  size: string;
  type: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  durationMinutes: number;
  type: 'video' | 'reading' | 'quiz' | 'project';
  videoUrl: string;
  description: string;
  resources: LessonResource[];
  isPreview?: boolean;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount: number;
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseBadge = 'Bestseller' | 'Highest Rated' | 'Trending' | 'New' | 'Free';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  instructorId: string;
  instructor: Instructor;
  thumbnail: string;
  previewVideoUrl: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  level: CourseLevel;
  duration: string;
  durationHours: number;
  totalLessons: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  badge?: CourseBadge;
  isFeatured?: boolean;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  modules: Module[];
  updatedAt: string;
  language: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessonIds: string[];
  percentage: number;
  lastLessonId?: string;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  grade: string;
  verificationUrl: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

export interface FilterOptions {
  category: string;
  search: string;
  level: string;
  price: 'all' | 'free' | 'paid' | 'under50' | 'under100';
  rating: number;
  duration: 'all' | 'short' | 'medium' | 'long' | 'extra-long';
  sort: 'popular' | 'rating' | 'newest' | 'price-asc' | 'price-desc';
}
