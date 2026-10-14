import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAppointmentsManager: () => void;
  savedAppointmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAppointmentsManager,
  savedAppointmentsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-600 transition-colors"
          >
            NovaSmile Dental
          </a>

          {/* Zone 2: 4-5 Nav Links - 1-2 word labels, single-line, subtle hover underlines */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#tratamientos"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Tratamientos
            </a>
            <a
              href="#casos-clinicos"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Casos Clínicos
            </a>
            <a
              href="#equipo"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Especialistas
            </a>
            <a
              href="#testimonios"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Testimonios
            </a>
            <a
              href="#blog"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Blog
            </a>
            {savedAppointmentsCount > 0 && (
              <button
                type="button"
                onClick={onOpenAppointmentsManager}
                className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Mis Citas ({savedAppointmentsCount})</span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {savedAppointmentsCount === 0 && (
              <button
                type="button"
                onClick={onOpenAppointmentsManager}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 px-2.5 py-1.5"
              >
                Consultar Cita
              </button>
            )}
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reservar Cita
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-700 rounded-lg"
            >
              Pedir Cita
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <a
            href="#tratamientos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-sky-700"
          >
            Tratamientos
          </a>
          <a
            href="#casos-clinicos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-sky-700"
          >
            Casos Clínicos
          </a>
          <a
            href="#equipo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-sky-700"
          >
            Especialistas
          </a>
          <a
            href="#testimonios"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-sky-700"
          >
            Testimonios
          </a>
          <a
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-sky-700"
          >
            Blog Dental
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointmentsManager();
              }}
              className="w-full text-center py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              Gestionar Mis Citas {savedAppointmentsCount > 0 ? `(${savedAppointmentsCount})` : ''}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-sky-700 rounded-lg shadow-sm"
            >
              Reservar Cita en Línea
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
