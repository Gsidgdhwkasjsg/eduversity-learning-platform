import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Tag, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, User } from '../types';
import { db } from '../services/db';

interface EnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (course: Course) => void;
  onOpenAuth: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  course,
  isOpen,
  onClose,
  onSuccess,
  onOpenAuth
}) => {
  if (!isOpen || !course) return null;

  const [currentUser] = useState<User | null>(db.getCurrentUser());
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');

  // Test card form
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const isFree = course.price === 0;
  const discountAmount = couponApplied ? Number((course.price * 0.20).toFixed(2)) : 0;
  const finalPrice = Math.max(0, Number((course.price - discountAmount).toFixed(2)));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (coupon.trim().toUpperCase() === 'EDU2026' || coupon.trim().toUpperCase() === 'LEARN20') {
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon. Try using EDU2026 for 20% discount!');
    }
  };

  const handleEnroll = () => {
    if (!currentUser) {
      onClose();
      onOpenAuth();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const res = db.enrollInCourse(course.id, isFree, {
        amount: finalPrice,
        method: paymentMethod === 'stripe' ? 'Stripe Card •••• 4242' : 'Razorpay UPI/NetBanking'
      });

      setIsProcessing(false);

      if (res.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onSuccess(course);
        onClose();
      } else {
        alert(res.error || 'Failed to complete enrollment.');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Secure Checkout
          </span>
        </div>

        <h3 className="text-xl font-black text-navy-900 tracking-tight">
          {isFree ? 'Enroll in Free Course' : 'Complete Your Enrollment'}
        </h3>

        {/* Course Summary Box */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-20 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-navy-900 line-clamp-2">{course.title}</h4>
            <p className="text-[11px] text-slate-500 mt-1">Instructor: {course.instructor.name}</p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-600 mt-1">
              <span>{course.duration}</span> • <span>{course.level}</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown for Paid Courses */}
        {!isFree && (
          <div className="mt-5 space-y-3">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (Use EDU2026)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 uppercase font-mono font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Coupon EDU2026 applied! (-$ {discountAmount})
              </p>
            )}
            {couponError && (
              <p className="text-xs text-rose-500 font-semibold">{couponError}</p>
            )}

            {/* Price Line Items */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Original Price</span>
                <span className="line-through text-slate-400">${course.originalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Discount ({course.discountPercent}%)</span>
                <span className="text-emerald-600">-${(course.originalPrice - course.price).toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-brand-600 font-bold">
                  <span>Special Promo (EDU2026)</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-navy-900">
                <span>Total Amount Due</span>
                <span className="text-base text-brand-700">${finalPrice}</span>
              </div>
            </div>

            {/* Payment Gateway Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Payment Gateway (Sandbox Mode)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'border-brand-600 bg-brand-50/60 text-brand-700 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-brand-600" /> Stripe Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'razorpay'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Razorpay
                </button>
              </div>
            </div>

            {/* Simulated Card Inputs */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-white rounded-xl border border-slate-200"
                />
                <input
                  type="text"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  placeholder="CVC"
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-white rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* Free Course Guarantee */}
        {isFree && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Lifetime Enrollment
            </p>
            <p className="text-[11px] text-emerald-700">
              No credit card or payments required. Includes full lesson access and a verifiable certificate upon completion.
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleEnroll}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing Enrollment...
              </span>
            ) : isFree ? (
              <>
                <BookOpen className="w-4 h-4" /> Start Learning Free
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Pay ${finalPrice} & Unlock Course
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted & Protected
          </p>
        </div>

      </div>
    </div>
  );
};
