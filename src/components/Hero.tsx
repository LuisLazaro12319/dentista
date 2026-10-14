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
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-700 to-cyan-600 text-white min-h-[680px] sm:min-h-[760px] lg:min-h-[88vh] flex items-center">
      {/* Video de fondo (si no carga, queda el degradado celeste) */}
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

      {/* Capas suaves: solo oscurecen donde está el texto, el resto del video se ve completo */}
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/80 via-sky-950/35 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sky-950/55 to-transparent pointer-events-none" />

      <div className="absolute top-5 right-5 z-20">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md border border-white/30 transition-colors cursor-pointer"
          aria-label={playing ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{playing ? 'Pausar video' : 'Reproducir video'}</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-3xl [text-shadow:0_2px_14px_rgba(3,25,50,0.55)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white mb-5 [text-shadow:none]">
            <span>Odontología integral</span>
            <span aria-hidden="true">·</span>
            <span>{CLINIC.locality}</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.9rem] leading-[1.1] font-extrabold tracking-tight text-white mb-6"
            style={{ textWrap: 'balance' }}
          >
            Cuidamos tu sonrisa con{' '}
            <span className="bg-gradient-to-r from-cyan-200 to-sky-100 bg-clip-text text-transparent [text-shadow:none]">
              atención cercana
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white leading-relaxed mb-9 max-w-2xl font-medium">
            Ortodoncia y ortopedia, prótesis, extracciones, tratamientos de conducto y estética dental en{' '}
            <strong className="font-extrabold">
              {CLINIC.street}, {CLINIC.locality}
            </strong>
            . Pedí tu turno por WhatsApp.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 [text-shadow:none]">
            <a
              href={whatsappUrl(`Hola! Quisiera pedir un turno en ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:px-7 sm:py-4 sm:text-base sm:gap-2.5 font-bold text-white bg-[#16c55e] hover:bg-[#12a84f] rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Pedir turno</span>
              <span className="hidden sm:inline">por WhatsApp</span>
            </a>
            <a
              href="#tratamientos"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm sm:px-6 sm:py-4 sm:text-base sm:gap-2 font-semibold text-sky-900 bg-white hover:bg-sky-50 rounded-xl shadow-lg shadow-sky-950/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Ver tratamientos</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold [text-shadow:none]">
            <a
              href={CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-sm transition-colors"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>
                {CLINIC.googleRating} en Google · {CLINIC.googleReviews} opiniones
              </span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 text-slate-900 shadow-sm">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Lunes a viernes de 9 a 19 hs</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 text-slate-900 shadow-sm">
              <MapPin className="w-4 h-4 text-sky-600" />
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
