import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CLINIC, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const LINKS = [
  { href: '#tratamientos', label: 'Tratamientos' },
  { href: '#profesional', label: 'Profesional' },
  { href: '#turnos', label: 'Turnos' },
  { href: '#ubicacion', label: 'Ubicación' },
];

const TURNO_MSG = `Hola! Quisiera pedir un turno en ${CLINIC.name}.`;

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16 sm:h-20">
          <a
            href="#"
            className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap"
          >
            {CLINIC.name}
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-slate-900 transition-colors whitespace-nowrap">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl(TURNO_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#16c55e] hover:bg-[#12a84f] rounded-xl shadow-md shadow-emerald-500/25 transition-all whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Pedir turno</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900"
              aria-label="Abrir menú"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-slate-700 hover:text-sky-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappUrl(TURNO_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-[#16c55e] rounded-xl"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Pedir turno por WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};
