import { Course, Category, Instructor, Review, User, CourseProgress, Certificate, PaymentRecord } from '../types';
import { CATEGORIES, INSTRUCTORS, COURSES, REVIEWS, DEMO_USERS } from '../data/mockData';

const STORAGE_KEYS = {
  COURSES: 'eduversity_courses_v1',
  INSTRUCTORS: 'eduversity_instructors_v1',
  CATEGORIES: 'eduversity_categories_v1',
  REVIEWS: 'eduversity_reviews_v1',
  CURRENT_USER: 'eduversity_user_v1',
  PROGRESS: 'eduversity_progress_v1',
  CERTIFICATES: 'eduversity_certificates_v1',
  PAYMENTS: 'eduversity_payments_v1',
};

// Dispatch a custom window event whenever database state changes
function notifyDbChange() {
  window.dispatchEvent(new CustomEvent('eduversity_db_change'));
}

export class EduversityDatabase {
  private courses: Course[] = [];
  private instructors: Instructor[] = [];
  private categories: Category[] = [];
  private reviews: Review[] = [];
  private currentUser: User | null = null;
  private progress: Record<string, CourseProgress> = {};
  private certificates: Certificate[] = [];
  private payments: PaymentRecord[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // 1. Categories
    const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (savedCategories) {
      try {
        this.categories = JSON.parse(savedCategories);
      } catch {
        this.categories = [...CATEGORIES];
      }
    } else {
      this.categories = [...CATEGORIES];
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
    }

    // 2. Instructors
    const savedInstructors = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
    if (savedInstructors) {
      try {
        this.instructors = JSON.parse(savedInstructors);
      } catch {
        this.instructors = [...INSTRUCTORS];
      }
    } else {
      this.instructors = [...INSTRUCTORS];
      localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(this.instructors));
    }

