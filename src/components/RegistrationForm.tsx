import React, { useState, useEffect } from 'react';
import { 
  Sparkles, User, Mail, Phone, School, BookOpen, 
  Calendar, Users, Plus, Trash2, AlertCircle, CheckCircle2, Ticket, Home 
} from 'lucide-react';
import { FESTIVAL_EVENTS, FestivalEvent } from '../data/festivalData';
import { regDb, RegistrationRecord, TeamMember } from '../services/db';
import { soundEngine } from '../utils/audio';

interface RegistrationFormProps {
  preselectedEvent: FestivalEvent | null;
  onSuccess: (record: RegistrationRecord) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ preselectedEvent, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');
  const [selectedEventId, setSelectedEventId] = useState(preselectedEvent ? preselectedEvent.id : FESTIVAL_EVENTS[0].id);
  const [participationType, setParticipationType] = useState<'individual' | 'team'>('individual');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', email: '' }
  ]);
  const [needsAccommodation, setNeedsAccommodation] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when user clicks "Register" from Schedule component
  useEffect(() => {
    if (preselectedEvent) {
      setSelectedEventId(preselectedEvent.id);
      if (preselectedEvent.entryType === 'Team') {
        setParticipationType('team');
      } else if (preselectedEvent.entryType === 'Solo') {
        setParticipationType('individual');
      }
    }
  }, [preselectedEvent]);

  const currentEvent = FESTIVAL_EVENTS.find((e) => e.id === selectedEventId) || FESTIVAL_EVENTS[0];

  const handleAddMember = () => {
    soundEngine.playClickSFX();
    if (teamMembers.length < 8) {
      setTeamMembers([...teamMembers, { name: '', email: '' }]);
    }
  };

  const handleRemoveMember = (index: number) => {
    soundEngine.playClickSFX();
    setTeamMembers(teamMembers.filter((_, idx) => idx !== index));
  };

  const handleMemberChange = (index: number, field: 'name' | 'email', value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[0-9+ -]{8,15}$/;
    if (!phone.trim() || !phoneRegex.test(phone)) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }

    if (!collegeName.trim() || collegeName.trim().length < 3) {
      errs.collegeName = 'Please enter your college / university name';
    }

    if (!department.trim()) {
      errs.department = 'Please specify your department or branch';
    }

    if (participationType === 'team') {
      if (!teamName.trim()) {
        errs.teamName = 'Team name is required for team participation';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      soundEngine.playClickSFX();
      return;
    }

    setIsSubmitting(true);
    soundEngine.playClickSFX();

    setTimeout(() => {
      // Build team array including team leader
      const allMembers: TeamMember[] =
        participationType === 'team'
          ? [{ name: fullName, email }, ...teamMembers.filter((m) => m.name.trim() !== '')]
          : [{ name: fullName, email }];

      const result = regDb.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        collegeName: collegeName.trim(),
        department: department.trim(),
        yearOfStudy,
        eventId: currentEvent.id,
        eventName: currentEvent.name,
        participationType,
        teamName: participationType === 'team' ? teamName.trim() : undefined,
        teamMembers: allMembers,
        needsAccommodation
      });

      setIsSubmitting(false);

      if (!result.success) {
        setServerError(result.error || 'Registration failed. Please check your details.');
      } else if (result.record) {
        onSuccess(result.record);
        // Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setTeamName('');
        setTeamMembers([{ name: '', email: '' }]);
      }
    }, 400);
  };

  return (
    <section id="register" className="relative py-24 bg-fest-dark overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fest-purple/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fest-pink/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-fest-pink/10 border border-fest-pink/30 text-fest-pink text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Ticket className="w-3.5 h-3.5" />
            <span>Instant Digital Pass Generation</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            OFFICIAL FEST{' '}
            <span className="bg-gradient-to-r from-fest-pink via-fest-purple-light to-fest-cyan bg-clip-text text-transparent">
              REGISTRATION
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Lock in your spot for competitions, Star Nights, and workshops.
            Receive an instant verified QR pass right upon submission.
          </p>
        </div>

        {/* Server / Duplicate Error Alert */}
        {serverError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 flex items-start space-x-3 text-xs animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-bold text-sm text-white mb-0.5">Duplicate Registration Detected</strong>
              <span>{serverError}</span>
            </div>
            <button
              onClick={() => setServerError(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Registration Card Form */}
        <div className="rounded-3xl bg-fest-card/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Event Selection Section */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase font-bold text-fest-cyan">
                  1. Select Event / Competition <span className="text-fest-pink">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  Prize: <strong className="text-fest-yellow">{currentEvent.prizePool}</strong>
                </span>
              </div>

              <select
                value={selectedEventId}
                onChange={(e) => {
                  setSelectedEventId(e.target.value);
                  const ev = FESTIVAL_EVENTS.find((item) => item.id === e.target.value);
                  if (ev) {
                    if (ev.entryType === 'Team') setParticipationType('team');
                    else if (ev.entryType === 'Solo') setParticipationType('individual');
                  }
                }}
                className="w-full bg-fest-dark border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fest-cyan focus:ring-1 focus:ring-fest-cyan transition-all font-sans"
              >
                {FESTIVAL_EVENTS.map((event) => (
                  <option key={event.id} value={event.id} className="bg-fest-dark text-white">
                    [{event.category.toUpperCase()}] {event.name} — Day {event.day} ({event.prizePool})
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <span>Stage: <strong className="text-slate-200">{currentEvent.venue}</strong></span>
                <span>•</span>
                <span>Time: <strong className="text-slate-200">{currentEvent.startTime}</strong></span>
                <span>•</span>
                <span>Mode: <strong className="text-fest-cyan">{currentEvent.entryType}</strong></span>
              </div>
            </div>

            {/* 2. Candidate Personal Information */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-4 tracking-wider">
                2. Candidate Credentials
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Aryan Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-fest-dark/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-cyan focus:ring-fest-cyan'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      placeholder="e.g. aryan.sharma@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-fest-dark/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-cyan focus:ring-fest-cyan'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    WhatsApp / Mobile Number <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-fest-dark/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-cyan focus:ring-fest-cyan'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Year of Study */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Year of Study <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full bg-fest-dark/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-fest-cyan focus:ring-1 focus:ring-fest-cyan transition-all"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                      <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. College & Academic Information */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-4 tracking-wider">
                3. Academic Institution
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* College Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    College / University Name <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Delhi University / IIT Delhi / BITS"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className={`w-full bg-fest-dark/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.collegeName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-cyan focus:ring-fest-cyan'
                      }`}
                    />
                  </div>
                  {errors.collegeName && <p className="text-[11px] text-rose-400 mt-1">{errors.collegeName}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Department / Major <span className="text-fest-pink">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Computer Science / Design / Commerce"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className={`w-full bg-fest-dark/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.department
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-cyan focus:ring-fest-cyan'
                      }`}
                    />
                  </div>
                  {errors.department && <p className="text-[11px] text-rose-400 mt-1">{errors.department}</p>}
                </div>
              </div>
            </div>

            {/* 4. Individual vs Team Participation */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-4 tracking-wider">
                4. Participation Format
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClickSFX();
                    setParticipationType('individual');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    participationType === 'individual'
                      ? 'bg-fest-cyan/15 border-fest-cyan text-white shadow-glow-cyan'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <User className="w-5 h-5 mb-2 text-fest-cyan" />
                  <div className="font-display font-bold text-sm text-white">Individual (Solo)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Participating independently</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClickSFX();
                    setParticipationType('team');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    participationType === 'team'
                      ? 'bg-fest-pink/15 border-fest-pink text-white shadow-glow-pink'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Users className="w-5 h-5 mb-2 text-fest-pink" />
                  <div className="font-display font-bold text-sm text-white">Team / Crew / Band</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Registering as a group entry</div>
                </button>
              </div>

              {/* Dynamic Team Fields */}
              {participationType === 'team' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Official Team / Band Name <span className="text-fest-pink">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Velocity Street Crew / Neon Pulse Band"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className={`w-full bg-fest-dark border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.teamName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-fest-pink focus:ring-fest-pink'
                      }`}
                    />
                    {errors.teamName && <p className="text-[11px] text-rose-400 mt-1">{errors.teamName}</p>}
                  </div>

                  {/* Team Members List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase text-slate-400">
                        Additional Team Members (Leader included automatically)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center space-x-1 text-xs font-mono text-fest-cyan hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Member</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {teamMembers.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={`Member ${idx + 2} Name`}
                            value={member.name}
                            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                            className="flex-1 bg-fest-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-fest-cyan"
                          />
                          <input
                            type="email"
                            placeholder="Member Email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            className="flex-1 bg-fest-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-fest-cyan"
                          />
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(idx)}
                              className="p-2 text-slate-500 hover:text-rose-400"
                              title="Remove member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Outstation Accommodation Checkbox */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start space-x-3">
              <input
                type="checkbox"
                id="acc-check"
                checked={needsAccommodation}
                onChange={(e) => setNeedsAccommodation(e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-fest-dark border-white/20 text-fest-pink focus:ring-fest-pink"
              />
              <label htmlFor="acc-check" className="text-xs text-slate-300 cursor-pointer">
                <span className="font-bold text-white block">Request Campus Hostel Accommodation</span>
                Check this if you or your collegiate team are traveling from outside Delhi-NCR and require hostel lodging during fest days.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden py-4 px-6 rounded-2xl font-display font-bold text-base text-white shadow-glow-pink transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-fest-pink via-fest-purple to-fest-cyan opacity-95 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-fest-yellow animate-spin-slow" />
                    <span>Complete Registration & Generate Pass</span>
                  </>
                )}
              </span>
            </button>

            <p className="text-center text-[11px] font-mono text-slate-500">
              🔒 Safe & verified submission. Pass details will be stored in your browser database and downloadable immediately.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
