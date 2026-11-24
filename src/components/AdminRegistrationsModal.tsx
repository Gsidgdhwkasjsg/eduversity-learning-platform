import React, { useState, useEffect } from 'react';
import { 
  Shield, Download, Search, Trash2, X, RefreshCw, 
  Users, CheckCircle2, AlertTriangle, FileSpreadsheet, Ticket 
} from 'lucide-react';
import { regDb, RegistrationRecord } from '../services/db';
import { soundEngine } from '../utils/audio';

interface AdminRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPass: (record: RegistrationRecord) => void;
}

export const AdminRegistrationsModal: React.FC<AdminRegistrationsModalProps> = ({
  isOpen,
  onClose,
  onViewPass
}) => {
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'individual' | 'team'>('all');

  const reloadRecords = () => {
    setRecords(regDb.getAll());
  };

  useEffect(() => {
    if (isOpen) {
      reloadRecords();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredRecords = records.filter((r) => {
    if (selectedFilter !== 'all' && r.participationType !== selectedFilter) return false;
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.collegeName.toLowerCase().includes(term) ||
      r.eventName.toLowerCase().includes(term) ||
      r.id.toLowerCase().includes(term) ||
      (r.teamName && r.teamName.toLowerCase().includes(term))
    );
  });

  const handleDelete = (id: string, name: string) => {
    soundEngine.playClickSFX();
    if (window.confirm(`Are you sure you want to delete registration for ${name} (${id})?`)) {
      regDb.delete(id);
      reloadRecords();
    }
  };

  const handleExportCSV = () => {
    soundEngine.playClickSFX();
    const csvContent = regDb.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AURA_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-fest-dark border border-fest-purple/40 rounded-3xl p-6 sm:p-8 shadow-glow-purple max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-fest-purple/20 border border-fest-purple/40 text-fest-purple-light">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Fest Registrations Database
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  {records.length} Stored
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real-time persistent entries • Auto-synced to LocalStorage / IndexedDB
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-fest-cyan/15 hover:bg-fest-cyan/25 border border-fest-cyan/30 text-fest-cyan font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            {/* Refresh */}
            <button
              onClick={() => {
                soundEngine.playClickSFX();
                reloadRecords();
              }}
              title="Refresh Records"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, college, ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-fest-card border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fest-cyan"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {(['all', 'individual', 'team'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  soundEngine.playClickSFX();
                  setSelectedFilter(filter);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all ${
                  selectedFilter === filter
                    ? 'bg-fest-purple text-white font-bold'
                    : 'bg-fest-card text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-y-auto border border-white/10 rounded-2xl bg-fest-card/50">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-fest-card text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-3 px-4">Pass ID</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Registered Event</th>
                <th className="py-3 px-4">Mode / Team</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-fest-cyan whitespace-nowrap">
                    {r.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{r.fullName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{r.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white line-clamp-1">{r.collegeName}</div>
                    <div className="text-[11px] text-slate-400">{r.department} • {r.yearOfStudy}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-fest-pink block line-clamp-1">{r.eventName}</span>
                    {r.needsAccommodation && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-fest-yellow/20 text-fest-yellow mt-0.5">
                        Hostel Requested
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-200">
                      {r.participationType}
                    </span>
                    {r.teamName && (
                      <div className="text-[11px] text-fest-cyan mt-1 font-mono">
                        "{r.teamName}" ({r.teamMembers?.length || 1} pax)
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => onViewPass(r)}
                      title="View & Print Digital Pass"
                      className="px-2.5 py-1.5 rounded-lg bg-fest-cyan/10 hover:bg-fest-cyan/20 text-fest-cyan font-mono text-[11px] border border-fest-cyan/30"
                    >
                      <Ticket className="w-3.5 h-3.5 inline mr-1" />
                      Pass
                    </button>
                    <button
                      onClick={() => handleDelete(r.id, r.fullName)}
                      title="Delete Entry"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No registration records match the current filter.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Showing {filteredRecords.length} of {records.length} registrations</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
