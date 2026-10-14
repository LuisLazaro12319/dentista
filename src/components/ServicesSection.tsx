import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Smile, Activity, Zap, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { DentalService } from '../types/dental';
import { DENTAL_SERVICES } from '../data/mockDentalData';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredServices = selectedCategory === 'todos'
    ? DENTAL_SERVICES
    : DENTAL_SERVICES.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-700" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-sky-700" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-sky-700" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-sky-700" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-sky-700" />;
    }
  };

  return (
    <section id="tratamientos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
            <span>Especialidades Odontológicas</span>
            <span aria-hidden="true">·</span>
            <span>Tratamientos Avanzados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Soluciones clínicas de precisión adaptadas a tu sonrisa
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Combinamos tecnología diagnóstica 3D, materiales biocompatibles de máxima durabilidad y un protocolo de atención libre de dolor.
          </p>

          {/* Interactive filter tabs (segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg mt-8 w-fit shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('todos')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'todos'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos los tratamientos
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ortodoncia')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'ortodoncia'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ortodoncia
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('implantes')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'implantes'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Implantes
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('estetica')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'estetica'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estética Dental
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('general')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'general'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Endodoncia y Prevención
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-shadow shadow-xs hover:shadow-sm"
              >
                <div>
                  {/* Top metadata & numbering */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span className="font-mono font-semibold text-sky-800">{indexStr}.</span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span>{service.durationMinutes} min aprox</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-900">
                        {service.priceFrom === 0 ? 'Consulta gratuita' : `Desde ${service.priceFrom}€`}
                      </span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-sky-50 shrink-0">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Key Clinical Benefits */}
                  <div className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 truncate max-w-[170px]" title={service.technology}>
                    {service.technology}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Pedir cita</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
