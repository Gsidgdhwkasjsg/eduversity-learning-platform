import React from 'react';
import { Award, ExternalLink, Sparkles, Handshake, Mail } from 'lucide-react';
import { SPONSORS, Sponsor } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const Sponsors: React.FC = () => {
  const titleSponsor = SPONSORS.filter((s) => s.tier === 'Title Sponsor');
  const poweredBy = SPONSORS.filter((s) => s.tier === 'Powered By');
  const associates = SPONSORS.filter((s) => s.tier === 'Associate Sponsor');
  const mediaAndFood = SPONSORS.filter((s) => s.tier === 'Media Partner' || s.tier === 'Beverage & Food');

  const renderSponsorCard = (sponsor: Sponsor, isLarge = false) => (
    <a
      key={sponsor.id}
      href={sponsor.website}
      target="_blank"
      rel="noreferrer"
      onClick={() => soundEngine.playClickSFX()}
      className={`group relative rounded-3xl bg-fest-card border border-white/10 hover:border-fest-cyan/40 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-glass flex flex-col justify-between items-center text-center ${
        isLarge ? 'md:col-span-2' : ''
      }`}
    >
      {/* Top tier pill */}
      <div className="w-full flex items-center justify-between mb-6">
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:text-fest-cyan group-hover:border-fest-cyan/30 transition-colors">
          {sponsor.tier}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
      </div>

      {/* Sponsor Logo Mark */}
      <div className="my-4 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all w-full flex items-center justify-center min-h-[90px]">
        <span
          className="font-display font-black text-2xl sm:text-3xl tracking-tight transition-transform group-hover:scale-105"
          style={{ color: sponsor.accentColor }}
        >
          {sponsor.logoText}
        </span>
      </div>

      {/* Sponsor Metadata */}
      <div className="mt-2">
        <div className="font-display font-bold text-sm text-white group-hover:text-fest-cyan transition-colors">
          {sponsor.name}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-0.5">
          {sponsor.industry}
        </div>
      </div>
    </a>
  );

  return (
    <section id="sponsors" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-fest-yellow/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-yellow/10 border border-fest-yellow/30 text-fest-yellow text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>Valued Brand Collaborators</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            OUR ESTEEMED{' '}
            <span className="bg-gradient-to-r from-fest-yellow via-fest-pink to-fest-cyan bg-clip-text text-transparent">
              SPONSORS & PARTNERS
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Powering extraordinary collegiate creativity, technology, and stage production.
          </p>
        </div>

        {/* 1. Title & Powered By Row */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 text-center">
            ★ Premier Headlining Partners
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {titleSponsor.map((s) => renderSponsorCard(s, false))}
            {poweredBy.map((s) => renderSponsorCard(s, false))}
          </div>
        </div>

        {/* 2. Associate Sponsors Row */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 text-center">
            ★ Associate Sponsors
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {associates.map((s) => renderSponsorCard(s, false))}
          </div>
        </div>

        {/* 3. Media, Beverage & Experience Partners */}
        <div className="mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 text-center">
            ★ Media, Food & Ticketing Network
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mediaAndFood.map((s) => renderSponsorCard(s, false))}
          </div>
        </div>

        {/* Sponsor Partnership CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-fest-card via-fest-purple-deep/80 to-fest-card border border-white/10 p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-glass relative overflow-hidden">
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-fest-yellow mx-auto mb-3 animate-spin-slow" />
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              Partner With North India's Biggest Youth Festival
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
              Showcase your brand directly to 18,000+ top collegiate students, engineers, designers,
              and young influencers with custom experiential booths and digital reach.
            </p>
            <a
              href="mailto:sponsorships.aura@aisdt.ac.in?subject=Sponsorship%20Inquiry%20-%20AURA%202026"
              onClick={() => soundEngine.playClickSFX()}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-fest-pink to-fest-purple hover:scale-105 transition-transform shadow-glow-pink"
            >
              <Mail className="w-4 h-4" />
              <span>Download Partnership Deck & Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
