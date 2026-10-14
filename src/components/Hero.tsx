import React from 'react';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import { CLINIC, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white border-b border-slate-800">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-sky-500/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 w-[360px] h-[360px] rounded-full bg-sky-400/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300 mb-4">
            <span>Odontología integral</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{CLINIC.locality}</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.12] font-extrabold tracking-tight text-white mb-6"
            style={{ textWrap: 'balance' }}
          >
            Cuidamos tu sonrisa con atención cercana
          </h1>

          <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl">
            Ortodoncia y ortopedia, prótesis, extracciones, tratamientos de conducto y estética dental en{' '}
            <strong className="text-white">{CLINIC.street}, {CLINIC.locality}</strong>. Pedí tu turno por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <a
              href={whatsappUrl(`Hola! Quisiera pedir un turno en ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Pedir turno por WhatsApp</span>
            </a>
            <a
              href="#tratamientos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors whitespace-nowrap"
            >
              <span>Ver tratamientos</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-300 pt-5 border-t border-white/15">
            <a
              href={CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>
                {CLINIC.googleRating} en Google · {CLINIC.googleReviews} opiniones
              </span>
            </a>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Lunes a viernes de 9 a 19 hs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>
                {CLINIC.street}, {CLINIC.locality}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
