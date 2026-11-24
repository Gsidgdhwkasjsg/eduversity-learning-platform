import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Heart, 
  Settings, 
  Play, 
  CheckCircle2, 
  User as UserIcon, 
  Sparkles, 
  ExternalLink,
  Trash2,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { User, Course, Certificate } from '../types';
import { db } from '../services/db';

interface StudentDashboardViewProps {
  initialTab?: string;
  onStartLearning: (course: Course) => void;
  onExploreCourses: () => void;
  onOpenCertificate: (courseId: string) => void;
  onSelectCourse: (course: Course) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  initialTab = 'courses',
  onStartLearning,
  onExploreCourses,
  onOpenCertificate,
  onSelectCourse
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'courses' | 'wishlist' | 'certificates' | 'settings'>(
    (initialTab as any) || 'courses'
  );

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(db.getEnrolledCourses());
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>(db.getWishlistCourses());
  const [certificates, setCertificates] = useState<Certificate[]>(db.getCertificates());

  // Settings form state
  const [name, setName] = useState(currentUser?.name || '');
  const [title, setTitle] = useState(currentUser?.title || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  useEffect(() => {
    const handleDbChange = () => {
      const u = db.getCurrentUser();
      setCurrentUser(u);
      setEnrolledCourses(db.getEnrolledCourses());
      setWishlistCourses(db.getWishlistCourses());
      setCertificates(db.getCertificates());
    };
    window.addEventListener('eduversity_db_change', handleDbChange);
    return () => window.removeEventListener('eduversity_db_change', handleDbChange);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateProfile({ name, title, bio, avatar });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleRemoveWishlist = (courseId: string) => {
    db.toggleWishlist(courseId);
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">Student Access Required</h2>
        <p className="text-slate-500">Please log in to view your learning dashboard.</p>
        <button
          onClick={() => db.loginAsDemoStudent()}
          className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
        >
          Quick Login as Demo Student
        </button>
      </div>
    );
  }

  // Calculate total hours learned estimate
  const totalLessonsDone = enrolledCourses.reduce((sum, c) => {
    const p = db.getProgress(c.id);
    return sum + p.completedLessonIds.length;
  }, 0);
  const estimatedHours = (totalLessonsDone * 0.4).toFixed(1);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-brand-500/40 shadow-lg"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold mb-1">
                  <Sparkles className="w-3 h-3" /> Student Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome back, {currentUser.name.split(' ')[0]}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {currentUser.title || 'Continuous Learner & Technology Enthusiast'}
                </p>
              </div>
            </div>

            <button
              onClick={onExploreCourses}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-navy-950 hover:bg-slate-100 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Explore More Courses
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs">
              <p className="text-xs text-slate-400 font-medium">Enrolled Courses</p>
              <p className="text-2xl font-black text-white mt-1">{enrolledCourses.length}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs">
              <p className="text-xs text-slate-400 font-medium">Hours Learned</p>
              <p className="text-2xl font-black text-white mt-1">{estimatedHours} hrs</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs">
              <p className="text-xs text-slate-400 font-medium">Completed Courses</p>
              <p className="text-2xl font-black text-white mt-1">{currentUser.completedCourseIds.length}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs">
              <p className="text-xs text-slate-400 font-medium">Certificates Earned</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{certificates.length}</p>
            </div>
          </div>

        </div>

        {/* Dashboard Tabs Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'courses'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            My Learning ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'wishlist'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            Saved Wishlist ({wishlistCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'certificates'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates ({certificates.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'settings'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            Account Settings
          </button>
        </div>

        {/* TAB 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((c) => {
                  const prog = db.getProgress(c.id);
                  return (
                    <div
                      key={c.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Course Thumbnail */}
                        <div className="relative aspect-video bg-slate-100 overflow-hidden">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-navy-950/80 text-white backdrop-blur-xs">
                            {c.category}
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-5">
                          <h3 
                            onClick={() => onSelectCourse(c)}
                            className="text-sm font-bold text-navy-900 line-clamp-2 hover:text-brand-600 cursor-pointer"
                          >
                            {c.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">Instructor: {c.instructor.name}</p>

                          {/* Progress bar */}
                          <div className="mt-4 space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-500">{prog.percentage}% Complete</span>
                              <span className="text-slate-400 font-mono">
                                {prog.completedLessonIds.length} / {c.totalLessons} lessons
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-brand-600 rounded-full transition-all duration-300"
                                style={{ width: `${prog.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="p-5 pt-0">
                        {prog.percentage >= 100 ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onStartLearning(c)}
                              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                            >
                              Review Course
                            </button>
                            <button
                              onClick={() => onOpenCertificate(c.id)}
                              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" /> Certificate
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onStartLearning(c)}
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            Continue Learning
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">No courses enrolled yet</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Explore our top-rated catalog and enroll in high-impact programs or start with our free courses.
                </p>
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-md cursor-pointer"
                >
                  Browse Top Courses
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-navy-950/80 text-white">
                          {c.category}
                        </span>
                        <button
                          onClick={() => handleRemoveWishlist(c.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-500 hover:bg-white"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 
                        onClick={() => onSelectCourse(c)}
                        className="text-sm font-bold text-navy-900 hover:text-brand-600 cursor-pointer line-clamp-2"
                      >
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{c.instructor.name}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-extrabold text-navy-900">
                        {c.price === 0 ? 'FREE' : `$${c.price}`}
                      </span>
                      <button
                        onClick={() => onSelectCourse(c)}
                        className="py-2 px-4 rounded-xl text-xs font-bold bg-navy-900 hover:bg-brand-600 text-white transition-colors cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-navy-900">Your wishlist is empty</h3>
                <p className="text-sm text-slate-500">Save courses here to enroll whenever you are ready.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl border-2 border-amber-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-50 rounded-full -z-0" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-amber-500" />
                          <span className="text-xs font-mono font-bold text-slate-500">{cert.id}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Verified Credential
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-navy-900">{cert.courseTitle}</h4>
                        <p className="text-xs text-slate-500 mt-1">Instructor: {cert.instructorName}</p>
                        <p className="text-xs text-slate-500">Issued On: {cert.issueDate}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600">{cert.grade}</span>
                        <button
                          onClick={() => onOpenCertificate(cert.courseId)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-navy-900">No Certificates Earned Yet</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Complete 100% of the lessons in any enrolled course to earn your verified credentials.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Account Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 max-w-3xl">
            <h3 className="text-xl font-bold text-navy-900 mb-6">User Profile & Account Settings</h3>

            {settingsSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Profile details updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              <div className="flex items-center gap-6">
                <img
                  src={avatar || currentUser.avatar}
                  alt="Profile Avatar"
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-500"
                />
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Avatar Image URL
                  </label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full p-2.5 text-xs bg-slate-100 text-slate-500 rounded-xl border border-slate-200 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Professional Title / Goal
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="e.g. Aspiring Full-Stack Developer & Cloud Architect"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Short Biography
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  placeholder="Tell instructors and fellow peers about your learning journey..."
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email!')}
                  className="text-xs font-bold text-slate-600 hover:text-navy-900 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" /> Change Password
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
