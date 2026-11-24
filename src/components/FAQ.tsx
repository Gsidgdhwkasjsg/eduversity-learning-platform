import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Registration', 'Passes & Entry', 'Accommodation', 'Competitions', 'General'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedCat === 'All') return true;
    return item.category === selectedCat;
  });

  const toggleAccordion = (id: string) => {
    soundEngine.playClickSFX();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-fest-purple/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-cyan/10 border border-fest-cyan/30 text-fest-cyan text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            FREQUENTLY ASKED{' '}
            <span className="bg-gradient-to-r from-fest-cyan via-fest-purple-light to-fest-pink bg-clip-text text-transparent">
              QUESTIONS
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about passes, competition eligibility, hostels, and campus rules.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClickSFX();
                setSelectedCat(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-fest-cyan text-fest-dark font-bold shadow-glow-cyan'
                  : 'bg-fest-card text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-fest-card border-fest-cyan/40 shadow-glow-cyan'
                    : 'bg-fest-card/70 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-fest-pink shrink-0" />
                    <span className="font-display font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-fest-cyan shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-fest-pink' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-mono uppercase tracking-wider text-fest-purple-light">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
