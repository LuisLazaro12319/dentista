import React from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockDentalData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAppointmentsManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAppointmentsManager }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div>
            <a href="#" className="text-xl font-bold text-white tracking-tight block mb-3">
              NovaSmile Dental
            </a>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Centro odontológico integral de vanguardia en Madrid. Especialistas en ortodoncia invisible, implantología avanzada y rehabilitación estética biomimética.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>Registro Sanitario CAM: CS-11849/24</p>
              <p>Colegio Oficial de Odontólogos y Estomatólogos</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Navegación
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tratamientos" className="hover:text-white transition-colors">
                  Tratamientos Odontológicos
                </a>
              </li>
              <li>
                <a href="#casos-clinicos" className="hover:text-white transition-colors">
                  Galería de Casos Clínicos
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-white transition-colors">
                  Cuadro Médico Especialista
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white transition-colors">
                  Testimonios de Pacientes
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog de Salud Bucodental
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAppointmentsManager}
                  className="text-sky-400 hover:text-sky-300 transition-colors text-left"
                >
                  Consultar mis citas reservadas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Atención y Contacto
            </p>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CLINIC_INFO.phone} (Citas)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 text-center font-bold text-emerald-400 text-xs">WA</span>
                <span>{CLINIC_INFO.whatsappFormatted} (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </li>
              <li className="pt-2 text-amber-300 font-semibold text-[11px]">
                🚨 Urgencias 24h: {CLINIC_INFO.emergencyPhone}
              </li>
            </ul>
          </div>

          {/* Hours & Booking CTA */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Horario de Gabinetes
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 mb-5">
              <p className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{CLINIC_INFO.hours.weekdays}</span>
              </p>
              <p>{CLINIC_INFO.hours.saturdays}</p>
              <p className="text-[11px] text-slate-400">{CLINIC_INFO.hours.sundays}</p>
            </div>
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-600 rounded-lg transition-colors cursor-pointer"
            >
              Pedir Cita en Línea
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NovaSmile Dental S.L.P. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Aviso Legal</span>
            <span aria-hidden="true">·</span>
            <span>Política de Privacidad Médica</span>
            <span aria-hidden="true">·</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
