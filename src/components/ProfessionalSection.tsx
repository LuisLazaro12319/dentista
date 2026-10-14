import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { CLINIC, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const FOTO = `${import.meta.env.BASE_URL}images/dra-debora.jpg`;

export const ProfessionalSection: React.FC = () => {
  return (
    <section id="profesional" className="relative py-20 lg:py-24 bg-white border-b border-sky-100 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-100/70 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-violet-100/60 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-400 via-cyan-300 to-sky-600 opacity-80 blur-sm" />
              <div className="relative rounded-[1.75rem] overflow-hidden bg-sky-100 shadow-2xl shadow-sky-900/20 aspect-square">
                <img
                  src={FOTO}
                  alt={`${CLINIC.professional}, odontóloga de ${CLINIC.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative -mt-8 mx-6 rounded-2xl bg-white shadow-xl shadow-sky-900/10 border border-sky-100 px-5 py-4 text-center">
                <h3 className="text-xl font-extrabold text-slate-900">{CLINIC.professional}</h3>
                <p className="text-sm text-sky-700 font-semibold mt-0.5">Odontóloga · {CLINIC.name}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-4">
              Profesional
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Atención personalizada en{' '}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                {CLINIC.locality}
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-7">
              En {CLINIC.name} te atiende {CLINIC.professional}. Escribile por WhatsApp para contarle qué necesitás y
              coordinar tu turno.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold mb-8">
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>
                  {CLINIC.googleRating} en Google ({CLINIC.googleReviews} opiniones)
                </span>
              </a>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>
                  {CLINIC.street}, {CLINIC.locality}
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl(`Hola ${CLINIC.professional}! Quisiera pedir un turno.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#16c55e] hover:bg-[#12a84f] rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Escribirle por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
