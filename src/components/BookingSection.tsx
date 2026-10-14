import React, { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { CLINIC, SERVICES, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const DIAS = ['Cualquier día', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const FRANJAS = ['Cualquier horario', 'Mañana', 'Tarde'];

export const BookingSection: React.FC = () => {
  const [name, setName] = useState('');
  const [motivo, setMotivo] = useState('Primera consulta / revisión');
  const [dia, setDia] = useState(DIAS[0]);
  const [franja, setFranja] = useState(FRANJAS[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Escribí tu nombre para armar el mensaje.');
      return;
    }
    setError('');
    const lineas = [
      `Hola! Quisiera pedir un turno en ${CLINIC.name}.`,
      `- Nombre: ${name.trim()}`,
      `- Motivo: ${motivo}`,
      `- Día preferido: ${dia}`,
      `- Horario preferido: ${franja}`,
    ];
    if (notes.trim()) lineas.push(`- Comentario: ${notes.trim()}`);
    window.open(whatsappUrl(lineas.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const campo =
    'w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500';

  return (
    <section id="turnos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
            <CalendarCheck className="w-4 h-4" />
            <span>Turnos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Pedí tu turno por WhatsApp
          </h2>
          <p className="text-base text-slate-600">
            Completá estos datos y se arma el mensaje. El consultorio te responde para confirmar día y horario.
          </p>
        </div>

        <form onSubmit={enviar} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-slate-800 mb-1.5">
              Tu nombre *
            </label>
            <input
              id="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: María Gómez"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="motivo" className="block text-sm font-semibold text-slate-800 mb-1.5">
              ¿Qué necesitás?
            </label>
            <select id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} className={campo}>
              <option>Primera consulta / revisión</option>
              {SERVICES.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
              <option>Dolor o urgencia</option>
              <option>Otra consulta</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dia" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Día preferido
              </label>
              <select id="dia" value={dia} onChange={(e) => setDia(e.target.value)} className={campo}>
                {DIAS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="franja" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Horario preferido
              </label>
              <select id="franja" value={franja} onChange={(e) => setFranja(e.target.value)} className={campo}>
                {FRANJAS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notas" className="block text-sm font-semibold text-slate-800 mb-1.5">
              Comentario (opcional)
            </label>
            <textarea
              id="notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Contanos brevemente qué te pasa o qué buscás."
              className={campo}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Enviar pedido por WhatsApp</span>
          </button>

          <p className="text-xs text-slate-500 text-center">
            Se abre WhatsApp con el mensaje listo para enviar a {CLINIC.whatsappDisplay}.
          </p>
        </form>
      </div>
    </section>
  );
};
