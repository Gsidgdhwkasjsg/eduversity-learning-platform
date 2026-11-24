import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Award, 
  Play, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  MessageSquare, 
  Share2,
  Trash2,
  Sparkles
} from 'lucide-react';
import { Course, Review, User } from '../types';
import { db } from '../services/db';

interface CourseDetailsViewProps {
  course: Course;
  onBack: () => void;
  onEnroll: (course: Course) => void;
  onStartLearning: (course: Course) => void;
  onSelectCourse: (course: Course) => void;
  onViewInstructor: (instructorId: string) => void;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({
  course,
  onBack,
  onEnroll,
  onStartLearning,
  onSelectCourse,
  onViewInstructor
}) => {
  const [currentUser] = useState<User | null>(db.getCurrentUser());
  const [isEnrolled, setIsEnrolled] = useState(db.isEnrolled(course.id));
  const [isWishlisted, setIsWishlisted] = useState(db.isInWishlist(course.id));
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || '']: true
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(db.getReviews(course.id));
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Related courses
  const relatedCourses = db.getCourses()
    .filter(c => c.id !== course.id && (c.category === course.category || c.level === course.level))
    .slice(0, 3);

  const toggleModule = (modId: string) => {
    setOpenModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleToggleWishlist = () => {
    const updated = db.toggleWishlist(course.id);
    setIsWishlisted(updated);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess(false);

    if (!newComment.trim()) {
      setReviewError('Please write your review feedback.');
      return;
    }

    const res = db.addReview(course.id, newRating, newComment.trim());
    if (res.success) {
      setReviews(db.getReviews(course.id));
      setNewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } else {
      setReviewError(res.error || 'Failed to submit review.');
    }
  };

  const handleDeleteReview = (revId: string) => {
    db.deleteReview(revId);
    setReviews(db.getReviews(course.id));
  };

  // Rating percentages
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++;
  });
  const totalReviewsCount = reviews.length || 1;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-navy-950 text-white pt-8 pb-14 border-b border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Header Info */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-brand-600 text-white">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500 text-white">
                    {course.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-navy-900 text-slate-300 border border-navy-800">
                  {course.level} Level
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {course.subtitle}
              </p>

              {/* Rating & Author Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="font-extrabold text-amber-300 text-sm">{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 underline">({course.reviewsCount} ratings)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.studentsCount.toLocaleString()} students enrolled</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Created by <strong 
                    onClick={() => onViewInstructor(course.instructor.id)}
                    className="text-white hover:text-brand-400 underline cursor-pointer"
                  >{course.instructor.name}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* What you'll learn card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                What You'll Learn in This Course
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Complete Course Curriculum</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.modules.length} Modules • {course.totalLessons} Lessons • {course.duration} Total Length
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.keys(openModules).length === course.modules.length;
                    const next: Record<string, boolean> = {};
                    if (!allOpen) {
                      course.modules.forEach(m => next[m.id] = true);
                    }
                    setOpenModules(next);
                  }}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 self-start"
                >
                  Expand / Collapse All
                </button>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-3">
                {course.modules.map((module) => {
                  const isOpen = openModules[module.id];
                  return (
                    <div 
                      key={module.id}
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      {/* Module header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          <span className="font-bold text-sm text-navy-900">{module.title}</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {module.lessons.length} lessons
                        </span>
                      </button>

                      {/* Module Lessons */}
                      {isOpen && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id}
                              className="p-3.5 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <Play className="w-4 h-4 text-brand-600 shrink-0" />
                                <div className="truncate">
                                  <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                                    {lesson.title}
                                  </p>
                                  {lesson.resources && lesson.resources.length > 0 && (
                                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                                      <FileText className="w-3 h-3" /> {lesson.resources.length} resource attached
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isPreview && (
                                  <button
                                    onClick={() => setActiveVideoModal(true)}
                                    className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="text-xs text-slate-400 font-mono">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-navy-900 mb-4">Requirements & Prerequisites</h2>
              <ul className="space-y-2.5">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-navy-900">Detailed Description</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>

            {/* Instructor Spotlight */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Instructor</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div className="space-y-2">
                  <h3 
                    onClick={() => onViewInstructor(course.instructor.id)}
                    className="text-lg font-bold text-navy-900 hover:text-brand-600 cursor-pointer"
                  >
                    {course.instructor.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600">{course.instructor.title}</p>
                  <p className="text-xs text-slate-500">{course.instructor.company}</p>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 pt-1">
                    <span>★ <strong>{course.instructor.rating.toFixed(2)}</strong> Instructor Rating</span>
                    <span><strong>{course.instructor.studentsCount.toLocaleString()}</strong> Students</span>
                    <span><strong>{course.instructor.coursesCount}</strong> Courses</span>
                  </div>
                  <p className="text-sm text-slate-600 pt-2 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Reviews & Form */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold text-navy-900">Student Reviews & Feedback</h2>
                
                {/* Score Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-slate-50 rounded-2xl">
                  <div className="md:col-span-4 text-center md:border-r md:border-slate-200">
                    <p className="text-5xl font-black text-navy-900">{course.rating.toFixed(1)}</p>
                    <div className="flex justify-center text-amber-400 my-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-5 h-5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-500">Course Overall Rating</p>
                  </div>

                  {/* Rating Bars */}
                  <div className="md:col-span-8 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingCounts[stars - 1];
                      const pct = Math.round((count / totalReviewsCount) * 100);
                      return (
                        <div key={stars} className="flex items-center gap-3 text-xs">
                          <span className="w-12 font-medium text-slate-600 flex items-center gap-1">
                            {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </span>
                          <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div 
                              className="h-full bg-amber-400 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-right font-mono text-slate-400">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Write Review Form (for enrolled users) */}
              {isEnrolled ? (
                <div className="p-6 rounded-2xl bg-brand-50/50 border border-brand-100">
                  <h3 className="font-bold text-sm text-navy-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-brand-600" />
                    Share Your Course Experience
                  </h3>

                  {reviewSuccess && (
                    <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                      Thank you! Your review has been published.
                    </div>
                  )}

                  {reviewError && (
                    <div className="mb-4 p-3 bg-rose-100 text-rose-800 rounded-xl text-xs font-semibold">
                      {reviewError}
                    </div>
                  )}

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Select Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star 
                              className={`w-6 h-6 cursor-pointer ${
                                star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">
                          {newRating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Your Feedback
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What did you like most about this course? How did it help your career?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs cursor-pointer"
                    >
                      Post Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500 font-medium">
                  Enroll in this course to leave your student review and rating.
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-900">{rev.userName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star 
                                  key={s} 
                                  className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-slate-400">{rev.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Author delete review */}
                      {currentUser && currentUser.id === rev.userId && (
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="text-xs text-rose-500 hover:text-rose-700 p-1 flex items-center gap-1"
                          title="Delete your review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-11">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="pt-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Recommended Related Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCourses.map(rc => (
                    <div 
                      key={rc.id}
                      onClick={() => onSelectCourse(rc)}
                      className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md cursor-pointer transition-all"
                    >
                      <img src={rc.thumbnail} alt={rc.title} className="w-full aspect-video rounded-lg object-cover mb-2" />
                      <h4 className="text-xs font-bold text-navy-900 line-clamp-2">{rc.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{rc.instructor.name}</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-navy-900">{rc.price === 0 ? 'FREE' : `$${rc.price}`}</span>
                        <span className="text-amber-500 font-bold">★ {rc.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Floating / Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
              
              {/* Media Teaser Preview */}
              <div className="relative aspect-video bg-slate-900 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/40" />
                <button
                  onClick={() => setActiveVideoModal(true)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/95 text-brand-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-brand-600 translate-x-0.5" />
                </button>
                <div className="absolute bottom-2.5 left-0 right-0 text-center text-xs font-bold text-white">
                  Preview this course
                </div>
              </div>

              {/* Pricing & CTA Card Body */}
              <div className="p-6 space-y-5">
                
                {/* Price block */}
                <div className="flex items-baseline justify-between">
                  {course.price === 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-emerald-600">FREE</span>
                      <span className="text-xs text-slate-400 line-through">${course.originalPrice}</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-navy-900">${course.price}</span>
                      <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-rose-100 text-rose-700">
                        {course.discountPercent}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Main Action Button */}
                <div>
                  {isEnrolled ? (
                    <button
                      onClick={() => onStartLearning(course)}
                      className="w-full py-4 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white" />
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => onEnroll(course)}
                      className="w-full py-4 rounded-xl text-base font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {course.price === 0 ? 'Enroll in Free Course' : 'Enroll Now'}
                    </button>
                  )}
                </div>

                {/* Wishlist button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                </button>

                {/* Guarantee & Features */}
                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600 font-medium">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    This course includes:
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>{course.totalLessons} downloadable lessons & resources</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Accredited Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Preview */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900 truncate">
                Preview: {course.title}
              </h3>
              <button
                onClick={() => setActiveVideoModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={course.previewVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
