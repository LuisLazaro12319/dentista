import React, { useState, useEffect } from 'react';
import { Appointment } from './types/dental';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ClinicalCasesGallery } from './components/ClinicalCasesGallery';
import { DoctorsSection } from './components/DoctorsSection';
import { BookingSection } from './components/BookingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { AppointmentsModal } from './components/AppointmentsModal';

export default function App() {
  // Appointments state with localStorage persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('novasmile_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Initial sample appointment for immediate utility preview
    return [
      {
        id: 'apt-sample-1',
        bookingCode: 'NVS-2026-7841',
        patientName: 'Luis Lázaro',
        patientPhone: '+34 612 987 654',
        patientEmail: 'luis.lazaro@example.com',
        serviceId: 'ortodoncia-invisible',
        serviceName: 'Ortodoncia Invisible (Alineadores 3D)',
        doctorId: 'dr-elena',
        doctorName: 'Dra. Elena Montes',
        date: '2026-10-22',
        timeSlot: '11:15',
        isFirstVisit: true,
        symptoms: 'Revisión y estudio 3D para alineadores transparentes',
        status: 'confirmed',
        createdAt: '2026-10-14T07:45:00.000Z',
      },
    ];
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAppointmentsManagerOpen, setIsAppointmentsManagerOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);

  // Sync appointments with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('novasmile_appointments', JSON.stringify(appointments));
    } catch (e) {
      // ignore
    }
  }, [appointments]);

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedDoctorId(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedServiceId(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingFromCases = (category: string) => {
    let serviceId = 'ortodoncia-invisible';
    if (category === 'implantes') serviceId = 'implantes-carga-inmediata';
    if (category === 'estetica') serviceId = 'carillas-estetica';
    if (category === 'periodoncia') serviceId = 'blanqueamiento-led';

    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleScrollToCases = () => {
    const el = document.getElementById('casos-clinicos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Strict Top Bar Contract Header */}
      <Navbar
        onOpenBooking={() => {
          setPreselectedServiceId(undefined);
          setPreselectedDoctorId(undefined);
          setIsBookingModalOpen(true);
        }}
        onOpenAppointmentsManager={() => setIsAppointmentsManagerOpen(true)}
        savedAppointmentsCount={appointments.length}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => {
            setPreselectedServiceId(undefined);
            setPreselectedDoctorId(undefined);
            setIsBookingModalOpen(true);
          }}
          onExploreCases={handleScrollToCases}
        />

        {/* Clinical Services Bento / List */}
        <ServicesSection onSelectServiceToBook={handleOpenBookingWithService} />

        {/* Interactive Clinical Cases Gallery with Before & After Slider */}
        <ClinicalCasesGallery onBookSimilarCase={handleOpenBookingFromCases} />

        {/* Specialists & Medical Team */}
        <DoctorsSection onSelectDoctorToBook={handleOpenBookingWithDoctor} />

        {/* Inline Appointment Booking Section */}
        <section id="reservar-cita" className="border-b border-slate-200 bg-white">
          <BookingSection
            initialServiceId={preselectedServiceId}
            initialDoctorId={preselectedDoctorId}
            onAppointmentCreated={handleAppointmentCreated}
          />
        </section>

        {/* Testimonials from Real Patients with Review Submission Form */}
        <TestimonialsSection />

        {/* Dental Educational Blog with Reader Modal */}
        <BlogSection
          onOpenBooking={() => {
            setPreselectedServiceId(undefined);
            setPreselectedDoctorId(undefined);
            setIsBookingModalOpen(true);
          }}
        />
      </main>

      {/* Quiet Corporate Medical Footer */}
      <Footer
        onOpenBooking={() => setIsBookingModalOpen(true)}
        onOpenAppointmentsManager={() => setIsAppointmentsManagerOpen(true)}
      />

      {/* Integrated WhatsApp Floating Chat Widget */}
      <WhatsAppChatWidget
        onOpenBooking={() => {
          setPreselectedServiceId(undefined);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Booking Quick Modal (Triggered from anywhere) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-3xl">
            <BookingSection
              isModal={true}
              initialServiceId={preselectedServiceId}
              initialDoctorId={preselectedDoctorId}
              onAppointmentCreated={handleAppointmentCreated}
              onCloseModal={() => setIsBookingModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Appointments Manager Modal ("Mis Citas") */}
      <AppointmentsModal
        isOpen={isAppointmentsManagerOpen}
        onClose={() => setIsAppointmentsManagerOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onNewBookingClick={() => {
          setIsBookingModalOpen(true);
        }}
      />
    </div>
  );
}
