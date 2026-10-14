import React from 'react';
import { Activity, Layers, ShieldCheck, Smile, Sparkles, Stethoscope, ChevronRight } from 'lucide-react';
import { CLINIC, SERVICES, whatsappUrl, type DentalService } from '../data/clinicData';

const ICONS: Record<DentalService['icon'], React.ReactNode> = {
  stethoscope: <Stethoscope className="w-5 h-5 text-sky-700" />,
  sparkles: <Sparkles className="w-5 h-5 text-sky-700" />,
  layers: <Layers className="w-5 h-5 text-sky-700" />,
  shield: <ShieldCheck className="w-5 h-5 text-sky-700" />,
  activity: <Activity className="w-5 h-5 text-sky-700" />,
  smile: <Smile className="w-5 h-5 text-sky-700" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="tratamientos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">Tratamientos</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Lo que podemos hacer por tu salud bucal
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consultanos por WhatsApp cuál es el tratamiento que necesitás y coordinamos tu turno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-shadow shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <span className="font-mono text-xs font-semibold text-sky-800">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <div className="p-2 rounded-lg bg-sky-50">{ICONS[service.icon]}</div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100">
                <a
                  href={whatsappUrl(`Hola! Quisiera consultar por ${service.name} en ${CLINIC.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors"
                >
                  <span>Consultar</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
