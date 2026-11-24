import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin, Play, ArrowRight, ShieldCheck, Flame, Trophy } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/festivalData';
import { ParticleCanvas } from './ParticleCanvas';
import { soundEngine } from '../utils/audio';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC = () => {
  // Target date: March 19, 2026 at 09:00 AM IST
  const targetDate = new Date('2026-03-19T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Fallback for ongoing or past
        setTimeLeft({ days: 114, hours: 14, minutes: 22, seconds: 45 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const scrollToSection = (id: string) => {
    soundEngine.playClickSFX();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-fest-dark">
      {/* Background Neon Lights and Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-fest-pink/20 via-fest-purple/25 to-fest-cyan/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-fest-purple/30 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-fest-cyan/25 blur-[120px] pointer-events-none rounded-full" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      {/* Canvas Particle Effect */}
      <ParticleCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center text-center">
        {/* Edition Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-8 animate-pulse-glow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fest-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fest-cyan"></span>
          </span>
          <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
            North India's Largest Inter-Collegiate Cultural Festival
          </span>
          <span className="text-fest-pink font-bold text-xs">★ EDITION 14</span>
        </div>

        {/* Massive Festival Title */}
        <div className="relative mb-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-black tracking-tight leading-none uppercase select-none">
            <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
              AURA
            </span>
            <span className="block -mt-3 sm:-mt-6 md:-mt-8 lg:-mt-12 bg-gradient-to-r from-fest-pink via-fest-purple-light to-fest-cyan bg-clip-text text-transparent tracking-widest text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-glow-pink">
              2026
            </span>
          </h1>
        </div>

        {/* Tagline & Short Intro */}
        <p className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-fest-cyan text-glow-cyan tracking-wide mb-3 max-w-3xl">
          "{FESTIVAL_INFO.tagline}"
        </p>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
          Join 18,000+ creators, musicians, and performers across 3 days of supersonic music,
          electrifying dance wars, and futuristic stage spectacles.
        </p>

        {/* Event Key Details Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 mb-10">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-fest-pink" />
            <span>{FESTIVAL_INFO.dates}</span>
          </div>
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-fest-cyan" />
            <span>Apex Mega Arena, New Delhi</span>
          </div>
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Trophy className="w-4 h-4 text-fest-yellow" />
            <span>₹15,00,000 Prize Pool</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-xl mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center justify-center space-x-2">
            <Flame className="w-3.5 h-3.5 text-fest-pink animate-bounce" />
            <span>The Extraordinary Begins In</span>
            <Flame className="w-3.5 h-3.5 text-fest-pink animate-bounce" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'DAYS', value: timeLeft.days, color: 'text-fest-cyan' },
              { label: 'HOURS', value: timeLeft.hours, color: 'text-fest-pink' },
              { label: 'MINS', value: timeLeft.minutes, color: 'text-fest-purple-light' },
              { label: 'SECS', value: timeLeft.seconds, color: 'text-fest-yellow' }
            ].map((slot) => (
              <div
                key={slot.label}
                className="relative group p-3 sm:p-4 rounded-2xl bg-fest-card/80 border border-white/10 backdrop-blur-lg hover:border-fest-pink/40 transition-all shadow-glass"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl pointer-events-none" />
                <span className={`block font-display font-black text-2xl sm:text-4xl md:text-5xl ${slot.color} tracking-tight`}>
                  {String(slot.value).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs font-mono font-medium text-slate-400 tracking-widest mt-1">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* CTA 1: Register Now */}
          <button
            onClick={() => scrollToSection('#register')}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-xl font-display font-bold text-base text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-glow-pink"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fest-pink via-fest-purple to-fest-cyan opacity-95 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center space-x-2">
              <span>Register For Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* CTA 2: Explore Events */}
          <button
            onClick={() => scrollToSection('#schedule')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-display font-semibold text-base text-slate-200 bg-white/[0.05] border border-white/15 hover:border-fest-cyan hover:text-fest-cyan hover:bg-fest-cyan/[0.05] backdrop-blur-md transition-all flex items-center justify-center space-x-2 shadow-glass"
          >
            <Sparkles className="w-5 h-5 text-fest-cyan" />
            <span>Explore 48+ Events</span>
          </button>

          {/* Teaser Button */}
          <button
            onClick={() => {
              soundEngine.playClickSFX();
              setShowVideoModal(true);
            }}
            className="w-full sm:w-auto px-4 py-4 rounded-xl font-display font-medium text-sm text-slate-300 hover:text-white flex items-center justify-center space-x-2 hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
            </div>
            <span>Watch Aftermovie</span>
          </button>
        </div>
      </div>

      {/* Live Running Festival Ticker Marquee */}
      <div className="relative z-10 mt-12 py-3 bg-fest-purple-deep/70 border-y border-white/10 backdrop-blur-md overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee space-x-8 text-xs font-mono font-bold tracking-widest text-slate-300">
          {[
            '⚡ 18,000+ REGISTERED ATTENDEES',
            '🎵 12+ STAR HEADLINERS',
            '🏆 ₹15,00,000 IN CASH PRIZES',
            '💃 NORTH INDIA DANCE CHAMPIONSHIP',
            '🎸 SYNC-SHOCK BATTLE OF THE BANDS',
            '👗 VOGUE NEXUS CYBERPUNK RUNWAY',
            '🎮 VALORANT & BGMI LAN FINALS',
            '🌟 MARCH 19-21, 2026 • APEX ARENA NEW DELHI'
          ].map((item, idx) => (
            <span key={idx} className="flex items-center space-x-4">
              <span>{item}</span>
              <span className="text-fest-pink font-black text-sm">★</span>
            </span>
          ))}
          {/* Duplicate for infinite seamless scroll */}
          {[
            '⚡ 18,000+ REGISTERED ATTENDEES',
            '🎵 12+ STAR HEADLINERS',
            '🏆 ₹15,00,000 IN CASH PRIZES',
            '💃 NORTH INDIA DANCE CHAMPIONSHIP',
            '🎸 SYNC-SHOCK BATTLE OF THE BANDS',
            '👗 VOGUE NEXUS CYBERPUNK RUNWAY',
            '🎮 VALORANT & BGMI LAN FINALS',
            '🌟 MARCH 19-21, 2026 • APEX ARENA NEW DELHI'
          ].map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center space-x-4">
              <span>{item}</span>
              <span className="text-fest-pink font-black text-sm">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* Video Aftermovie Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-fest-card rounded-2xl overflow-hidden border border-fest-pink/40 shadow-glow-mixed">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-display font-bold text-white">
                <Play className="w-4 h-4 text-fest-pink fill-fest-pink" />
                <span>AURA Festival Cinematic Official Aftermovie</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1 text-sm rounded-lg bg-white/5"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&mute=0&controls=1"
                title="Aura Fest Aftermovie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-fest-dark flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Recorded live at Apex Arena Main Amphitheatre</span>
              <span className="text-fest-cyan">4K Ultra HD • Dolby Atmos Audio</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
