import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Instagram, Youtube, Linkedin, 
  Send, Shield, Heart, ExternalLink, X, FileText, CheckCircle2 
} from 'lucide-react';
import { COMMITTEE_MEMBERS, FESTIVAL_INFO } from '../data/festivalData';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'conduct' | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      soundEngine.playClickSFX();
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="contact" className="relative bg-fest-dark border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-gradient-to-b from-fest-purple/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Organizing Committee Strip */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-fest-cyan uppercase block mb-1">
              Leadership & Coordination
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Organizing Committee Contacts
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Have questions regarding invitations, corporate sponsorship, or media passes? Connect directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMITTEE_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group rounded-3xl bg-fest-card border border-white/10 hover:border-fest-cyan/40 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 shadow-glass text-center"
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-fest-purple/40 group-hover:border-fest-cyan transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-fest-cyan transition-colors">
                  {member.name}
                </h4>
                <div className="text-xs font-mono font-semibold text-fest-pink mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                  {member.department}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs font-mono">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center space-x-1.5 text-slate-300 hover:text-white truncate"
                  >
                    <Mail className="w-3 h-3 text-fest-cyan shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-center space-x-1.5 text-slate-400 hover:text-fest-yellow"
                  >
                    <Phone className="w-3 h-3 text-fest-yellow shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Festival Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fest-pink to-fest-cyan flex items-center justify-center font-display font-black text-base text-white">
                A
              </div>
              <span className="font-display font-black text-2xl tracking-widest text-white">
                AURA 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              North India's flagship inter-collegiate cultural fest celebrating music, dramatics,
              street dance, cyber fashion, and competitive gaming.
            </p>
            <div className="text-xs font-mono text-slate-400 space-y-1 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-fest-pink shrink-0" />
                <span>Sector 62, Tech City, New Delhi - 110001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-fest-cyan shrink-0" />
                <span>aura2026@aisdt.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#about" className="hover:text-fest-cyan transition-colors">About Festival</a></li>
              <li><a href="#schedule" className="hover:text-fest-cyan transition-colors">Schedule & Timetable</a></li>
              <li><a href="#lineup" className="hover:text-fest-cyan transition-colors">Star Night Headliners</a></li>
              <li><a href="#gallery" className="hover:text-fest-cyan transition-colors">Visual Gallery</a></li>
              <li><a href="#venue" className="hover:text-fest-cyan transition-colors">Campus Venue & Map</a></li>
              <li><a href="#sponsors" className="hover:text-fest-cyan transition-colors">Sponsors & Partners</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Guidelines & Rules
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => setActiveModal('conduct')} className="hover:text-fest-pink transition-colors text-left">
                  Student Code of Conduct
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-fest-pink transition-colors text-left">
                  Data & Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="hover:text-fest-pink transition-colors text-left">
                  Festival Terms & Conditions
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-fest-pink transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="pt-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-fest-pink/20 hover:text-fest-pink border border-white/10 transition-all shadow-glass"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 transition-all shadow-glass"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 border border-white/10 transition-all shadow-glass"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Stay In The Loop
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get secret headliner hints, schedule updates, and emergency transit alerts.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're subscribed! See you at AURA.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter college email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-fest-card border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fest-cyan"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-fest-cyan text-fest-dark font-mono font-bold text-xs"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © 2026 AURA Cultural Fest. All Rights Reserved. Apex Institute of Science & Technology.
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-fest-pink fill-fest-pink inline" />
            <span>for collegiate creators worldwide.</span>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-xl bg-fest-card border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-fest-cyan mb-2 font-mono text-xs uppercase font-bold">
              <FileText className="w-4 h-4" />
              <span>Official Document</span>
            </div>

            <h3 className="font-display font-black text-2xl text-white mb-4 capitalize">
              {activeModal === 'conduct' && 'Student Code of Conduct & Safety Guidelines'}
              {activeModal === 'privacy' && 'Attendee Privacy Policy & Registration Data'}
              {activeModal === 'terms' && 'Festival Terms, Ticketing & Valedictory Rules'}
            </h3>

            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              {activeModal === 'conduct' && (
                <>
                  <p>
                    1. <strong>Identity Verification:</strong> Every student entering the campus must
                    carry their official physical college student ID card alongside their digital QR pass.
                  </p>
                  <p>
                    2. <strong>Zero Tolerance:</strong> Drug consumption, alcoholic substances, weapons,
                    and harassment of any form will lead to immediate campus escort and legal reporting.
                  </p>
                  <p>
                    3. <strong>Respect For Art & Campus:</strong> Damage to sound equipment, stage lighting,
                    or college infrastructure will be heavily fined to the participating contingent.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    1. <strong>Data Collection:</strong> We collect only candidate name, college affiliation,
                    phone number, and email strictly for the purpose of issuing passes and competition schedules.
                  </p>
                  <p>
                    2. <strong>Storage:</strong> All registrations are stored locally in your browser and on
                    secure encrypted servers. We do not sell attendee data to third-party advertisers.
                  </p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p>
                    1. <strong>Valedictory & Prizes:</strong> Cash prizes are disbursed via NEFT/UPI to the
                    designated team leader or solo winner within 7 business days following document verification.
                  </p>
                  <p>
                    2. <strong>Jury Decisions:</strong> Decisions made by the official judges and juries for
                    all competitions are final and binding.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-fest-purple text-white font-mono text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
