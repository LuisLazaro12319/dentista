import React, { useRef, useState } from 'react';
import { ArrowRight, Clock, MapPin, Pause, Play, Star } from 'lucide-react';
import { CLINIC, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const HERO_VIDEO = `${import.meta.env.BASE_URL}videos/hero-df-odontologia.mp4`;

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => undefined);
      setPlaying(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white border-b border-slate-800">
      {/* Video de fondo (si no carga, queda el degradado) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Capas oscuras para que el texto se lea siempre */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none" />

      <div className="absolute top-5 right-5 z-20">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-slate-200 text-xs font-medium backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          aria-label={playing ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
        >
          {playing ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
          <span>{playing ? 'Pausar video' : 'Reproducir video'}</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
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
