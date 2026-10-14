import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { CLINIC, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

export const ProfessionalSection: React.FC = () => {
  return (
    <section id="profesional" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-br from-sky-700 to-sky-900 text-white p-10 flex flex-col items-center text-center shadow-sm">
              <div className="w-24 h-24 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-3xl font-extrabold tracking-wide">
                DF
              </div>
              <h3 className="mt-5 text-2xl font-bold">{CLINIC.professional}</h3>
              <p className="text-sky-100 text-sm mt-1">Odontóloga · {CLINIC.name}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">Profesional</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Atención personalizada en {CLINIC.locality}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              En {CLINIC.name} te atiende {CLINIC.professional}. Escribile por WhatsApp para contarle qué necesitás y
              coordinar tu turno.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-700 mb-8">
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-700 transition-colors"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>
                  {CLINIC.googleRating} en Google ({CLINIC.googleReviews} opiniones)
                </span>
              </a>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-700" />
                <span>
                  {CLINIC.street}, {CLINIC.locality}
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl(`Hola ${CLINIC.professional}! Quisiera pedir un turno.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
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
