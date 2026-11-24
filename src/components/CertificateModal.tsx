import React from 'react';
import { 
  X, 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { Certificate, Course, User } from '../types';
import { db } from '../services/db';

interface CertificateModalProps {
  courseId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  courseId,
  isOpen,
  onClose
}) => {
  if (!isOpen || !courseId) return null;

  const currentUser = db.getCurrentUser();
  const cert = db.getCertificateByCourse(courseId) || db.generateCertificate(courseId);
  const course = db.getCourseById(courseId);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(cert.verificationUrl);
    alert('Certificate verification link copied to clipboard: ' + cert.verificationUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-500">
              VERIFIED CREDENTIAL #{cert.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-navy-900 text-xs font-bold text-white hover:bg-brand-600 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="mt-8 p-8 sm:p-12 rounded-3xl border-8 border-double border-amber-300 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 text-center relative overflow-hidden shadow-inner">
          
          {/* Watermark Crest */}
          <div className="absolute inset-0 m-auto w-72 h-72 opacity-5 pointer-events-none flex items-center justify-center">
            <Award className="w-full h-full text-amber-900" />
          </div>

          {/* Top Crest */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white mx-auto shadow-lg mb-4 ring-4 ring-amber-200">
            <Award className="w-9 h-9 stroke-[2.2]" />
          </div>

          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-700">
            EDUVERSITY ACADEMY OF TECHNOLOGY & SCIENCES
          </p>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-navy-950 mt-2 tracking-tight">
            Certificate of Excellence
          </h2>

          <p className="text-xs text-slate-500 mt-2 italic">
            This internationally accredited credential is proudly presented to:
          </p>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-700 font-serif underline decoration-amber-400 decoration-2 underline-offset-8 my-4">
            {cert.userName || currentUser?.name || 'Jordan Hayes'}
          </h3>

          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            for successfully mastering and completing 100% of the rigorous theoretical and practical laboratory coursework in:
          </p>

          <h4 className="text-base sm:text-lg font-bold text-navy-900 my-3 max-w-xl mx-auto">
            {cert.courseTitle}
          </h4>

          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Grade: {cert.grade}
          </div>

          {/* Signatures & Seal Row */}
          <div className="mt-10 pt-8 border-t border-amber-200/60 grid grid-cols-3 gap-4 items-end text-xs">
            <div className="text-center">
              <div className="font-serif italic font-bold text-navy-900 text-sm border-b border-slate-300 pb-1 max-w-[140px] mx-auto">
                {cert.instructorName}
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Faculty Instructor</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-50 mx-auto flex items-center justify-center text-amber-600 font-mono text-[9px] font-black shadow-xs">
                OFFICIAL<br/>SEAL
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">Issued {cert.issueDate}</p>
            </div>

            <div className="text-center">
              <div className="font-serif italic font-bold text-navy-900 text-sm border-b border-slate-300 pb-1 max-w-[140px] mx-auto">
                Dr. Marcus Sterling
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Dean of Academic Affairs</p>
            </div>
          </div>

        </div>

        {/* Verification Link */}
        <div className="mt-6 text-center text-xs text-slate-500 font-medium">
          Verify authenticity online at{' '}
          <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="text-brand-600 font-mono underline">
            {cert.verificationUrl}
          </a>
        </div>

      </div>
    </div>
  );
};
