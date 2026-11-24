import React from 'react';
import { Users, GraduationCap, Trophy, Sparkles, Mic2, Flame, Compass, Music, Radio, Zap } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/festivalData';

export const About: React.FC = () => {
  const highlights = [
    {
      title: 'Star Nights & EDM Arena',
      description: '3 massive headline concert nights with international DJs, Bollywood vocalists, and legendary indie bands powered by 100,000-watt line arrays.',
      icon: Mic2,
      gradient: 'from-fest-pink to-fest-purple',
      badge: 'Concerts'
    },
    {
      title: 'High-Stakes Competitions',
      description: 'Over 48 judged contests spanning Western Dance battles, Battle of the Bands, Street Play, and Poetry Slams with ₹15,00,000 in cash prizes.',
      icon: Trophy,
      gradient: 'from-fest-purple to-fest-cyan',
      badge: '48+ Contests'
    },
    {
      title: 'Vogue Nexus: Cyber Couture',
      description: 'North India’s premier collegiate fashion runway. Avant-garde garments, cybernetic aesthetics, and supermodel walks on a 60-foot neon ramp.',
      icon: Sparkles,
      gradient: 'from-fest-cyan to-fest-pink',
      badge: 'Runway'
    },
    {
      title: 'Cyber Arena & Tech Pavilion',
      description: '24-hour hackathons, 30kg destruction RoboWars, and high-FPS esports tournaments in Valorant and BGMI with live shoutcasting.',
      icon: Zap,
      gradient: 'from-fest-yellow to-fest-pink',
      badge: 'Esports & Bots'
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-fest-purple/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fest-pink/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-purple/20 border border-fest-purple/40 text-fest-purple-light text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover The Phenomenon</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            WHERE TALENT MEETS{' '}
            <span className="bg-gradient-to-r from-fest-pink via-fest-purple-light to-fest-cyan bg-clip-text text-transparent">
              THE EXTRAORDINARY
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Founded in 2012, <span className="text-white font-semibold">AURA</span> has evolved into 
            one of the nation’s most eagerly awaited collegiate cultural festivals. For three relentless 
            days, our 65-acre campus transforms into an exhilarating playground of music, art, technology, 
            and limitless creative expression.
          </p>
        </div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {FESTIVAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-fest-card border border-white/10 hover:border-fest-cyan/40 backdrop-blur-md transition-all hover:-translate-y-1 shadow-glass text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-fest-cyan group-hover:scale-110 group-hover:text-fest-pink transition-all">
                {idx === 0 && <Users className="w-5 h-5" />}
                {idx === 1 && <GraduationCap className="w-5 h-5" />}
                {idx === 2 && <Trophy className="w-5 h-5" />}
                {idx === 3 && <Sparkles className="w-5 h-5" />}
                {idx === 4 && <Mic2 className="w-5 h-5" />}
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight group-hover:text-glow-cyan transition-all">
                {stat.prefix || ''}
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-fest-card border border-white/10 hover:border-fest-pink/40 backdrop-blur-xl transition-all hover:-translate-y-1 shadow-glass overflow-hidden"
              >
                {/* Glow highlight on hover */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 blur-3xl transition-opacity pointer-events-none`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-fest-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* College & Host Info Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-fest-purple-deep via-fest-card to-fest-dark p-8 border border-white/10 relative overflow-hidden shadow-glass">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-fest-pink uppercase">
                Hosted With Pride By
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                {FESTIVAL_INFO.collegeName}
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                A premier autonomous engineering and design institution recognized for academic excellence,
                state-of-the-art amphitheaters, sprawling sports complexes, and vibrant cultural legacy.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#schedule"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-semibold text-sm transition-all"
              >
                View Fest Schedule
              </a>
              <a
                href="#venue"
                className="px-6 py-3 rounded-xl bg-fest-purple/30 hover:bg-fest-purple/50 border border-fest-purple text-white font-display font-semibold text-sm transition-all"
              >
                Explore Campus Venue
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
