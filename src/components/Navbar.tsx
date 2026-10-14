import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Menu, X } from 'lucide-react';
import { CLINIC, getClinicStatus, whatsappUrl } from '../data/clinicData';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

const LINKS = [
  { href: '#top', label: 'Inicio' },
  { href: '#tratamientos', label: 'Tratamientos' },
  { href: '#profesional', label: 'Profesional' },
  { href: '#turnos', label: 'Turnos' },
  { href: '#ubicacion', label: 'Ubicación & Horarios' },
];

const TURNO_MSG = `Hola! Quisiera hacer una consulta en ${CLINIC.name}.`;

const horaLocal = () =>
  new Date().toLocaleTimeString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(() => getClinicStatus());
  const [hora, setHora] = useState(() => horaLocal());

  useEffect(() => {
    const id = setInterval(() => {
      setStatus(getClinicStatus());
      setHora(horaLocal());
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Barra superior con el estado del consultorio en tiempo real */}
      <div className="bg-[#050b29] text-zinc-300 text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                {CLINIC.street}, {CLINIC.locality}
              </span>
            </span>
            <span className="hidden md:inline text-zinc-600">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Hora local: {hora} hs</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={status.isOpen ? 'text-emerald-300' : 'text-amber-300'}>{status.badge}</span>
              {status.detail && <span className="text-zinc-400 hidden lg:inline">({status.detail})</span>}
            </span>
            <span className="text-zinc-600">·</span>
            <a
              href={CLINIC.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#e1306c]" />
              <span>{CLINIC.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Encabezado principal en degradado azul */}
      <header
        id="top"
        style={{
          background: 'linear-gradient(100deg, #0a1668 0%, #123a9e 100%)',
          boxShadow: '0 2px 18px rgba(4,10,46,0.25)',
        }}
        className="sticky top-0 z-50 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3 text-white transition-opacity hover:opacity-95 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-sm shadow-inner">
              DF
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-none">
                {CLINIC.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sky-300 font-medium leading-tight mt-1">
                {CLINIC.locality} · Buenos Aires
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[14px] transition-colors whitespace-nowrap ${
                  i === 0 ? 'font-bold text-white' : 'font-medium text-white/85 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}

            <span className="flex items-center gap-2.5 pl-3 border-l border-white/20">
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CLINIC.instagramHandle}`}
                title={`Instagram ${CLINIC.instagramHandle}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:scale-110 transition-transform"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={whatsappUrl(TURNO_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md bg-[#25D366] hover:bg-[#20ba5a] hover:scale-110 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden p-1.5 text-white hover:text-sky-300"
              aria-label="Abrir menú"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-[#07115c] border-t border-white/10 px-6 py-5 space-y-3">
            <div className="flex flex-col space-y-3 text-sm">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-left py-1 ${i === 0 ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={whatsappUrl(TURNO_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-bold"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp {CLINIC.name}</span>
              </a>
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#d62976] to-[#4f5bd5] text-white rounded-full text-xs font-bold"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram {CLINIC.instagramHandle}</span>
              </a>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 text-white rounded-full text-xs font-semibold"
              >
                <MapPin className="w-4 h-4 text-sky-300" />
                <span>Ver en Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
