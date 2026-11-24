import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  CheckCircle2, 
  Linkedin, 
  Twitter, 
  Github, 
  Youtube, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 font-sans">
      
      {/* Newsletter Banner */}
      <div className="border-b border-navy-900 bg-navy-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Get our free 2026 Tech Career Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Join 85,000+ professionals receiving our weekly curated breakdowns of emerging AI tools, engineering architecture, and hiring trends.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Roadmap PDF sent to your inbox! Welcome aboard.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs bg-navy-950 text-white rounded-xl border border-navy-800 focus:outline-hidden focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-brand-400 transition-colors">
                EDU<span className="text-brand-500">VERSITY</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              EDUVERSITY is an accredited next-generation online learning platform empowering over 120,000+ ambitious creators, engineers, and founders across 140 countries.
            </p>

            <p className="text-xs italic text-brand-400 font-serif">
              "Learn Skills. Build Your Future."
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  All Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Course Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('instructors')} className="hover:text-white transition-colors">
                  Faculty & Instructors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Admin Control Center
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button onClick={() => onNavigate('courses', cat.name)} className="hover:text-white transition-colors truncate max-w-[180px] text-left">
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Accreditation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Eduversity</button></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Accredited Certification partner network.'); }} className="hover:text-white">Accreditation Standards</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy policy: 100% compliant with GDPR.'); }} className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service.'); }} className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Security whitepaper & bug bounty.'); }} className="hover:text-white">Security & RLS Policies</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EDUVERSITY Global Education Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the next generation of builders.
          </p>
        </div>

      </div>

    </footer>
  );
};
