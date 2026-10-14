import React, { useEffect, useRef } from 'react';
import {
  Activity,
  Anchor,
  ArrowUpRight,
  Crown,
  Gem,
  Layers,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { CLINIC, SERVICES, whatsappUrl, type DentalService } from '../data/clinicData';

// Clases escritas completas para que Tailwind las detecte.
const ESTILOS: Record<DentalService['icon'], { icon: React.ReactNode; badge: string; barra: string; link: string }> = {
  stethoscope: {
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    badge: 'from-sky-500 to-blue-600',
    barra: 'from-sky-500 to-blue-600',
    link: 'text-sky-700 hover:text-sky-900',
  },
  sparkles: {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    badge: 'from-violet-500 to-fuchsia-500',
    barra: 'from-violet-500 to-fuchsia-500',
    link: 'text-violet-700 hover:text-violet-900',
  },
  layers: {
    icon: <Layers className="w-6 h-6 text-white" />,
    badge: 'from-amber-400 to-orange-500',
    barra: 'from-amber-400 to-orange-500',
    link: 'text-orange-600 hover:text-orange-800',
  },
  shield: {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    badge: 'from-rose-500 to-cyan-500',
    barra: 'from-rose-500 to-cyan-500',
    link: 'text-rose-600 hover:text-rose-800',
  },
  activity: {
    icon: <Activity className="w-6 h-6 text-white" />,
    badge: 'from-emerald-500 to-teal-500',
    barra: 'from-emerald-500 to-teal-500',
    link: 'text-emerald-700 hover:text-emerald-900',
  },
  smile: {
    icon: <Smile className="w-6 h-6 text-white" />,
    badge: 'from-cyan-400 to-sky-500',
    barra: 'from-cyan-400 to-sky-500',
    link: 'text-cyan-700 hover:text-sky-900',
  },
  crown: {
    icon: <Crown className="w-6 h-6 text-white" />,
    badge: 'from-yellow-400 to-amber-500',
    barra: 'from-yellow-400 to-amber-500',
    link: 'text-amber-700 hover:text-amber-900',
  },
  anchor: {
    icon: <Anchor className="w-6 h-6 text-white" />,
    badge: 'from-slate-500 to-slate-700',
    barra: 'from-slate-500 to-slate-700',
    link: 'text-slate-700 hover:text-slate-900',
  },
  gem: {
    icon: <Gem className="w-6 h-6 text-white" />,
    badge: 'from-sky-400 to-blue-500',
    barra: 'from-sky-400 to-blue-500',
    link: 'text-sky-700 hover:text-sky-900',
  },
};

/** Velocidad de la cinta en celular (píxeles por segundo). */
const VELOCIDAD_CINTA = 38;

/**
 * Cinta de tratamientos para celular: una sola fila que avanza sola y se puede arrastrar con el dedo.
 * Se pausa al tocarla y retoma sola. La lista va duplicada para que el recorrido no tenga corte.
 */
const CintaServicios: React.FC = () => {
  const pista = useRef<HTMLDivElement>(null);
  const pausada = useRef(false);
  const temporizador = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cuadro = 0;
    let ultimo = performance.now();
    let pos = el.scrollLeft;

    const avanzar = (ahora: number) => {
      const dt = Math.min(ahora - ultimo, 100);
      ultimo = ahora;
      // Si la persona la movió con el dedo, seguimos desde donde la dejó.
      if (Math.abs(el.scrollLeft - pos) > 1.5) pos = el.scrollLeft;
      if (!pausada.current && el.scrollWidth > el.clientWidth) {
        pos += (VELOCIDAD_CINTA * dt) / 1000;
        const mitad = el.scrollWidth / 2;
        if (pos >= mitad) pos -= mitad;
        el.scrollLeft = pos;
      }
      cuadro = requestAnimationFrame(avanzar);
    };
    cuadro = requestAnimationFrame(avanzar);
    return () => {
      cancelAnimationFrame(cuadro);
      window.clearTimeout(temporizador.current);
    };
  }, []);

  const pausar = () => {
    window.clearTimeout(temporizador.current);
    pausada.current = true;
  };
  const retomar = (espera = 1500) => {
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => {
      pausada.current = false;
    }, espera);
  };

  return (
    <div
      ref={pista}
      onTouchStart={pausar}
      onTouchEnd={() => retomar()}
      onTouchCancel={() => retomar()}
      onMouseEnter={pausar}
      onMouseLeave={() => retomar(300)}
      className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-2"
      aria-label="Tratamientos"
    >
      {[...SERVICES, ...SERVICES].map((service, i) => {
        const e = ESTILOS[service.icon];
        const copia = i >= SERVICES.length;
        return (
          <div
            key={`${service.id}-${i}`}
            aria-hidden={copia || undefined}
            className="relative shrink-0 w-[46vw] min-w-[158px] max-w-[210px] bg-white rounded-2xl border border-slate-100 p-3.5 flex flex-col justify-between shadow-md shadow-sky-900/5 overflow-hidden"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${e.barra}`} />
            <div>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${e.badge} flex items-center justify-center shadow mb-2.5 [&>svg]:w-5 [&>svg]:h-5`}
              >
                {e.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2">{service.name}</h3>
              <p className="text-xs text-slate-600 leading-snug line-clamp-3">{service.description}</p>
            </div>
            <a
              href={whatsappUrl(`Hola! Quisiera consultar por ${service.name} en ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={copia ? -1 : undefined}
              className={`mt-3 pt-2.5 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-bold ${e.link}`}
            >
              <span>Consultar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="tratamientos"
      className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-sky-50 via-white to-cyan-50 border-b border-cyan-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título con el mismo estilo que "Nosotros": grande, centrado y con degradado */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Tratamientos
            </span>
          </h2>
          <div className="mx-auto mt-4 mb-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Lo que podemos hacer por tu{' '}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              salud bucal
            </span>
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Consultanos por WhatsApp cuál es el tratamiento que necesitás y coordinamos tu turno.
          </p>
        </div>

        {/* Celular: cinta que avanza sola y se arrastra con el dedo */}
        <div className="md:hidden -mx-4">
          <CintaServicios />
        </div>

        {/* Pantallas grandes: grilla de tarjetas */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const e = ESTILOS[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col justify-between shadow-md shadow-sky-900/5 hover:shadow-xl hover:shadow-sky-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${e.barra}`} />
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.badge} flex items-center justify-center shadow-lg mb-5`}
                  >
                    {e.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">{service.name}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={whatsappUrl(`Hola! Quisiera consultar por ${service.name} en ${CLINIC.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${e.link}`}
                  >
                    <span>Consultar por WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
