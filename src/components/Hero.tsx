import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  Award, 
  CheckCircle2, 
  TrendingUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { Course } from '../types';

interface HeroProps {
  onExplore: () => void;
  onStartFree: () => void;
  onPreviewCourse: (courseId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onStartFree,
  onPreviewCourse
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50">
      {/* Decorative background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping" />
              <span className="text-xs font-bold text-brand-700 tracking-wide">
                NEXT-GEN EDTECH PLATFORM 2026
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> 500+ Certified Courses
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-900 tracking-tight leading-[1.12]">
              Unlock Your Potential Through{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">
                Learning.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Master high-income, in-demand skills from world-class industry leaders. Build real-world projects, earn accredited certificates, and accelerate your dream career in Artificial Intelligence, Software Engineering, UI/UX, and Business.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-navy-900 hover:bg-brand-600 text-white shadow-xl shadow-navy-900/15 hover:shadow-brand-600/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200/90 hover:border-brand-300 shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-brand-600" />
                Start Learning Free
              </button>
            </div>

            {/* Trust Bullet Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free Lifetime Access Options
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Industry Recognized Certificates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 30-Day Money-Back Guarantee
              </span>
            </div>

            {/* Student Statistics Bar */}
            <div className="pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">120K+</p>
                <p className="text-xs font-medium text-slate-500">Active Students</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">450+</p>
                <p className="text-xs font-medium text-slate-500">Expert Mentors</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">98%</p>
                <p className="text-xs font-medium text-slate-500">Completion Rate</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-navy-900">4.9</span>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-500">Average Rating</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visuals / Interactive Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Outer Decorative Ring */}
            <div className="relative w-full max-w-md">
              
              {/* Main Visual Card */}
              <div className="relative rounded-3xl bg-white p-3.5 shadow-2xl border border-slate-200/90 transition-all hover:shadow-brand-500/10">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
                    alt="Online Learning Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Play Button */}
                  <button
                    onClick={() => onPreviewCourse('course-ai-101')}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/95 text-brand-600 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer group/play"
                    title="Watch Course Preview"
                  >
                    <Play className="w-7 h-7 fill-brand-600 translate-x-0.5" />
                  </button>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-navy-900 flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Featured Spotlight
                  </div>

                  {/* Bottom Text Over Video */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-brand-300">Artificial Intelligence 2026</p>
                    <h3 className="text-sm font-bold truncate">Autonomous AI Agents & Multi-Agent Swarms</h3>
                  </div>
                </div>

                {/* Sub Card Info */}
                <div className="p-4 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                      alt="Instructor Dr. Sarah Jenkins"
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-navy-900">Dr. Sarah Jenkins</p>
                      <p className="text-[11px] text-slate-500">Ex-DeepMind Scientist</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-navy-900">4.96</span>
                    </div>
                    <span className="text-[11px] text-slate-500">34,200 enrolled</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-6 -right-6 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Certified</p>
                  <p className="text-xs font-extrabold text-navy-900">Verified Credential</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-extrabold text-navy-900">1,420+ Online</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Learning right now</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Brand Logos / Trusted By Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/70 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by teams and alumni at world-leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Google</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Microsoft</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Amazon</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Meta</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Netflix</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Spotify</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-700">Stripe</span>
          </div>
        </div>

      </div>
    </section>
  );
};
