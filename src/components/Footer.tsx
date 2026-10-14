import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { CLINIC, SCHEDULE } from '../data/clinicData';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-400 via-cyan-300 to-sky-500 text-sky-950 text-sm border-t-4 border-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="text-lg font-bold text-sky-950">{CLINIC.name}</div>
            <p className="text-sky-900 leading-relaxed">
              Odontología integral: ortodoncia y ortopedia, prótesis, extracciones, tratamientos de conducto y
              estética dental.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CLINIC.instagramHandle}`}
                className="w-9 h-9 rounded-full bg-white/40 hover:bg-white/60 text-sky-950 flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`https://wa.me/${CLINIC.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-950">Horarios</div>
            <ul className="space-y-1.5 text-sky-900">
              {SCHEDULE.map((d) => (
                <li key={d.dayName} className="flex justify-between gap-6 max-w-xs">
                  <span>{d.dayName}</span>
                  <span className="font-mono text-xs">{d.open && d.close ? `${d.open} - ${d.close}` : 'Cerrado'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-950">Contacto</div>
            <ul className="space-y-2.5 text-sky-900">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-800 shrink-0" />
                <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-950">
                  {CLINIC.fullAddress}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-800 shrink-0" />
                <a href={`tel:${CLINIC.phone.replace(/\D/g, '')}`} className="hover:text-sky-950">
                  {CLINIC.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-sky-800 shrink-0" />
                <a href={`https://wa.me/${CLINIC.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-sky-950">
                  {CLINIC.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-sky-800 shrink-0" />
                <a href={CLINIC.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-950">
                  {CLINIC.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sky-950/15 text-xs text-sky-900">
          © {new Date().getFullYear()} {CLINIC.name} · {CLINIC.locality}, {CLINIC.province}
        </div>
      </div>
    </footer>
  );
};
