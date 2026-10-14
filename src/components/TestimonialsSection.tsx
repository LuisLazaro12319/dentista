import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Filter } from 'lucide-react';
import { Testimonial } from '../types/dental';
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/mockDentalData';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('novasmile_testimonials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_TESTIMONIALS;
  });

  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New review form fields
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newTreatment, setNewTreatment] = useState('Ortodoncia Invisible');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      setFormError('Por favor completa tu nombre y comentario.');
      return;
    }

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      patientName: newName.trim(),
      patientAge: 35,
      patientCity: newCity.trim() || 'Madrid',
      treatment: newTreatment,
      rating: newRating,
      comment: newComment.trim(),
      outcome: 'Experiencia satisfactoria verificada',
      date: 'Hoy',
      verified: true,
      avatarInitials: initials || 'PX',
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem('novasmile_testimonials', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowAddModal(false);
      setNewName('');
      setNewCity('');
      setNewComment('');
      setFormError('');
    }, 1500);
  };

  const filteredReviews = activeFilter === 'todos'
    ? testimonials
    : testimonials.filter((t) => t.treatment.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="testimonios" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
              <span>Opiniones Verificadas</span>
              <span aria-hidden="true">·</span>
              <span>Testimonios Reales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              La confianza de miles de pacientes que vuelven a sonreír
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Valoraciones directas tras completar su tratamiento en nuestra clínica de Madrid. Transparencia médica y resultados tangibles.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-sky-700" />
              <span>Dejar Mi Testimonio</span>
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg mb-8 w-fit shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveFilter('todos')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeFilter === 'todos' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas las opiniones ({testimonials.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('ortodoncia')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeFilter === 'ortodoncia' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ortodoncia
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('implante')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeFilter === 'implante' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Implantes
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('carillas')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeFilter === 'carillas' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Carillas y Estética
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                {/* Top: Stars + Verified indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Paciente Verificado</span>
                  </div>
                </div>

                {/* Outcome Highlight */}
                <p className="text-xs font-semibold text-sky-800 mb-2">
                  «{item.outcome}»
                </p>

                {/* Patient Quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Patient Attribution Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.patientName}</p>
                    <p className="text-slate-500 text-[11px]">{item.treatment} · {item.patientCity}</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Comparte tu experiencia en NovaSmile
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center text-emerald-800">
                <CheckCircle className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
                <p className="text-base font-bold">¡Muchas gracias por tu valoración!</p>
                <p className="text-xs text-slate-500 mt-1">Tu testimonio ha sido publicado con éxito.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                {formError && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tu Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej. Laura Gómez"
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ciudad / Localidad
                    </label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="Madrid, Pozuelo..."
                      className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tratamiento Realizado
                    </label>
                    <select
                      value={newTreatment}
                      onChange={(e) => setNewTreatment(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-sky-600"
                    >
                      <option value="Ortodoncia Invisible">Ortodoncia Invisible</option>
                      <option value="Implante Dental">Implante Dental</option>
                      <option value="Carillas de Porcelana">Carillas de Porcelana</option>
                      <option value="Blanqueamiento & Limpieza">Blanqueamiento & Limpieza</option>
                      <option value="Endodoncia">Endodoncia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Valoración
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-600 font-mono ml-2">
                      {newRating} de 5 estrellas
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tu Testimonio *
                  </label>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Cuéntanos cómo fue el trato médico, la puntualidad y el resultado de tu tratamiento..."
                    className="w-full p-2.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs cursor-pointer"
                  >
                    Publicar Testimonio
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
