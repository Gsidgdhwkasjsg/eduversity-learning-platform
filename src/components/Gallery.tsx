import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, ChevronLeft, ChevronRight, X, Sparkles, Download } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'concert', label: 'Concerts & Star Nights' },
    { id: 'dance', label: 'Dance & Battles' },
    { id: 'drama', label: 'Theatre & Dramatics' },
    { id: 'crowd', label: 'Audience & Energy' },
    { id: 'bts', label: 'Behind The Scenes' }
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (item: GalleryItem) => {
    soundEngine.playClickSFX();
    const idx = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
    setActiveLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = () => {
    soundEngine.playClickSFX();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrev = () => {
    soundEngine.playClickSFX();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  const activePhoto = activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-fest-purple/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-fest-cyan/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-purple/15 border border-fest-purple/30 text-fest-purple-light text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Memories & Visual Archive</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            THE AURA{' '}
            <span className="bg-gradient-to-r from-fest-purple-light via-fest-pink to-fest-cyan bg-clip-text text-transparent">
              PHOTO GALLERY
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Relive the raw energy, laser-soaked stages, and triumphant moments from previous festival editions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playClickSFX();
                  setSelectedFilter(tab.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-fest-pink text-white shadow-glow-pink scale-105'
                    : 'bg-fest-card text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-fest-card border border-white/10 hover:border-fest-pink/50 transition-all duration-300 shadow-glass ${
                idx % 5 === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
              }`}
            >
              {/* Photo Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-fest-dark/95 via-fest-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-fest-dark/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                <Maximize2 className="w-4 h-4 text-fest-cyan" />
              </div>

              {/* Year Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-fest-pink/80 text-white backdrop-blur-md shadow-glow-pink">
                  {item.year}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h4 className="font-display font-bold text-base sm:text-lg text-white mb-1 group-hover:text-fest-cyan transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative max-h-[68vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[68vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Bottom Details Bar */}
            <div className="w-full max-w-2xl mt-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-fest-purple/30 text-fest-purple-light border border-fest-purple/40 mb-2">
                AURA FEST ARCHIVE • {activePhoto.year}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="text-[11px] font-mono text-slate-500 mt-2">
                Photo {activeLightboxIndex! + 1} of {GALLERY_ITEMS.length} • Use left/right keys to navigate
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
