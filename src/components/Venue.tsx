import React, { useState } from 'react';
import { 
  MapPin, Navigation, Car, Shield, Phone, ExternalLink, 
  Train, Bus, Clock, Info, CheckCircle 
} from 'lucide-react';
import { FESTIVAL_INFO } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const Venue: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metro' | 'car' | 'gates' | 'security'>('metro');

  return (
    <section id="venue" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-fest-cyan/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fest-purple/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-cyan/10 border border-fest-cyan/30 text-fest-cyan text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Navigation className="w-3.5 h-3.5" />
            <span>Campus Location & Transit Guide</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            VENUE &{' '}
            <span className="bg-gradient-to-r from-fest-cyan via-fest-purple-light to-fest-pink bg-clip-text text-transparent">
              LOCATION
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Hosted across the sprawling 65-acre campus of Apex Institute of Science & Technology,
            equipped with high-capacity open-air amphitheaters, acoustic auditoriums, and smart security.
          </p>
        </div>

        {/* Main Grid: Left Map + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden bg-fest-card border border-white/10 shadow-glass">
            {/* Map Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-fest-card/90">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-fest-pink/20 text-fest-pink">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">
                    Apex Grand Campus Arena
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Sector 62, New Delhi - 110001
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=New+Delhi"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClickSFX()}
                className="px-3.5 py-2 rounded-xl bg-fest-cyan/10 hover:bg-fest-cyan/20 border border-fest-cyan/30 text-fest-cyan text-xs font-mono font-semibold transition-all flex items-center space-x-1.5"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Map iframe with dark contrast styling */}
            <div className="relative aspect-[16/10] w-full bg-slate-900">
              <iframe
                title="Aura Fest 2026 Venue Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729797!2d77.2089851!3d28.6324291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale-[60%] invert-[90%] hue-rotate-[190deg] contrast-[110%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Footer Information */}
            <div className="p-4 bg-fest-dark flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-fest-cyan" />
                <span>Gates open 09:00 AM daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-fest-yellow animate-ping"></span>
                <span className="text-white">Active Security Checkpoints at Gates 1, 2 & 3</span>
              </div>
            </div>
          </div>

          {/* Transit & Venue Logistics Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Tab Buttons */}
            <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-fest-card border border-white/10">
              {[
                { id: 'metro', label: 'Metro', icon: Train },
                { id: 'car', label: 'Parking', icon: Car },
                { id: 'gates', label: 'Entry Gates', icon: Info },
                { id: 'security', label: 'Security', icon: Shield }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundEngine.playClickSFX();
                      setActiveTab(tab.id as any);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-medium transition-all flex flex-col items-center space-y-1 ${
                      isSelected
                        ? 'bg-fest-purple text-white shadow-glow-purple font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Box */}
            <div className="p-6 rounded-3xl bg-fest-card border border-white/10 shadow-glass min-h-[320px] flex flex-col justify-between">
              {activeTab === 'metro' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-fest-cyan font-display font-bold text-lg">
                    <Train className="w-5 h-5" />
                    <span>Metro Connectivity</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The campus is directly connected via the Delhi Metro Blue and Magenta lines.
                  </p>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <strong className="text-white block">Nearest Station: Electronic City (Blue Line)</strong>
                      <span className="text-slate-400">800m from campus North Gate. Free AURA shuttle e-rickshaws available every 7 mins.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <strong className="text-white block">Botanical Garden Interchange (Magenta / Blue)</strong>
                      <span className="text-slate-400">Direct feeder buses (Route 54) run continuously to the venue gate.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'car' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-fest-yellow font-display font-bold text-lg">
                    <Car className="w-5 h-5" />
                    <span>Parking & EV Charging</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Over 2,500 dedicated multi-level parking slots managed by automated barrier systems.
                  </p>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <strong className="text-white block">Parking Zone P1 (North Campus Ground)</strong>
                      <span className="text-slate-400">Open for two-wheelers and student cars with valid digital event passes.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <strong className="text-white block">Parking Zone P2 (Multi-Level Basement)</strong>
                      <span className="text-slate-400">Includes 24 DC Fast EV charging stations powered by Tata Power.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gates' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-fest-pink font-display font-bold text-lg">
                    <Info className="w-5 h-5" />
                    <span>Designated Entry Gates</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start space-x-2">
                      <span className="font-mono font-bold text-fest-pink">GATE 1:</span>
                      <span>General Student & Public Entry (Main Boulevard Road)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start space-x-2">
                      <span className="font-mono font-bold text-fest-cyan">GATE 2:</span>
                      <span>Registered Competitors, Props & Team Buses (East Gate)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start space-x-2">
                      <span className="font-mono font-bold text-fest-yellow">GATE 3:</span>
                      <span>Celebrity Guests, Faculty, VIPs & Media Pass Holders</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-fest-purple-light font-display font-bold text-lg">
                    <Shield className="w-5 h-5" />
                    <span>Campus Safety & Protocols</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Original college student ID card mandatory alongside digital pass.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>24x7 on-campus ambulance and Max Healthcare medical trauma unit.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Strict zero tolerance for harassment, contraband, or alcohol.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Transit Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Need transit assistance?</span>
                <a
                  href="tel:+919833344556"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-fest-cyan hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Logistics Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
