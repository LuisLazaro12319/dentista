import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Trash2, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Appointment } from '../types/dental';
import { CLINIC_INFO } from '../data/mockDentalData';

interface AppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNewBookingClick: () => void;
}

export const AppointmentsModal: React.FC<AppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onNewBookingClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = appointments.filter((apt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      apt.bookingCode.toLowerCase().includes(q) ||
      apt.patientName.toLowerCase().includes(q) ||
      apt.patientPhone.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-1">
              <span>Gestión de Citas</span>
              <span aria-hidden="true">·</span>
              <span>Área del Paciente</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Mis Citas Reservadas
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código (ej. NVS-8491) o nombre del paciente..."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
          />
        </div>

        {/* Appointments List */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No hay citas registradas</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              {searchQuery
                ? 'Ninguna cita coincide con tu búsqueda.'
                : 'Aún no has reservado ninguna cita o han sido canceladas.'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewBookingClick();
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer"
            >
              Reservar Cita Ahora
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      {apt.bookingCode}
                    </span>
                    <span className="text-xs font-medium text-slate-600 ml-2">
                      {apt.serviceName}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Confirmada
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                  <div>
                    <span className="text-slate-400 block">Fecha y Hora:</span>
                    <strong className="text-slate-900 font-mono">{apt.date} a las {apt.timeSlot}h</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Doctor:</span>
                    <span className="text-slate-900">{apt.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Paciente:</span>
                    <span className="text-slate-900">{apt.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Teléfono:</span>
                    <span className="font-mono text-slate-900">{apt.patientPhone}</span>
                  </div>
                </div>

                {cancelConfirmId === apt.id ? (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs flex items-center justify-between">
                    <span className="text-rose-900 font-medium">¿Seguro que deseas anular esta cita?</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onCancelAppointment(apt.id);
                          setCancelConfirmId(null);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors"
                      >
                        Sí, anular
                      </button>
                      <button
                        type="button"
                        onClick={() => setCancelConfirmId(null)}
                        className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900"
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=Hola,%20quisiera%20consultar%20sobre%20mi%20cita%20con%20código%20${apt.bookingCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Consultar por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setCancelConfirmId(apt.id)}
                      className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Anular cita</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>NovaSmile Clínica Dental · Tel: {CLINIC_INFO.phone}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
