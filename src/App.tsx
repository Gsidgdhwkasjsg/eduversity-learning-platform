import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Schedule } from './components/Schedule';
import { Performers } from './components/Performers';
import { Gallery } from './components/Gallery';
import { Venue } from './components/Venue';
import { RegistrationForm } from './components/RegistrationForm';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { AdminRegistrationsModal } from './components/AdminRegistrationsModal';
import { FestivalEvent } from './data/festivalData';
import { RegistrationRecord, regDb } from './services/db';

export const App: React.FC = () => {
  const [preselectedEvent, setPreselectedEvent] = useState<FestivalEvent | null>(null);
  const [activePass, setActivePass] = useState<RegistrationRecord | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleSelectEvent = (event: FestivalEvent) => {
    setPreselectedEvent(event);
  };

  const handleRegistrationSuccess = (record: RegistrationRecord) => {
    setActivePass(record);
  };

  const handleOpenMyTicket = () => {
    // Open the latest registered pass or the admin portal
    const all = regDb.getAll();
    if (all.length > 0) {
      setActivePass(all[0]);
    } else {
      setAdminModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-fest-dark text-slate-100 flex flex-col font-sans selection:bg-fest-pink selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenMyTicket={handleOpenMyTicket}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Schedule onSelectEventForRegistration={handleSelectEvent} />
        <Performers />
        <Gallery />
        <Venue />
        <RegistrationForm
          preselectedEvent={preselectedEvent}
          onSuccess={handleRegistrationSuccess}
        />
        <Sponsors />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Digital Pass / QR Ticket Modal */}
      {activePass && (
        <DigitalPassModal
          registration={activePass}
          onClose={() => setActivePass(null)}
        />
      )}

      {/* Admin / Registrations Portal Modal */}
      <AdminRegistrationsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onViewPass={(record) => {
          setAdminModalOpen(false);
          setActivePass(record);
        }}
      />
    </div>
  );
};

export default App;
