import React, { useState } from 'react';
import { Sparkles, Calendar, ChevronRight, Info, Check, SlidersHorizontal } from 'lucide-react';
import { ClinicalCase } from '../types/dental';
import { CLINICAL_CASES } from '../data/mockDentalData';

interface ClinicalCasesGalleryProps {
  onBookSimilarCase: (category: string) => void;
}

export const ClinicalCasesGallery: React.FC<ClinicalCasesGalleryProps> = ({ onBookSimilarCase }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CLINICAL_CASES[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side' | 'after-only'>('slider');

  const filteredCases = activeCategory === 'todos'
    ? CLINICAL_CASES
    : CLINICAL_CASES.filter((c) => c.category === activeCategory);

  const currentCase = CLINICAL_CASES.find((c) => c.id === selectedCaseId) || CLINICAL_CASES[0];

  return (
    <section id="casos-clinicos" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
            <span>Resultados Demostrables</span>
            <span aria-hidden="true">·</span>
            <span>Casos Clínicos Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Galería de transformaciones y sonrisas rehabilitadas
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Cada tratamiento es único. Explora el antes y el después con nuestro visor interactivo y conoce el procedimiento médico aplicado en cada caso.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg mt-8 w-fit">
            <button
              type="button"
              onClick={() => setActiveCategory('todos')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos los casos
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('ortodoncia')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'ortodoncia'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ortodoncia Invisible
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('estetica')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'estetica'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Carillas y Estética
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('implantes')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'implantes'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Implantes Dentales
            </button>
          </div>
        </div>

        {/* Marquee Case Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {filteredCases.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCaseId(c.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selectedCaseId === c.id
                  ? 'bg-sky-50/50 border-sky-600 ring-1 ring-sky-600/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">
                <span>{c.treatmentDuration}</span>
                <span className="font-mono text-slate-400">Paciente {c.patientInitials}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
                {c.title}
              </p>
            </button>
          ))}
        </div>

        {/* Featured Case Stage */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visualizer Column */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Visualizer Mode Controls */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-sky-700" />
                  <span>Comparador Clínico</span>
                </span>
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('slider')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'slider' ? 'bg-sky-700 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Deslizador
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('side-by-side')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      viewMode === 'side-by-side' ? 'bg-sky-700 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lado a lado
                  </button>
                </div>
              </div>

              {/* Visualizer Container */}
              {viewMode === 'slider' ? (
                <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-[4/3] select-none border border-slate-300 shadow-sm">
                  {/* "After" Image (Background) */}
                  <img
                    src={currentCase.afterImageUrl}
                    alt={`Resultado final caso ${currentCase.title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    DESPUÉS
                  </div>

                  {/* "Before" Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentCase.beforeImageUrl}
                      alt={`Estado inicial caso ${currentCase.title}`}
                      className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
                      style={{
                        width: '100%',
                        maxWidth: 'none',
                        objectFit: 'cover',
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                      ANTES
                    </div>
                  </div>

                  {/* Divider Line & Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-sky-800 shadow-md flex items-center justify-center font-bold text-xs pointer-events-none">
                      ⇄
                    </div>
                  </div>

                  {/* Interactive Range Input overlay */}
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    aria-label="Ajustar visor de antes y después"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              ) : (
                /* Side by side mode */
                <div className="grid grid-cols-2 gap-3 aspect-[4/3]">
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                    <img
                      src={currentCase.beforeImageUrl}
                      alt="Antes"
                      className="w-full h-full object-cover filter contrast-90 brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      ANTES
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                    <img
                      src={currentCase.afterImageUrl}
                      alt="Después"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-sky-800/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      DESPUÉS
                    </div>
                  </div>
                </div>
              )}

              {/* Slider instruction helper */}
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2 px-1">
                <span>← Arrastra el cursor o desliza horizontalmente</span>
                <span className="font-mono text-slate-400">Posición: {sliderPosition}%</span>
              </div>
            </div>

            {/* Case Documentation & Medical Record Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-sky-800">{currentCase.doctorName}</span>
                  <span aria-hidden="true">·</span>
                  <span>Duración: {currentCase.treatmentDuration}</span>
                  <span aria-hidden="true">·</span>
                  <span>Paciente: {currentCase.patientInitials} ({currentCase.patientAge} años)</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
                  {currentCase.title}
                </h3>

                {/* Clinical description */}
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                      Situación inicial del paciente
                    </p>
                    <p className="leading-relaxed text-slate-700">
                      {currentCase.problemDescription}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                      Procedimiento y resultado clínico
                    </p>
                    <p className="leading-relaxed text-slate-700">
                      {currentCase.solutionDescription}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5">
                  <p className="text-xs font-semibold text-slate-900">Aspectos clave del caso:</p>
                  {currentCase.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onBookSimilarCase(currentCase.category)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consultar Mi Caso Gratis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
