import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Ticket, Shield, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenMyTicket: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenMyTicket }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = soundEngine.toggle();
    setAudioActive(state);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Headliners', href: '#lineup' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Venue', href: '#venue' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    soundEngine.playClickSFX();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-fest-dark/85 backdrop-blur-xl border-b border-white/10 shadow-glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="group flex items-center space-x-3 cursor-pointer"
              onClick={() => soundEngine.playClickSFX()}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-fest-pink via-fest-purple to-fest-cyan p-[2px] transition-transform group-hover:scale-105 shadow-glow-mixed">
                <div className="w-full h-full bg-fest-dark rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-xl tracking-tighter bg-gradient-to-r from-fest-pink to-fest-cyan bg-clip-text text-transparent">
                    A
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-display font-black text-xl tracking-widest text-white group-hover:text-glow-cyan transition-all">
                    AURA
                  </span>
                  <span className="font-display font-bold text-sm text-fest-cyan px-1.5 py-0.5 rounded bg-fest-cyan/10 border border-fest-cyan/30">
                    2026
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  Where Talent Meets Extraordinary
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-fest-cyan transition-colors rounded-full hover:bg-white/[0.06]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Soundscape Ambient Toggle */}
              <button
                onClick={toggleSound}
                title={audioActive ? 'Mute cyberpunk soundscape' : 'Play ambient fest soundscape'}
                className={`relative p-2.5 rounded-xl border transition-all ${
                  audioActive
                    ? 'bg-fest-cyan/20 border-fest-cyan text-fest-cyan shadow-glow-cyan'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                }`}
              >
                {audioActive ? (
                  <div className="flex items-center space-x-1.5">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span className="flex space-x-0.5 items-end h-3">
                      <span className="w-0.5 h-3 bg-fest-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 h-2 bg-fest-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 h-3.5 bg-fest-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Passes & Admin Button */}
              <button
                onClick={() => {
                  soundEngine.playClickSFX();
                  onOpenAdmin();
                }}
                className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-fest-purple hover:text-white transition-all"
                title="View Registrations Database / Admin"
              >
                <Shield className="w-3.5 h-3.5 text-fest-purple-light" />
                <span>Admin / Passes</span>
              </button>

              {/* Main Register CTA */}
              <a
                href="#register"
                onClick={() => soundEngine.playClickSFX()}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-glow-pink"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-fest-pink via-fest-purple to-fest-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-fest-yellow animate-spin-slow" />
                  <span>Register Now</span>
                </span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={toggleSound}
                className={`p-2 rounded-lg border text-xs ${
                  audioActive
                    ? 'bg-fest-cyan/20 border-fest-cyan text-fest-cyan'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-fest-card/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-fest-cyan" />
                  <span>MARCH 19 - 21, 2026</span>
                </span>
                <span className="text-fest-pink font-semibold">NEW DELHI</span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-2.5 text-left font-display font-medium text-slate-200 hover:text-fest-cyan border-b border-white/5 text-base"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}

              <div className="pt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center justify-center space-x-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                >
                  <Shield className="w-3.5 h-3.5 text-fest-purple-light" />
                  <span>Admin DB</span>
                </button>

                <a
                  href="#register"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    soundEngine.playClickSFX();
                  }}
                  className="flex items-center justify-center space-x-2 py-3 px-3 rounded-xl bg-gradient-to-r from-fest-pink to-fest-purple text-xs font-display font-semibold text-white shadow-glow-pink"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register Now</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
