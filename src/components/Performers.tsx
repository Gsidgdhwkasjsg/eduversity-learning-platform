import React from 'react';
import { Mic2, Music, Calendar, Clock, MapPin, Radio, Sparkles, Instagram, Volume2 } from 'lucide-react';
import { HEADLINERS_AND_PERFORMERS, Performer } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const Performers: React.FC = () => {
  const headliner = HEADLINERS_AND_PERFORMERS.find((p) => p.isHeadliner) || HEADLINERS_AND_PERFORMERS[0];
  const otherPerformers = HEADLINERS_AND_PERFORMERS.filter((p) => p.id !== headliner.id);

  return (
    <section id="lineup" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background Neon ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-fest-pink/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-fest-purple/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-pink/10 border border-fest-pink/30 text-fest-pink text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Star Nights & Celebrity Lineup</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            MEET THE{' '}
            <span className="bg-gradient-to-r from-fest-pink via-fest-purple-light to-fest-cyan bg-clip-text text-transparent">
              FESTIVAL HEADLINERS
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            3 consecutive nights of pure sonic euphoria. From international chart-topping DJs to
            celebrated Bollywood vocalists and razor-sharp stand-up comedians.
          </p>
        </div>

        {/* Featured Mega Headliner Showcase Card */}
        {headliner && (
          <div className="relative rounded-3xl overflow-hidden border border-fest-pink/40 bg-fest-card shadow-glow-pink mb-16 group">
            {/* Background Image with Dark Vignette & Gradient */}
            <div className="absolute inset-0">
              <img
                src={headliner.image}
                alt={headliner.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fest-dark via-fest-dark/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-fest-dark via-fest-dark/70 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-end min-h-[460px] lg:min-h-[520px]">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-fest-pink text-white shadow-glow-pink uppercase tracking-widest flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grand Finale Star Headliner</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-fest-cyan border border-fest-cyan/30">
                  DAY {headliner.day} • {headliner.dateStr}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-fest-yellow/10 text-fest-yellow border border-fest-yellow/20">
                  Free Access with College Pass
                </span>
              </div>

              {/* Headliner Title */}
              <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-none mb-3 group-hover:text-glow-cyan transition-all">
                {headliner.name}
              </h3>

              <div className="text-fest-cyan font-mono text-sm sm:text-base font-semibold mb-4 tracking-wide">
                {headliner.genre}
              </div>

              {/* Description */}
              <p className="max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {headliner.bio}
              </p>

              {/* Timing & Stage Strip */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-200 font-mono">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-fest-pink" />
                  <span>{headliner.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-fest-cyan" />
                  <span>{headliner.stage}</span>
                </div>
                {headliner.highlightTrack && (
                  <div className="flex items-center space-x-2 text-fest-yellow">
                    <Volume2 className="w-4 h-4" />
                    <span>Live Track: {headliner.highlightTrack}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sub-Headline: Full Star Night Roster */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Star Nights & Special Guests
          </h3>
          <span className="text-xs font-mono text-fest-cyan">All Performances Included</span>
        </div>

        {/* Other Performers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPerformers.map((performer) => (
            <div
              key={performer.id}
              className="group relative rounded-3xl overflow-hidden bg-fest-card border border-white/10 hover:border-fest-cyan/40 transition-all duration-300 hover:-translate-y-1.5 shadow-glass flex flex-col justify-between"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={performer.image}
                  alt={performer.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fest-card via-transparent to-transparent" />
                
                {/* Day Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-fest-dark/85 backdrop-blur-md border border-white/15 text-fest-cyan">
                    DAY {performer.day}
                  </span>
                </div>

                {/* Genre Tag */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-mono font-semibold text-fest-pink tracking-wider uppercase block">
                    {performer.role}
                  </span>
                </div>
              </div>

              {/* Performer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-xl text-white mb-1 group-hover:text-fest-cyan transition-colors">
                    {performer.name}
                  </h4>
                  <div className="text-xs text-slate-400 font-mono mb-3">
                    {performer.genre}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {performer.bio}
                  </p>
                </div>

                {/* Footer Time & Venue */}
                <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-fest-pink shrink-0" />
                    <span>{performer.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-fest-cyan shrink-0" />
                    <span className="line-clamp-1">{performer.stage}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
