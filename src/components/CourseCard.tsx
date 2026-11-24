import React from 'react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  Heart, 
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Course } from '../types';
import { db } from '../services/db';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  onEnroll: (course: Course) => void;
  onToggleWishlist?: (courseId: string) => void;
  isWishlisted?: boolean;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelect,
  onEnroll,
  onToggleWishlist,
  isWishlisted = false,
  isEnrolled = false
}) => {
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Bestseller': return 'bg-amber-500 text-white';
      case 'Highest Rated': return 'bg-brand-600 text-white';
      case 'Trending': return 'bg-emerald-600 text-white';
      case 'Free': return 'bg-teal-600 text-white';
      default: return 'bg-slate-800 text-white';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Advanced': return 'text-purple-700 bg-purple-50 border-purple-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400/80 shadow-xs hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Thumbnail Container */}
      <div 
        onClick={() => onSelect(course)}
        className="relative aspect-video overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {course.badge && (
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase shadow-xs ${getBadgeColor(course.badge)}`}>
              {course.badge}
            </span>
          )}
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) {
              onToggleWishlist(course.id);
            } else {
              db.toggleWishlist(course.id);
            }
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' 
              : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Category Pill Over Image Bottom */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-bold text-white bg-navy-950/70 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
          {course.category}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        {/* Title & Instructor */}
        <div>
          <h3 
            onClick={() => onSelect(course)}
            className="font-bold text-base text-navy-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {course.title}
          </h3>

          {/* Instructor preview */}
          <div className="mt-3 flex items-center gap-2.5">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-semibold text-slate-600 truncate">
              {course.instructor.name}
            </span>
          </div>

          {/* Meta metrics (duration, lessons, students) */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {(course.studentsCount / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Rating and Price / Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-navy-900">{course.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400">({course.reviewsCount})</span>
          </div>

          {/* Price display */}
          <div className="text-right">
            {course.price === 0 ? (
              <span className="text-base font-extrabold text-emerald-600 tracking-tight">
                FREE
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-navy-900 tracking-tight">
                  ${course.price}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-xs text-slate-400 line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3.5">
          {isEnrolled ? (
            <button
              onClick={() => onSelect(course)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Continue Learning
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 group-hover:bg-brand-600 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Enroll Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
