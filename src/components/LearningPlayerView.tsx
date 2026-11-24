import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  FileText, 
  Download, 
  Award, 
  MessageSquare, 
  Sparkles, 
  Share2,
  Menu,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, Lesson, Module } from '../types';
import { db } from '../services/db';

interface LearningPlayerViewProps {
  course: Course;
  onBack: () => void;
  onOpenCertificate: (courseId: string) => void;
}

export const LearningPlayerView: React.FC<LearningPlayerViewProps> = ({
  course,
  onBack,
  onOpenCertificate
}) => {
  // Extract all lessons in flat order
  const allLessons: Lesson[] = [];
  course.modules.forEach(m => {
    m.lessons.forEach(l => allLessons.push(l));
  });

  const [activeLesson, setActiveLesson] = useState<Lesson>(allLessons[0] || course.modules[0]?.lessons[0]);
  const [progress, setProgress] = useState(db.getProgress(course.id));
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'discussion' | 'certificate'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Synchronize progress
  useEffect(() => {
    setProgress(db.getProgress(course.id));
  }, [course.id]);

  const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
  const isLessonCompleted = progress.completedLessonIds.includes(activeLesson.id);

  const handleToggleComplete = () => {
    if (isLessonCompleted) {
      const updated = db.markLessonIncomplete(course.id, activeLesson.id);
      setProgress(updated);
    } else {
      const updated = db.markLessonCompleted(course.id, activeLesson.id);
      setProgress(updated);
      
      // If reached 100%, trigger celebratory confetti!
      if (updated.percentage >= 100) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        setActiveTab('certificate');
      }
    }
  };

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-20 shrink-0">
        
        {/* Back and Title */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Course
          </button>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-bold text-slate-200 truncate">
              {course.title}
            </h1>
            <p className="text-[11px] text-brand-400 truncate hidden md:block">
              {activeLesson.title}
            </p>
          </div>
        </div>

        {/* Progress & Sidebar Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Progress Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs">
            <span className="text-slate-400">Progress:</span>
            <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="font-mono font-bold text-emerald-400">{progress.percentage}%</span>
          </div>

          {/* Certificate shortcut if completed */}
          {progress.percentage >= 100 && (
            <button
              onClick={() => onOpenCertificate(course.id)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" /> Claim Certificate
            </button>
          )}

          {/* Toggle Sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* Main Workspace: Video + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Video Player & Notes Area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-900">
          
          {/* Main Video Viewport */}
          <div className="bg-black w-full aspect-video max-h-[65vh] flex items-center justify-center relative">
            <video
              ref={videoRef}
              key={activeLesson.id}
              src={activeLesson.videoUrl || course.previewVideoUrl}
              controls
              className="w-full h-full object-contain"
              autoPlay={false}
              poster={course.thumbnail}
            />
          </div>

          {/* Lesson Controls Bar */}
          <div className="p-4 sm:px-8 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleComplete}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isLessonCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30'
                }`}
              >
                {isLessonCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    Mark as Completed
                  </>
                )}
              </button>
            </div>

            {/* Next / Prev Lesson Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLesson}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              
              <button
                onClick={handleNextLesson}
                disabled={currentIndex === allLessons.length - 1}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Below Video Tabs & Rich Content */}
          <div className="p-4 sm:p-8 flex-1 max-w-5xl">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview & Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'resources'
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Resources & Downloads ({activeLesson.resources?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'discussion'
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Discussion & Q&A
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'certificate'
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Accredited Certificate
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {activeLesson.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Duration: {activeLesson.duration} • Type: {activeLesson.type.toUpperCase()}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeLesson.description || 'Welcome to this lesson. Follow along with the instructor step by step, practice the code examples in your own development environment, and verify your understanding.'}
                </div>

                {/* Key Concepts Box */}
                <div className="p-5 rounded-2xl bg-brand-950/40 border border-brand-800/40 space-y-2">
                  <h3 className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Key Concepts in this Lesson
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Core architectural design patterns and industry best practices.</li>
                    <li>Handling edge cases and writing performant, readable code.</li>
                    <li>Preparing your workspace for subsequent hands-on capstone assignments.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">
                  Downloadable Attachments & Lesson Files
                </h3>
                {activeLesson.resources && activeLesson.resources.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeLesson.resources.map((res, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-brand-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-brand-400" />
                          <div>
                            <p className="text-xs font-bold text-white">{res.title}</p>
                            <p className="text-[11px] text-slate-500">{res.type} • {res.size}</p>
                          </div>
                        </div>
                        <a
                          href={res.url}
                          download
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simulated download: "${res.title}" saved to Downloads folder.`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-brand-400 border border-slate-800 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                    No external files required for this lecture. Follow the on-screen code instructions.
                  </div>
                )}
              </div>
            )}

            {/* Tab: Discussion */}
            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-white mb-2">Ask a Question</h4>
                  <textarea
                    rows={2}
                    placeholder="Have a doubt on this lesson? Ask instructor and peers..."
                    className="w-full p-3 text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-hidden focus:border-brand-500"
                  />
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => alert('Question posted to course community board!')}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-600 text-white hover:bg-brand-500"
                    >
                      Post Question
                    </button>
                  </div>
                </div>

                {/* Community Thread preview */}
                <div className="space-y-3">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-200">Arjun Sharma</span>
                      <span className="text-[10px] text-slate-500">2 days ago</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      "Is this pattern recommended for distributed multi-tenant workloads?"
                    </p>
                    <div className="mt-2 pl-3 border-l-2 border-brand-500/40 text-xs text-brand-300">
                      <strong>Instructor Response:</strong> Yes! We decouple state with Redis queues in Module 3.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Certificate */}
            {activeTab === 'certificate' && (
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Course Certificate Status</h3>
                
                {progress.percentage >= 100 ? (
                  <div className="space-y-3">
                    <p className="text-xs text-emerald-400 font-semibold">
                      Congratulations! You have completed 100% of the course curriculum.
                    </p>
                    <button
                      onClick={() => onOpenCertificate(course.id)}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      View & Download Verified Certificate
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Complete all {allLessons.length} lessons to unlock your verifiable accreditation certificate. You are currently at {progress.percentage}%.
                    </p>
                    <div className="w-48 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${progress.percentage}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Right Collapsible Curriculum Sidebar */}
        {sidebarOpen && (
          <aside className="w-full lg:w-80 xl:w-96 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto max-h-[50vh] lg:max-h-none">
            
            {/* Sidebar Title */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Course Content
                </h3>
                <p className="text-xs font-semibold text-slate-200 mt-0.5">
                  {progress.completedLessonIds.length} of {allLessons.length} completed
                </p>
              </div>
            </div>

            {/* Modules and Lessons List */}
            <div className="divide-y divide-slate-800/80 flex-1">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="py-2">
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {mod.title}
                  </div>

                  <div className="space-y-0.5">
                    {mod.lessons.map((lesson) => {
                      const isCompleted = progress.completedLessonIds.includes(lesson.id);
                      const isActive = activeLesson.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                            isActive 
                              ? 'bg-slate-900 border-l-2 border-brand-500 text-white' 
                              : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                          }`}
                        >
                          {/* Check status icon */}
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600" />
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium leading-tight truncate ${isActive ? 'font-bold text-white' : ''}`}>
                              {lesson.title}
                            </p>
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </aside>
        )}

      </div>

    </div>
  );
};
