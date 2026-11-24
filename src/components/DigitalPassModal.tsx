import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Download, CheckCircle, Ticket, Calendar, MapPin, Sparkles, X, Share2, ShieldCheck } from 'lucide-react';
import { RegistrationRecord } from '../services/db';
import { FESTIVAL_INFO } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

interface DigitalPassModalProps {
  registration: RegistrationRecord | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ registration, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const passRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (registration) {
      // Trigger festive celebratory confetti blast!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF007A', '#00F0FF', '#7928CA', '#FFE600']
      });

      // Generate real QR code image
      QRCode.toDataURL(registration.qrPayload, {
        width: 200,
        margin: 1,
        color: {
          dark: '#06040a',
          light: '#ffffff'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate QR:', err));
    }
  }, [registration]);

  if (!registration) return null;

  const handlePrint = () => {
    soundEngine.playClickSFX();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-lg bg-fest-dark border border-fest-pink/40 rounded-3xl p-6 sm:p-8 shadow-glow-mixed max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Banner */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Registration Confirmed!
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Your spot for <span className="text-fest-cyan font-bold">{registration.eventName}</span> has been locked in.
          </p>
        </div>

        {/* Futuristic Printable Holographic Pass Card */}
        <div
          ref={passRef}
          className="relative rounded-2xl p-6 bg-gradient-to-b from-fest-card via-fest-dark to-fest-card border-2 border-fest-cyan/40 shadow-glow-cyan overflow-hidden print:border-black print:text-black mb-6"
        >
          {/* Cyberpunk Hologram Lines Overlay */}
          <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-fest-pink/20 blur-2xl rounded-full pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-fest-pink to-fest-cyan flex items-center justify-center font-display font-black text-sm text-white">
                A
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-widest text-white">
                  AURA 2026 PASS
                </span>
                <span className="block text-[9px] font-mono text-fest-cyan tracking-wider">
                  OFFICIAL ADMISSION BADGE
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-fest-yellow/10 text-fest-yellow text-[10px] font-mono font-bold border border-fest-yellow/30 uppercase">
                {registration.participationType}
              </span>
            </div>
          </div>

          {/* Ticket ID & Main Details */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-4">
            {/* Left QR Code Box */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-white text-black shadow-md">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Ticket QR Code" className="w-28 h-28 object-contain" />
              ) : (
                <div className="w-28 h-28 bg-slate-200 animate-pulse rounded" />
              )}
              <span className="font-mono font-bold text-[10px] tracking-widest text-slate-800 mt-1">
                {registration.id}
              </span>
            </div>

            {/* Right Attendee Info */}
            <div className="sm:col-span-7 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Candidate Name</span>
                <span className="font-display font-bold text-base text-white">{registration.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">College / University</span>
                <span className="font-medium text-slate-200 line-clamp-1">{registration.collegeName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Department</span>
                  <span className="text-slate-300 font-medium truncate block">{registration.department}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Year</span>
                  <span className="text-slate-300 font-medium">{registration.yearOfStudy}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Banner */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 mb-3">
            <span className="text-[10px] font-mono uppercase text-fest-pink block font-bold">
              Registered Event
            </span>
            <div className="font-display font-bold text-sm text-white">
              {registration.eventName}
            </div>
            {registration.teamName && (
              <div className="text-xs text-fest-cyan font-mono mt-0.5">
                Team: <strong>{registration.teamName}</strong> ({registration.teamMembers?.length || 1} members)
              </div>
            )}
          </div>

          {/* Venue & Date Strip */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-fest-cyan" />
              <span>{FESTIVAL_INFO.dates}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-fest-pink" />
              <span>Apex Arena, Delhi</span>
            </div>
          </div>
        </div>

        {/* Verification Note */}
        <div className="flex items-start space-x-2 text-xs text-slate-400 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Please present this digital pass on your smartphone along with your physical College ID card at Gate 1 or Gate 2.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download / Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-fest-pink to-fest-purple text-white font-display font-bold text-xs shadow-glow-pink transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
