import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { CourseCard } from './components/CourseCard';
import { CourseFilters } from './components/CourseFilters';
import { CourseDetailsView } from './components/CourseDetailsView';
import { LearningPlayerView } from './components/LearningPlayerView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { InstructorView } from './components/InstructorView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { CertificateModal } from './components/CertificateModal';

import { db } from './services/db';
import { Course, FilterOptions, User } from './types';
import { TESTIMONIALS } from './data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  Star, 
  Quote, 
  CheckCircle2, 
  Laptop, 
  Code2, 
  Cpu, 
  ShieldCheck 
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
  const [initialDashboardTab, setInitialDashboardTab] = useState<string>('courses');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [enrollmentCourse, setEnrollmentCourse] = useState<Course | null>(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificateCourseId, setCertificateCourseId] = useState<string | null>(null);

  // Data state
  const [courses, setCourses] = useState<Course[]>(db.getCourses());
  const [categories, setCategories] = useState(db.getCategories());
  const [instructors, setInstructors] = useState(db.getInstructors());
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());

  // Filter state for courses catalog
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    search: '',
    level: 'all',
    price: 'all',
    rating: 0,
    duration: 'all',
    sort: 'popular'
  });

  // Home Popular Courses active tab
  const [homeTab, setHomeTab] = useState<'all' | 'ai' | 'dev' | 'free'>('all');

  // Sync with DB
  useEffect(() => {
    const handleDbChange = () => {
      setCourses(db.getCourses());
      setCategories(db.getCategories());
      setInstructors(db.getInstructors());
      setCurrentUser(db.getCurrentUser());
    };
    window.addEventListener('eduversity_db_change', handleDbChange);
    return () => window.removeEventListener('eduversity_db_change', handleDbChange);
  }, []);

  // Scroll to top on navigation
  const navigateTo = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'courses' && param) {
      setFilters(prev => ({ ...prev, category: param, search: '' }));
      setCurrentView('courses');
    } else if (view === 'dashboard' && param) {
      setInitialDashboardTab(param);
      setCurrentView('dashboard');
    } else {
      setCurrentView(view);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnrollment = (course: Course) => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setEnrollmentCourse(course);
    setEnrollmentModalOpen(true);
  };

  const handleEnrollmentSuccess = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCertificate = (courseId: string) => {
    setCertificateCourseId(courseId);
    setCertificateModalOpen(true);
  };

  const handleViewInstructor = (instId: string) => {
    setSelectedInstructorId(instId);
    setCurrentView('instructors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Sort Logic
  const filteredCourses = courses.filter((c) => {
    // Category
    if (filters.category !== 'all' && c.category !== filters.category) return false;
    
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match = c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Level
    if (filters.level !== 'all' && c.level !== filters.level) return false;

    // Price
    if (filters.price === 'free' && c.price !== 0) return false;
    if (filters.price === 'paid' && c.price === 0) return false;
    if (filters.price === 'under50' && (c.price === 0 || c.price > 50)) return false;
    if (filters.price === 'under100' && (c.price === 0 || c.price > 100)) return false;

    // Rating
    if (filters.rating > 0 && c.rating < filters.rating) return false;

    // Duration
    if (filters.duration === 'short' && c.durationHours >= 15) return false;
    if (filters.duration === 'medium' && (c.durationHours < 15 || c.durationHours > 30)) return false;
    if (filters.duration === 'long' && c.durationHours <= 30) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sort === 'popular') return b.studentsCount - a.studentsCount;
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'price-asc') return a.price - b.price;
    if (filters.sort === 'price-desc') return b.price - a.price;
    return b.reviewsCount - a.reviewsCount;
  });

  // Courses filtered for Home Tabs
  const homeFilteredCourses = courses.filter((c) => {
    if (homeTab === 'ai') return c.category === 'Artificial Intelligence';
    if (homeTab === 'dev') return c.category === 'Programming & Development';
    if (homeTab === 'free') return c.price === 0;
    return true;
  }).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-brand-600 selection:text-white">
      
      {/* 1. Global Navigation Bar */}
      {currentView !== 'learn' && (
        <Navbar
          currentView={currentView}
          onNavigate={navigateTo}
          onOpenAuth={(mode = 'login') => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
          onSelectCourse={handleSelectCourse}
        />
      )}

      {/* 2. Main Page Router */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExplore={() => navigateTo('courses')}
              onStartFree={() => {
                setFilters(prev => ({ ...prev, price: 'free', category: 'all', search: '' }));
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPreviewCourse={(cId) => {
                const c = courses.find(item => item.id === cId) || courses[0];
                handleSelectCourse(c);
              }}
            />

            {/* 10 Interactive Course Categories Section */}
            <CategoriesSection
              categories={categories}
              onSelectCategory={(catName) => {
                setFilters(prev => ({ ...prev, category: catName, search: '' }));
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewAll={() => navigateTo('categories')}
            />

            {/* Popular Courses Showcase Section */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" /> Featured Programs
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                      Explore Most Popular Courses
                    </h2>
                    <p className="text-slate-600 mt-2 max-w-xl text-sm sm:text-base">
                      Curated masterclasses with high student satisfaction and practical portfolio outcomes.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-end">
                    <button
                      onClick={() => setHomeTab('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        homeTab === 'all' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      All Trending
                    </button>
                    <button
                      onClick={() => setHomeTab('ai')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        homeTab === 'ai' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      AI & Agents
                    </button>
                    <button
                      onClick={() => setHomeTab('dev')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        homeTab === 'dev' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Full-Stack Dev
                    </button>
                    <button
                      onClick={() => setHomeTab('free')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        homeTab === 'free' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      100% Free
                    </button>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {homeFilteredCourses.map((c) => (
                    <CourseCard
                      key={c.id}
                      course={c}
                      onSelect={handleSelectCourse}
                      onEnroll={handleOpenEnrollment}
                      isWishlisted={db.isInWishlist(c.id)}
                      isEnrolled={db.isEnrolled(c.id)}
                    />
                  ))}
                </div>

                {/* Explore All CTA Button */}
                <div className="mt-12 text-center">
                  <button
                    onClick={() => navigateTo('courses')}
                    className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-navy-900 hover:bg-brand-600 text-white shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    View All 500+ Verified Courses <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* Why Choose Eduversity Value Pillars */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Why Eduversity
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                    Engineered for Career Impact
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Traditional online courses have 5% completion rates. We built a platform designed around accountability, real code, and verifiable credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-navy-900">Production Codebases</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Build scalable multi-tier architectures with modern tools: Next.js 15, PostgreSQL, LangGraph, and PyTorch.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-navy-900">AI-Assisted Learning</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Interactive video players with timestamped notes, downloadable resources, and active peer review boards.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-navy-900">Accredited Credentials</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every certificate carries a verifiable QR code and online URL ready for LinkedIn and employer portfolios.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-navy-900">Lifetime Access</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pay once and get all future course updates for life, plus direct access to private mentor AMAs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Top-Rated Instructors Section */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                      World-Class Mentorship
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-1">
                      Learn from Top-Rated Instructors
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      Our faculty includes alumni from Google DeepMind, Stripe, Stanford, and Figma.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('instructors')}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 self-start md:self-end"
                  >
                    View All Faculty Instructors <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructors.slice(0, 3).map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => handleViewInstructor(inst.id)}
                      className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:shadow-brand-500/10 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={inst.avatar}
                          alt={inst.name}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/20"
                        />
                        <div className="min-w-0">
                          <h3 className="font-bold text-base text-navy-900 truncate">{inst.name}</h3>
                          <p className="text-xs text-brand-600 font-semibold truncate">{inst.title}</p>
                          <p className="text-xs text-slate-400 truncate">{inst.company}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {inst.bio}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span className="text-amber-500 font-bold">★ {inst.rating.toFixed(2)}</span>
                        <span>{(inst.studentsCount / 1000).toFixed(1)}k students</span>
                        <span className="text-brand-600 font-bold">Profile →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Student Testimonials Section */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Student Stories
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                    Loved by Over 120,000+ Learners
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    See how students used EDUVERSITY to pivot careers and build high-growth startups.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.id}
                      className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-brand-300 -mb-2" />
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-200">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-900">{t.name}</p>
                          <p className="text-[11px] text-slate-500">{t.role}</p>
                          <p className="text-[10px] font-bold text-brand-600">{t.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW: ALL COURSES CATALOG & FILTERS */}
        {currentView === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Course Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-1">
                Explore All Courses
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filter by topic, difficulty, pricing, and duration to discover your next career upgrade.
              </p>
            </div>

            {/* Filter controls */}
            <CourseFilters
              filters={filters}
              categories={categories.map(c => c.name)}
              totalResults={filteredCourses.length}
              onFilterChange={(updates) => setFilters(prev => ({ ...prev, ...updates }))}
              onReset={() => setFilters({
                category: 'all',
                search: '',
                level: 'all',
                price: 'all',
                rating: 0,
                duration: 'all',
                sort: 'popular'
              })}
            />

            {/* Course Cards Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCourses.map((c) => (
                  <CourseCard
                    key={c.id}
                    course={c}
                    onSelect={handleSelectCourse}
                    onEnroll={handleOpenEnrollment}
                    isWishlisted={db.isInWishlist(c.id)}
                    isEnrolled={db.isEnrolled(c.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-navy-900">No courses match your filter criteria</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or adjusting the difficulty and duration sliders.
                </p>
                <button
                  onClick={() => setFilters({
                    category: 'all',
                    search: '',
                    level: 'all',
                    price: 'all',
                    rating: 0,
                    duration: 'all',
                    sort: 'popular'
                  })}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-brand-600"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CATEGORIES */}
        {currentView === 'categories' && (
          <div className="py-8">
            <CategoriesSection
              categories={categories}
              onSelectCategory={(catName) => {
                setFilters(prev => ({ ...prev, category: catName, search: '' }));
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW: INSTRUCTORS */}
        {currentView === 'instructors' && (
          <InstructorView
            selectedInstructorId={selectedInstructorId}
            onSelectInstructor={(id) => setSelectedInstructorId(id)}
            onSelectCourse={handleSelectCourse}
            onBackToDirectory={() => setSelectedInstructorId(null)}
          />
        )}

        {/* VIEW: COURSE DETAILS */}
        {currentView === 'course-detail' && selectedCourse && (
          <CourseDetailsView
            course={selectedCourse}
            onBack={() => setCurrentView('courses')}
            onEnroll={handleOpenEnrollment}
            onStartLearning={handleStartLearning}
            onSelectCourse={handleSelectCourse}
            onViewInstructor={handleViewInstructor}
          />
        )}

        {/* VIEW: LEARNING PLAYER (Distraction-Free Classroom) */}
        {currentView === 'learn' && selectedCourse && (
          <LearningPlayerView
            course={selectedCourse}
            onBack={() => {
              setCurrentView('course-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCertificate={handleOpenCertificate}
          />
        )}

        {/* VIEW: STUDENT DASHBOARD */}
        {currentView === 'dashboard' && (
          <StudentDashboardView
            initialTab={initialDashboardTab}
            onStartLearning={handleStartLearning}
            onExploreCourses={() => navigateTo('courses')}
            onOpenCertificate={handleOpenCertificate}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboardView
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW: ABOUT US */}
        {currentView === 'about' && (
          <AboutView
            onExploreCourses={() => navigateTo('courses')}
          />
        )}

      </main>

      {/* 3. Global Footer */}
      {currentView !== 'learn' && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* 4. Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          // If we were trying to enroll, reopen enrollment modal
          if (enrollmentCourse) {
            setEnrollmentModalOpen(true);
          }
        }}
      />

      <EnrollmentModal
        course={enrollmentCourse}
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        onSuccess={handleEnrollmentSuccess}
        onOpenAuth={() => {
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
      />

      <CertificateModal
        courseId={certificateCourseId}
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
      />

    </div>
  );
};

export default App;
