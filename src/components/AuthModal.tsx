import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { db } from '../services/db';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register' | 'forgot';
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const res = db.login(email, password);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } else if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      const res = db.register(name, email, password, role);
      if (res.success) {
        onSuccess();
        onClose();
      }
    } else if (mode === 'forgot') {
      setResetSent(true);
    }
  };

  const handleQuickDemoStudent = () => {
    db.loginAsDemoStudent();
    onSuccess();
    onClose();
  };

  const handleQuickDemoAdmin = () => {
    db.loginAsDemoAdmin();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-900 to-brand-600 flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            {mode === 'login' && 'Welcome to EDUVERSITY'}
            {mode === 'register' && 'Create Your Student Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login' && 'Log in to access your enrolled courses and credentials'}
            {mode === 'register' && 'Join 120,000+ ambitious learners leveling up in tech'}
            {mode === 'forgot' && 'Enter your email to receive a password recovery link'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        {mode === 'login' && (
          <div className="mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Instant Evaluator Logins</span>
              <span className="text-brand-600">1-Click</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoStudent}
                className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:text-brand-600 text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Demo Student
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:text-amber-600 text-xs font-bold text-slate-700 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Demo Admin
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Success for forgot */}
        {resetSent ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-navy-900">Recovery Email Dispatched</h4>
            <p className="text-xs text-slate-500">
              We have sent a secure password reset link to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => { setResetSent(false); setMode('login'); }}
              className="text-xs font-bold text-brand-600 hover:underline pt-2 cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Register: Full Name */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Hayes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-semibold text-brand-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold bg-navy-900 hover:bg-brand-600 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {mode === 'login' && 'Sign In to Eduversity'}
              {mode === 'register' && 'Complete Registration'}
              {mode === 'forgot' && 'Send Reset Instructions'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer switch */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className="font-bold text-brand-600 hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className="font-bold text-brand-600 hover:underline cursor-pointer"
              >
                Log in here
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
