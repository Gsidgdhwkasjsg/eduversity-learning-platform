import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, Trophy, Users, Search, Filter, 
  ExternalLink, Sparkles, ChevronRight, CheckCircle2, Phone, X 
} from 'lucide-react';
import { FESTIVAL_EVENTS, EVENT_CATEGORIES, FestivalEvent } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

interface ScheduleProps {
  onSelectEventForRegistration: (event: FestivalEvent) => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onSelectEventForRegistration }) => {
  const [activeDay, setActiveDay] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventModal, setSelectedEventModal] = useState<FestivalEvent | null>(null);

  const daysConfig = [
    { id: 'all', title: 'All Days', subtitle: 'March 19 - 21' },
    { id: 1, title: 'Day 1: Genesis', subtitle: 'Thursday, Mar 19' },
    { id: 2, title: 'Day 2: Eclipse', subtitle: 'Friday, Mar 20' },
    { id: 3, title: 'Day 3: Supernova', subtitle: 'Saturday, Mar 21' }
  ];

  const filteredEvents = useMemo(() => {
    return FESTIVAL_EVENTS.filter((event) => {
      // Day filter
      if (activeDay !== 'all' && event.day !== activeDay) return false;

      // Category filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = event.name.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesCat = event.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesVenue || matchesCat;
      }

      return true;
    });
  }, [activeDay, selectedCategory, searchQuery]);

  const handleRegisterClick = (event: FestivalEvent) => {
    soundEngine.playClickSFX();
    onSelectEventForRegistration(event);
    const formElem = document.querySelector('#register');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="schedule" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-fest-cyan/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-fest-pink/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-cyan/10 border border-fest-cyan/30 text-fest-cyan text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Official Festival Timetable</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            EXPLORE THE{' '}
            <span className="bg-gradient-to-r from-fest-cyan via-fest-purple-light to-fest-pink bg-clip-text text-transparent">
              EVENT SCHEDULE
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            48+ high-energy competitions spanning music, dance, fashion, esports, and dramatics.
            Filter by day or category, check venue timings, and register directly.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {daysConfig.map((day) => {
            const isActive = activeDay === day.id;
            return (
              <button
                key={String(day.id)}
                onClick={() => {
                  soundEngine.playClickSFX();
                  setActiveDay(day.id as any);
                }}
                className={`px-5 py-3 rounded-2xl font-display font-bold text-sm transition-all text-left flex flex-col ${
                  isActive
                    ? 'bg-gradient-to-r from-fest-pink to-fest-purple text-white shadow-glow-pink scale-105'
                    : 'bg-fest-card border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-sm">{day.title}</span>
                <span className={`text-[10px] font-mono tracking-wider ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  {day.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-fest-card/70 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
          {/* Category Pills (Horizontal scrollable) */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {EVENT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playClickSFX();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-fest-cyan text-fest-dark font-bold shadow-glow-cyan'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search event, stage, or rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-fest-dark/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-white placeholder-slate-500 focus:outline-none focus:border-fest-cyan focus:ring-1 focus:ring-fest-cyan transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active Result Count */}
        <div className="flex items-center justify-between mb-6 px-2 text-xs font-mono text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredEvents.length}</strong> events
            {activeDay !== 'all' && ` for Day ${activeDay}`}
            {selectedCategory !== 'all' && ` in ${selectedCategory.toUpperCase()}`}
          </span>
          <span className="text-fest-pink">● Live Slots Available</span>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-fest-card border border-white/10 hover:border-fest-cyan/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-glass overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fest-pink via-fest-purple to-fest-cyan opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Meta: Category + Day */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-fest-purple/20 border border-fest-purple/30 text-fest-purple-light uppercase">
                    {event.category}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-fest-cyan"></span>
                    <span>DAY {event.day} • {event.dateStr.split(',')[1]}</span>
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-fest-cyan transition-colors line-clamp-1">
                  {event.name}
                </h3>

                {/* Short Tagline */}
                <p className="text-xs text-fest-pink/90 font-mono italic mb-3">
                  "{event.tagline}"
                </p>

                {/* Short Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Attributes */}
                <div className="space-y-2 text-xs text-slate-300 border-t border-white/5 pt-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-fest-cyan shrink-0" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-fest-pink shrink-0" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.teamSize} ({event.entryType})</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-mono font-bold text-fest-yellow bg-fest-yellow/10 px-2 py-0.5 rounded border border-fest-yellow/20">
                      <Trophy className="w-3 h-3" />
                      <span>{event.prizePool}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => {
                    soundEngine.playClickSFX();
                    setSelectedEventModal(event);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all flex items-center justify-center space-x-1"
                >
                  <span>Rules & Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleRegisterClick(event)}
                  className="px-3 py-2 rounded-xl text-xs font-display font-semibold text-white bg-gradient-to-r from-fest-pink to-fest-purple hover:from-fest-pink-light hover:to-fest-purple-light shadow-glow-pink transition-all flex items-center justify-center space-x-1"
                >
                  <span>Register</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-fest-card rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="font-display font-bold text-lg text-white mb-1">No Events Found</h4>
            <p className="text-xs text-slate-400 mb-4">
              We couldn't find any events matching "{searchQuery}". Try selecting another category or day.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveDay('all');
              }}
              className="px-4 py-2 rounded-xl bg-fest-cyan text-fest-dark font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Event Details & Rules Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-fest-card border border-fest-cyan/40 rounded-3xl p-6 sm:p-8 shadow-glow-cyan max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Category & Day */}
            <div className="flex items-center space-x-2 text-xs font-mono mb-2">
              <span className="px-2.5 py-1 rounded bg-fest-purple/20 text-fest-purple-light uppercase">
                {selectedEventModal.category}
              </span>
              <span className="text-slate-400">
                DAY {selectedEventModal.day} • {selectedEventModal.dateStr}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              {selectedEventModal.name}
            </h3>
            <p className="text-xs text-fest-cyan font-mono italic mb-4">
              "{selectedEventModal.tagline}"
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedEventModal.description}
            </p>

            {/* Key Information Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-fest-dark border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">PRIZE POOL</span>
                <span className="font-mono font-bold text-fest-yellow text-sm">{selectedEventModal.prizePool}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">TIMING</span>
                <span className="font-sans font-medium text-white">{selectedEventModal.startTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">TEAM SIZE</span>
                <span className="font-sans font-medium text-white">{selectedEventModal.teamSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">VENUE</span>
                <span className="font-sans font-medium text-white line-clamp-1">{selectedEventModal.venue}</span>
              </div>
            </div>

            {/* Official Rules & Judging Criteria */}
            <div className="mb-6">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-slate-200 mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-fest-cyan" />
                <span>Official Rules & Guidelines</span>
              </h4>
              <ul className="space-y-2">
                {selectedEventModal.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="text-fest-pink font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Coordinator Info */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Student Event Head</span>
                <span className="font-semibold text-white">{selectedEventModal.coordinator.name}</span>
              </div>
              <a
                href={`tel:${selectedEventModal.coordinator.phone}`}
                className="flex items-center space-x-1.5 text-fest-cyan hover:underline font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{selectedEventModal.coordinator.phone}</span>
              </a>
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-white/5"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ev = selectedEventModal;
                  setSelectedEventModal(null);
                  handleRegisterClick(ev);
                }}
                className="px-6 py-2.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-fest-pink to-fest-purple shadow-glow-pink"
              >
                Register For This Event
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
