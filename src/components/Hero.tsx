import React, { useRef, useState } from 'react';
import { ArrowRight, Calendar, ShieldCheck, Clock, Award, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import heroPosterImg from '../assets/images/video_dentist_welcome_1791993206459.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCases: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCases }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* Background Full-Bleed Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPosterImg}
          className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.05]"
        >
          <source src="/videos/hero_dental_clinic.mp4" type="video/mp4" />
          <img
            src={heroPosterImg}
            alt="Clínica dental de vanguardia"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </video>
      </div>

      {/* Measured Contrast Scrims for 100% WCAG AA Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

      {/* Video Playback Toggle (Accessible bottom-right control) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-slate-200 text-xs font-medium backdrop-blur-md border border-white/10 transition-colors shadow-sm cursor-pointer"
          aria-label={isPlaying ? 'Pausar vídeo de fondo' : 'Reproducir vídeo de fondo'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-sky-400" />
              <span>Vídeo en directo</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-sky-400" />
              <span>Reanudar vídeo</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-20 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Clean Unboxed Text Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300 mb-4">
            <span>Clínica Odontológica Especializada</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Madrid Castellana</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.12] font-extrabold tracking-tight text-white mb-6"
            style={{ textWrap: 'balance' }}
          >
            Cuidamos tu salud bucodental con tecnología 3D y calidez humana
          </h1>

          <p className="text-lg text-slate-200 leading-relaxed mb-6 max-w-2xl font-normal">
            Especialistas en ortodoncia invisible, implantes de carga inmediata y diseño digital de sonrisas. Diagnóstico de alta resolución sin esperas y tratamientos indoloros en un entorno sereno.
          </p>

          {/* Doctor Greeting Transcript from Video */}
          <div className="mb-8 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl">
            <p className="text-sm text-slate-100 italic leading-relaxed">
              «Hola, qué gusto verte de nuevo. Hoy diseñaremos tu mejor sonrisa. Queremos verte sonreír siempre.»
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-300 font-medium mt-1.5">
              <span>Dra. Elena Montes</span>
              <span aria-hidden="true">·</span>
              <span>Directora Médica NovaSmile</span>
            </div>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Reservar Cita en Línea</span>
            </button>
            <button
              type="button"
              onClick={onExploreCases}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white hover:text-sky-200 bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-lg border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Ver Casos de Éxito</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-4 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>1ª Visita y Escáner 3D sin coste</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Citas puntuales sin esperas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              <span>Colegio Oficial de Odontólogos</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Item Proof / KPI Strip Below Hero with Glass Finish */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                15.000+
              </div>
              <div className="text-sm font-medium text-slate-200 mt-1">
                Pacientes satisfechos
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                En la Comunidad de Madrid
              </div>
            </div>

            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                99.4%
              </div>
              <div className="text-sm font-medium text-slate-200 mt-1">
                Éxito en tratamientos
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                En ortodoncia e implantes
              </div>
            </div>

            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                18 Años
              </div>
              <div className="text-sm font-medium text-slate-200 mt-1">
                De excelencia clínica
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Equipo médico consolidado
              </div>
            </div>

            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                0% TIN
              </div>
              <div className="text-sm font-medium text-slate-200 mt-1">
                Financiación a medida
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Hasta 24 meses sin intereses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
