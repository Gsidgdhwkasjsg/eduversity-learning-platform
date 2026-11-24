import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  BookOpen, 
  Linkedin, 
  Twitter, 
  Github, 
  Globe, 
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';
import { Instructor, Course } from '../types';
import { db } from '../services/db';

interface InstructorViewProps {
  selectedInstructorId?: string | null;
  onSelectInstructor: (instructorId: string) => void;
  onSelectCourse: (course: Course) => void;
  onBackToDirectory: () => void;
}

export const InstructorView: React.FC<InstructorViewProps> = ({
  selectedInstructorId,
  onSelectInstructor,
  onSelectCourse,
  onBackToDirectory
}) => {
  const [search, setSearch] = useState('');
  const instructors = db.getInstructors();
  const allCourses = db.getCourses();

  const selectedInstructor = selectedInstructorId
    ? instructors.find(i => i.id === selectedInstructorId)
    : null;

  // Filtered directory
  const filteredInstructors = instructors.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase()) ||
    i.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
  );

  // If viewing a single instructor's profile:
  if (selectedInstructor) {
    const instructorCourses = allCourses.filter(c => c.instructorId === selectedInstructor.id);

    return (
      <div className="bg-slate-50 min-h-screen py-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <button
            onClick={onBackToDirectory}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Instructors
          </button>

          {/* Profile Hero Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={selectedInstructor.avatar}
                alt={selectedInstructor.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-lg shrink-0"
              />

              <div className="space-y-4 flex-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
                    <Sparkles className="w-3 h-3" /> Senior Faculty Mentor
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    {selectedInstructor.name}
                  </h1>
                  <p className="text-sm font-semibold text-brand-600 mt-1">
                    {selectedInstructor.title} • {selectedInstructor.company}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-6 text-xs text-slate-600 font-semibold pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span><strong>{selectedInstructor.rating.toFixed(2)}</strong> Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span><strong>{selectedInstructor.studentsCount.toLocaleString()}</strong> Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span><strong>{selectedInstructor.coursesCount}</strong> Courses Taught</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-2">
                  {selectedInstructor.socials.linkedin && (
                    <a href={selectedInstructor.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedInstructor.socials.twitter && (
                    <a href={selectedInstructor.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-sky-500 hover:bg-sky-50 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {selectedInstructor.socials.github && (
                    <a href={selectedInstructor.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio & Expertise */}
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
              <div>
                <h3 className="text-base font-bold text-navy-900 mb-2">Biography</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                  {selectedInstructor.bio}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Technical Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInstructor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Courses by this instructor */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-navy-900">
              Courses Taught by {selectedInstructor.name} ({instructorCourses.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <img src={course.thumbnail} alt={course.title} className="w-full aspect-video rounded-xl object-cover mb-3" />
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{course.category}</span>
                    <h3 className="text-sm font-bold text-navy-900 line-clamp-2 mt-1">{course.title}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-navy-900">{course.price === 0 ? 'FREE' : `$${course.price}`}</span>
                    <span className="text-amber-500">★ {course.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // DIRECTORY VIEW
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
            <Award className="w-4 h-4" /> World-Class Faculty
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Learn From Industry Leaders
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Our instructors are engineering directors, research scientists, and startup founders from DeepMind, Stripe, Figma, and Stanford.
          </p>

          {/* Search */}
          <div className="pt-2 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search instructors by name, domain, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-xs"
            />
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((inst) => (
            <div
              key={inst.id}
              onClick={() => onSelectInstructor(inst.id)}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-brand-300 p-6 shadow-xs hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-navy-900 truncate">{inst.name}</h3>
                    <p className="text-xs font-semibold text-brand-600 truncate">{inst.title}</p>
                    <p className="text-xs text-slate-400 truncate">{inst.company}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {inst.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inst.expertise.slice(0, 3).map((exp, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  ★ {inst.rating.toFixed(2)}
                </span>
                <span>{(inst.studentsCount / 1000).toFixed(1)}k students</span>
                <span className="text-brand-600 font-bold hover:underline">View Profile →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
