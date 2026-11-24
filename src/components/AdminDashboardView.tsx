import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Star, 
  CheckCircle, 
  Search, 
  AlertCircle,
  X
} from 'lucide-react';
import { Course, Instructor, Review, User } from '../types';
import { db } from '../services/db';

interface AdminDashboardViewProps {
  onBackToHome: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onBackToHome
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'instructors' | 'students' | 'reviews'>('overview');

  const [courses, setCourses] = useState<Course[]>(db.getCourses());
  const [instructors, setInstructors] = useState<Instructor[]>(db.getInstructors());
  const [categories] = useState(db.getCategories());
  const stats = db.getAdminStats();

  // Create/Edit Course Modal state
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    subtitle: '',
    category: categories[0]?.name || 'Programming & Development',
    instructorId: instructors[0]?.id || '',
    price: 49.99,
    originalPrice: 129.99,
    level: 'Beginner' as Course['level'],
    duration: '16.0 hours',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    description: '',
    badge: 'New' as Course['badge']
  });

  // Reload data listener
  useEffect(() => {
    const handleDbChange = () => {
      setCurrentUser(db.getCurrentUser());
      setCourses(db.getCourses());
      setInstructors(db.getInstructors());
    };
    window.addEventListener('eduversity_db_change', handleDbChange);
    return () => window.removeEventListener('eduversity_db_change', handleDbChange);
  }, []);

  // Handle open add course
  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      subtitle: '',
      category: categories[0]?.name || 'Programming & Development',
      instructorId: instructors[0]?.id || '',
      price: 49.99,
      originalPrice: 129.99,
      level: 'Beginner',
      duration: '16.0 hours',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      description: 'Comprehensive curriculum designed for practical hands-on masterclass learners.',
      badge: 'New'
    });
    setIsCourseModalOpen(true);
  };

  // Handle open edit course
  const handleOpenEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      instructorId: course.instructorId,
      price: course.price,
      originalPrice: course.originalPrice,
      level: course.level,
      duration: course.duration,
      thumbnail: course.thumbnail,
      description: course.description,
      badge: course.badge
    });
    setIsCourseModalOpen(true);
  };

  // Submit Course Form
  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const inst = instructors.find(i => i.id === courseForm.instructorId) || instructors[0];

    if (editingCourseId) {
      db.updateCourse(editingCourseId, {
        title: courseForm.title,
        subtitle: courseForm.subtitle,
        category: courseForm.category,
        instructorId: inst.id,
        instructor: inst,
        price: Number(courseForm.price),
        originalPrice: Number(courseForm.originalPrice),
        discountPercent: Math.round(((courseForm.originalPrice - courseForm.price) / courseForm.originalPrice) * 100),
        level: courseForm.level,
        duration: courseForm.duration,
        thumbnail: courseForm.thumbnail,
        description: courseForm.description,
        badge: courseForm.badge
      });
    } else {
      db.createCourse({
        title: courseForm.title,
        subtitle: courseForm.subtitle,
        slug: courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: courseForm.category,
        instructorId: inst.id,
        instructor: inst,
        thumbnail: courseForm.thumbnail,
        previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        price: Number(courseForm.price),
        originalPrice: Number(courseForm.originalPrice),
        discountPercent: Math.round(((courseForm.originalPrice - courseForm.price) / courseForm.originalPrice) * 100),
        level: courseForm.level,
        duration: courseForm.duration,
        durationHours: 16.0,
        totalLessons: 24,
        badge: courseForm.badge,
        isFeatured: true,
        language: 'English',
        description: courseForm.description,
        whatYouWillLearn: [
          'Industry standard techniques and production patterns',
          'Deploying and testing resilient systems'
        ],
        requirements: ['Basic computer literacy'],
        targetAudience: ['All curious students'],
        modules: [
          {
            id: 'mod-' + Math.random().toString(36).substring(2, 7),
            courseId: '',
            title: 'Module 1: Getting Started with Masterclass Fundamentals',
            order: 1,
            lessons: [
              {
                id: 'les-intro',
                moduleId: '',
                title: '1. Welcome & Architecture Blueprint',
                duration: '15:00',
                durationMinutes: 15,
                type: 'video',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                description: 'Course setup and intro.',
                resources: [],
                isPreview: true
              }
            ]
          }
        ]
      });
    }

    setIsCourseModalOpen(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course from the platform?')) {
      db.deleteCourse(courseId);
    }
  };

  const handleDeleteReview = (revId: string) => {
    if (confirm('Moderate and delete this student review?')) {
      db.deleteReview(revId);
    }
  };

  // Role Guard
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="bg-slate-100 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Platform Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EDUVERSITY Executive Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Role-based authorization and real-time operations telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin ? (
              <button
                onClick={() => db.loginAsDemoAdmin()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md cursor-pointer"
              >
                Switch to Admin Demo
              </button>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Authenticated as Administrator
              </div>
            )}
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Exit to Platform
            </button>
          </div>
        </div>

        {/* Warning if not admin */}
        {!isAdmin && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-3 font-semibold">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              You are currently viewing this page as a student. Click <strong>"Switch to Admin Demo"</strong> above to test administrator mutation capabilities (add/edit courses, delete reviews, inspect finance records).
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white p-2 rounded-2xl shadow-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Analytics Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'courses' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Manage Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('instructors')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'instructors' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Instructors ({instructors.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'students' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Student Accounts
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Review Moderation
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS & CHARTS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-black text-navy-900">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.8% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Enrolled Students</span>
                  <Users className="w-5 h-5 text-brand-600" />
                </div>
                <p className="text-3xl font-black text-navy-900">{stats.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-brand-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +1,480 new this week
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Published Courses</span>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-black text-navy-900">{stats.totalCourses}</p>
                <p className="text-xs text-slate-500 font-medium">Across 10 tech categories</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Faculty Mentors</span>
                  <GraduationCap className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-black text-navy-900">{stats.totalInstructors}</p>
                <p className="text-xs text-slate-500 font-medium">Industry leaders & Ph.Ds</p>
              </div>
            </div>

            {/* Growth Visualization (Bar Chart CSS) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-navy-900">Platform Revenue & Enrollment Velocity</h3>
                  <p className="text-xs text-slate-500">Monthly billing gross volume 2026</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                  Target: 118% Achieved
                </span>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 h-48 items-end">
                {[
                  { month: 'Jun', height: '45%', val: '$48K' },
                  { month: 'Jul', height: '60%', val: '$62K' },
                  { month: 'Aug', height: '70%', val: '$74K' },
                  { month: 'Sep', height: '82%', val: '$88K' },
                  { month: 'Oct', height: '90%', val: '$96K' },
                  { month: 'Nov', height: '100%', val: '$112K' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-brand-600 transition-colors">
                      {item.val}
                    </span>
                    <div 
                      className="w-full rounded-xl bg-gradient-to-t from-navy-900 to-brand-600 group-hover:from-brand-600 group-hover:to-brand-400 transition-all shadow-sm"
                      style={{ height: item.height }}
                    />
                    <span className="text-xs font-bold text-slate-600">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Payments Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-navy-900 mb-4">Live Transaction Records (Stripe / Razorpay)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3">Txn ID</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.recentPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono text-slate-500">{p.id}</td>
                        <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{p.courseTitle}</td>
                        <td className="p-3 font-bold text-navy-900">${p.amount}</td>
                        <td className="p-3 text-slate-600">{p.paymentMethod}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {p.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{p.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-900">All Published Courses</h3>
                <p className="text-xs text-slate-500">Add new programs, edit prices, or modify curriculum</p>
              </div>
              <button
                onClick={handleOpenAddCourse}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-3">Course</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Students</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-3 flex items-center gap-3">
                        <img src={c.thumbnail} alt={c.title} className="w-12 h-8 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-navy-900 max-w-xs truncate">{c.title}</p>
                          <span className="text-[10px] text-slate-400">{c.level}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-slate-600">{c.category}</td>
                      <td className="p-3 text-slate-600">{c.instructor.name}</td>
                      <td className="p-3 font-bold text-navy-900">
                        {c.price === 0 ? <span className="text-emerald-600">FREE</span> : `$${c.price}`}
                      </td>
                      <td className="p-3 font-mono text-slate-500">{c.studentsCount.toLocaleString()}</td>
                      <td className="p-3 text-amber-500 font-bold">★ {c.rating}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditCourse(c)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200"
                          title="Edit Course"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INSTRUCTORS */}
        {activeTab === 'instructors' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-navy-900">Faculty & Instructor Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((inst) => (
                <div key={inst.id} className="p-5 border border-slate-200 rounded-2xl flex items-start gap-4">
                  <img src={inst.avatar} alt={inst.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20" />
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-navy-900 truncate">{inst.name}</h4>
                    <p className="text-xs text-brand-600 font-medium truncate">{inst.title}</p>
                    <p className="text-xs text-slate-500">{inst.company}</p>
                    <div className="flex gap-3 text-xs pt-2 text-slate-500">
                      <span>★ {inst.rating}</span>
                      <span>{(inst.studentsCount / 1000).toFixed(1)}k students</span>
                      <span>{inst.coursesCount} courses</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-navy-900">Registered Student Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Enrolled</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-navy-900">Jordan Hayes</td>
                    <td className="p-3 text-slate-600">student@eduversity.com</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">Student</span></td>
                    <td className="p-3 font-bold">2 courses</td>
                    <td className="p-3 text-emerald-600 font-bold">Active</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-navy-900">Karthik Ramanathan</td>
                    <td className="p-3 text-slate-600">karthik.r@techmail.com</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">Student</span></td>
                    <td className="p-3 font-bold">3 courses</td>
                    <td className="p-3 text-emerald-600 font-bold">Active</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-navy-900">Jessica Miller</td>
                    <td className="p-3 text-slate-600">jessica.m@aihub.org</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">Student</span></td>
                    <td className="p-3 font-bold">1 course</td>
                    <td className="p-3 text-emerald-600 font-bold">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEW MODERATION */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-navy-900">Student Reviews & Community Moderation</h3>
            <div className="divide-y divide-slate-100">
              {stats.recentReviews.map((rev) => (
                <div key={rev.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-navy-900">{rev.userName}</span>
                      <span className="text-amber-500 font-bold text-xs">★ {rev.rating}</span>
                      <span className="text-slate-400 text-[11px]">{rev.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{rev.comment}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Course Modal Form (Add / Edit) */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-navy-900">
                {editingCourseId ? 'Edit Course Details' : 'Create New Educational Course'}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCourse} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Summary</label>
                <input
                  type="text"
                  required
                  value={courseForm.subtitle}
                  onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instructor</label>
                  <select
                    value={courseForm.instructorId}
                    onChange={(e) => setCourseForm({ ...courseForm, instructorId: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {instructors.map(i => (
                      <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={courseForm.originalPrice}
                    onChange={(e) => setCourseForm({ ...courseForm, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  value={courseForm.thumbnail}
                  onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-md cursor-pointer"
                >
                  {editingCourseId ? 'Save Changes' : 'Publish Course'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
