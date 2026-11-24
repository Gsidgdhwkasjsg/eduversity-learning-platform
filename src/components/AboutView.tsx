import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Globe2, 
  Award, 
  Users, 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  onExploreCourses: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreCourses }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
            <GraduationCap className="w-4 h-4" /> About EDUVERSITY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight leading-tight">
            Democratizing World-Class Education for the Next Era
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with a clear conviction: the future of work moves at lightning speed, and everyone deserves direct access to the world’s greatest practitioners.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600">120K+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Students Worldwide</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600">140+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Countries Represented</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600">450+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Vetted Mentors</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600">98%</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Career Transition Rate</p>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Our Core Principles</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">How we design learning experiences that produce top 1% outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Pragmatic Over Academic</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We skip outdated multi-year theory. Every module is anchored in real code repositories, Figma designs, and operational financial models used in industry today.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Taught by Top 1% Practitioners</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our mentors are currently building the frontier at DeepMind, Stripe, Figma, and OpenAI. You learn real workflows, not generic textbook summaries.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Lifelong Community & Support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Education doesn't end with a video. Join alumni peer circles, receive code reviews, participate in hackathons, and build lifelong professional networks.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-navy-950 via-brand-950 to-navy-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Browse our catalog of in-depth masterclasses or begin today with our free introductory series.
          </p>
          <button
            onClick={onExploreCourses}
            className="px-8 py-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-navy-950 hover:bg-slate-100 transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            Explore All Courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