    // 3. Courses
    const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (savedCourses) {
      try {
        this.courses = JSON.parse(savedCourses);
      } catch {
        this.courses = [...COURSES];
      }
    } else {
      this.courses = [...COURSES];
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(this.courses));
    }

    // 4. Reviews
    const savedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (savedReviews) {
      try {
        this.reviews = JSON.parse(savedReviews);
      } catch {
        this.reviews = [...REVIEWS];
      }
    } else {
      this.reviews = [...REVIEWS];
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));
    }

    // 5. Current User
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch {
        this.currentUser = DEMO_USERS[0];
      }
    } else {
      this.currentUser = DEMO_USERS[0]; // Default logged-in as demo student for immediate delight
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    }

    // 6. Progress
    const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (savedProgress) {
      try {
        this.progress = JSON.parse(savedProgress);
      } catch {
        this.progress = {};
      }
    } else {
      // Seed initial progress for demo student
      this.progress = {
        'course-ai-101': {
          courseId: 'course-ai-101',
          userId: 'user-demo-student',
          completedLessonIds: ['les-1-1'],
          percentage: 15,
          lastLessonId: 'les-1-2'
        },
        'course-free-501': {
          courseId: 'course-free-501',
          userId: 'user-demo-student',
          completedLessonIds: ['les-py-1', 'les-py-2'],
          percentage: 100,
          completedAt: '2026-02-10'
        }
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    }

    // 7. Certificates
    const savedCertificates = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (savedCertificates) {
      try {
        this.certificates = JSON.parse(savedCertificates);
      } catch {
        this.certificates = [];
      }
    } else {
      this.certificates = [
        {
          id: 'CERT-EDU-2026-PY501',
          userId: 'user-demo-student',
          userName: 'Jordan Hayes',
          courseId: 'course-free-501',
          courseTitle: 'Python for Beginners: From Fundamentals to Real-World Automation',
          instructorName: 'Dr. Sarah Jenkins',
          issueDate: 'February 10, 2026',
          grade: '98% (Excellence Honors)',
          verificationUrl: 'https://eduversity.com/verify/CERT-EDU-2026-PY501'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
    }

    // 8. Payments
    const savedPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    if (savedPayments) {
      try {
        this.payments = JSON.parse(savedPayments);
      } catch {
        this.payments = [];
      }
    } else {
      this.payments = [
        {
          id: 'PAY-8921-X1',
          userId: 'user-demo-student',
          courseId: 'course-ai-101',
          courseTitle: 'Complete Autonomous AI Agents & Generative AI Masterclass 2026',
          amount: 84.99,
          currency: 'USD',
          status: 'succeeded',
          paymentMethod: 'Visa •••• 4242',
          transactionId: 'txn_mock_8921092831',
          createdAt: '2026-02-01'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(this.payments));
    }
  }

  // --- Auth Methods ---
  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public login(email: string, _password?: string): { success: boolean; error?: string } {
    if (email === 'admin@eduversity.com') {
      this.currentUser = DEMO_USERS[1];
    } else if (email === 'student@eduversity.com') {
      this.currentUser = DEMO_USERS[0];
    } else {
      // Find or create user
      this.currentUser = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        enrolledCourseIds: [],
        wishlistCourseIds: [],
        completedCourseIds: [],
        createdAt: new Date().toISOString()
      };
    }
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
    return { success: true };
  }

  public loginAsDemoStudent(): void {
    this.currentUser = DEMO_USERS[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
  }

  public loginAsDemoAdmin(): void {
    this.currentUser = DEMO_USERS[1];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
  }

  public register(name: string, email: string, _password?: string, role: 'student' | 'instructor' = 'student'): { success: boolean } {
    this.currentUser = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      name,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      enrolledCourseIds: [],
      wishlistCourseIds: [],
      completedCourseIds: [],
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
    return { success: true };
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    notifyDbChange();
  }

  public updateProfile(updates: Partial<User>): void {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...updates };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
  }

  // --- Course Methods ---
  public getCourses(): Course[] {
    return [...this.courses];
  }

  public getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  public getCourseBySlug(slug: string): Course | undefined {
    return this.courses.find(c => c.slug === slug);
  }

  public createCourse(courseData: Omit<Course, 'id' | 'rating' | 'reviewsCount' | 'studentsCount' | 'updatedAt'>): Course {
    const newCourse: Course = {
      ...courseData,
      id: 'course-' + Math.random().toString(36).substring(2, 9),
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 0,
      updatedAt: 'Just now'
    };
    this.courses.unshift(newCourse);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(this.courses));
    notifyDbChange();
    return newCourse;
  }

  public updateCourse(id: string, updates: Partial<Course>): void {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(this.courses));
      notifyDbChange();
    }
  }

  public deleteCourse(id: string): void {
    this.courses = this.courses.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(this.courses));
    notifyDbChange();
  }

  // --- Category Methods ---
  public getCategories(): Category[] {
    return [...this.categories];
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(cat => cat.slug === slug);
  }

  // --- Instructor Methods ---
  public getInstructors(): Instructor[] {
    return [...this.instructors];
  }

  public getInstructorById(id: string): Instructor | undefined {
    return this.instructors.find(inst => inst.id === id);
  }

  public createInstructor(instructorData: Omit<Instructor, 'id' | 'rating' | 'reviewsCount' | 'studentsCount' | 'coursesCount'>): Instructor {
    const newInstructor: Instructor = {
      ...instructorData,
      id: 'inst-' + Math.random().toString(36).substring(2, 9),
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 0,
      coursesCount: 0
    };
    this.instructors.push(newInstructor);
    localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(this.instructors));
    notifyDbChange();
    return newInstructor;
  }

  // --- Enrollment Methods ---
  public isEnrolled(courseId: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.enrolledCourseIds.includes(courseId);
  }

  public enrollInCourse(courseId: string, isFree: boolean, paymentDetails?: { amount: number; method: string }): { success: boolean; error?: string } {
    if (!this.currentUser) {
      return { success: false, error: 'Please log in to enroll in this course.' };
    }

    if (this.currentUser.enrolledCourseIds.includes(courseId)) {
      return { success: true }; // already enrolled
    }

    // Add to enrolled list
    this.currentUser.enrolledCourseIds.push(courseId);
    // Remove from wishlist if it was there
    this.currentUser.wishlistCourseIds = this.currentUser.wishlistCourseIds.filter(id => id !== courseId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));

    // Update course student count
    const course = this.getCourseById(courseId);
    if (course) {
      course.studentsCount += 1;
      this.updateCourse(courseId, { studentsCount: course.studentsCount });
    }

    // Initialize progress record
    if (!this.progress[courseId]) {
      this.progress[courseId] = {
        courseId,
        userId: this.currentUser.id,
        completedLessonIds: [],
        percentage: 0
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    }

    // Record payment if paid
    if (!isFree && paymentDetails && course) {
      const payment: PaymentRecord = {
        id: 'PAY-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        userId: this.currentUser.id,
        courseId,
        courseTitle: course.title,
        amount: paymentDetails.amount,
        currency: 'USD',
        status: 'succeeded',
        paymentMethod: paymentDetails.method || 'Credit Card •••• 4242',
        transactionId: 'txn_' + Math.random().toString(36).substring(2, 12),
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.payments.unshift(payment);
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(this.payments));
    }

    notifyDbChange();
    return { success: true };
  }

  public getEnrolledCourses(): Course[] {
    if (!this.currentUser) return [];
    return this.courses.filter(c => this.currentUser!.enrolledCourseIds.includes(c.id));
  }

  // --- Wishlist Methods ---
  public isInWishlist(courseId: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.wishlistCourseIds.includes(courseId);
  }

  public toggleWishlist(courseId: string): boolean {
    if (!this.currentUser) return false;
    const exists = this.currentUser.wishlistCourseIds.includes(courseId);
    if (exists) {
      this.currentUser.wishlistCourseIds = this.currentUser.wishlistCourseIds.filter(id => id !== courseId);
    } else {
      this.currentUser.wishlistCourseIds.push(courseId);
    }
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    notifyDbChange();
    return !exists;
  }

  public getWishlistCourses(): Course[] {
    if (!this.currentUser) return [];
    return this.courses.filter(c => this.currentUser!.wishlistCourseIds.includes(c.id));
  }

  // --- Learning & Progress Methods ---
  public getProgress(courseId: string): CourseProgress {
    if (!this.currentUser) {
      return { courseId, userId: '', completedLessonIds: [], percentage: 0 };
    }
    const prog = this.progress[courseId];
    if (prog) return prog;
    return { courseId, userId: this.currentUser.id, completedLessonIds: [], percentage: 0 };
  }

  public markLessonCompleted(courseId: string, lessonId: string): CourseProgress {
    if (!this.currentUser) throw new Error('Not logged in');
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Course not found');

    let prog = this.progress[courseId];
    if (!prog) {
      prog = {
        courseId,
        userId: this.currentUser.id,
        completedLessonIds: [],
        percentage: 0
      };
    }

    if (!prog.completedLessonIds.includes(lessonId)) {
      prog.completedLessonIds.push(lessonId);
    }
    prog.lastLessonId = lessonId;

    // Calculate percentage
    let totalLessons = 0;
    course.modules.forEach(m => {
      totalLessons += m.lessons.length;
    });
    if (totalLessons === 0) totalLessons = course.totalLessons || 1;

    prog.percentage = Math.min(100, Math.round((prog.completedLessonIds.length / totalLessons) * 100));

    // If 100% completed, generate certificate!
    if (prog.percentage >= 100 && !prog.completedAt) {
      prog.completedAt = new Date().toISOString();
      if (!this.currentUser.completedCourseIds.includes(courseId)) {
        this.currentUser.completedCourseIds.push(courseId);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
      }
      this.generateCertificate(courseId);
    }

    this.progress[courseId] = prog;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    notifyDbChange();
    return prog;
  }

  public markLessonIncomplete(courseId: string, lessonId: string): CourseProgress {
    if (!this.currentUser) throw new Error('Not logged in');
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Course not found');

    const prog = this.progress[courseId];
    if (!prog) return { courseId, userId: this.currentUser.id, completedLessonIds: [], percentage: 0 };

    prog.completedLessonIds = prog.completedLessonIds.filter(id => id !== lessonId);

    let totalLessons = 0;
    course.modules.forEach(m => {
      totalLessons += m.lessons.length;
    });
    if (totalLessons === 0) totalLessons = course.totalLessons || 1;

    prog.percentage = Math.round((prog.completedLessonIds.length / totalLessons) * 100);
    this.progress[courseId] = prog;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    notifyDbChange();
    return prog;
  }

  // --- Certificates Methods ---
  public getCertificates(): Certificate[] {
    if (!this.currentUser) return [];
    return this.certificates.filter(cert => cert.userId === this.currentUser!.id);
  }

  public getCertificateByCourse(courseId: string): Certificate | undefined {
    if (!this.currentUser) return undefined;
    return this.certificates.find(c => c.courseId === courseId && c.userId === this.currentUser!.id);
  }

  public generateCertificate(courseId: string): Certificate {
    if (!this.currentUser) throw new Error('Must be logged in');
    const existing = this.getCertificateByCourse(courseId);
    if (existing) return existing;

    const course = this.getCourseById(courseId);
    const certId = 'CERT-EDU-' + new Date().getFullYear() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const newCert: Certificate = {
      id: certId,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      courseId,
      courseTitle: course ? course.title : 'Eduversity Certification',
      instructorName: course ? course.instructor.name : 'Eduversity Academic Faculty',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      grade: 'Distinction (98%)',
      verificationUrl: `https://eduversity.com/verify/${certId}`
    };

    this.certificates.unshift(newCert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
    notifyDbChange();
    return newCert;
  }

  // --- Review Methods ---
  public getReviews(courseId: string): Review[] {
    return this.reviews.filter(r => r.courseId === courseId);
  }

  public addReview(courseId: string, rating: number, comment: string): { success: boolean; review?: Review; error?: string } {
    if (!this.currentUser) {
      return { success: false, error: 'You must be logged in to leave a review.' };
    }
    if (!this.isEnrolled(courseId)) {
      return { success: false, error: 'Only enrolled students can review this course.' };
    }

    const newReview: Review = {
      id: 'rev-' + Math.random().toString(36).substring(2, 9),
      courseId,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userAvatar: this.currentUser.avatar,
      rating,
      comment,
      createdAt: 'Just now',
      helpfulCount: 0
    };

    this.reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));

    // Update course average rating & count
    const courseReviews = this.getReviews(courseId);
    const avg = courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length;
    this.updateCourse(courseId, {
      rating: parseFloat(avg.toFixed(2)),
      reviewsCount: courseReviews.length
    });

    notifyDbChange();
    return { success: true, review: newReview };
  }

  public deleteReview(reviewId: string): void {
    const rev = this.reviews.find(r => r.id === reviewId);
    if (!rev) return;
    this.reviews = this.reviews.filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));

    // Recalculate course rating
    const courseReviews = this.getReviews(rev.courseId);
    const avg = courseReviews.length > 0
      ? courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length
      : 5.0;
    this.updateCourse(rev.courseId, {
      rating: parseFloat(avg.toFixed(2)),
      reviewsCount: courseReviews.length
    });

    notifyDbChange();
  }

  // --- Admin Analytics ---
  public getAdminStats() {
    const totalStudents = 12450 + (this.currentUser ? 1 : 0);
    const totalCourses = this.courses.length;
    const totalInstructors = this.instructors.length;
    const totalReviews = this.reviews.length;
    const totalEnrollments = this.courses.reduce((acc, c) => acc + c.studentsCount, 0);
    const totalRevenue = 412950;

    return {
      totalStudents,
      totalCourses,
      totalInstructors,
      totalReviews,
      totalEnrollments,
      totalRevenue,
      recentPayments: this.payments,
      recentReviews: this.reviews.slice(0, 5)
    };
  }
}

export const db = new EduversityDatabase();
