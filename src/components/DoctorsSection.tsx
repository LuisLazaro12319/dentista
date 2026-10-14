import React from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../types/dental';
import { DENTAL_DOCTORS } from '../data/mockDentalData';

interface DoctorsSectionProps {
  onSelectDoctorToBook: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorToBook }) => {
  return (
    <section id="equipo" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
            <span>Cuadro Médico</span>
            <span aria-hidden="true">·</span>
            <span>Especialistas Colegiados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Profesionales comprometidos con tu tranquilidad y bienestar
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Formación continuada en los principales centros internacionales, rigor científico y una atención personalizada donde cada paciente es escuchado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DENTAL_DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-white/60">
                    {doctor.collegiateNumber}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">
                    {doctor.role}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {doctor.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 mb-4">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Especialidades principales:</p>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-600">
                      {doctor.specialties.map((spec, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>{spec}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    {doctor.education}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectDoctorToBook(doctor.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-700" />
                  <span>Pedir cita con {doctor.name.split(' ')[1] || doctor.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
