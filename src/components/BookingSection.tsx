import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  X,
  Share2,
  CalendarPlus,
} from 'lucide-react';
import { Appointment, DentalService, Doctor } from '../types/dental';
import { CLINIC_INFO, DENTAL_DOCTORS, DENTAL_SERVICES } from '../data/mockDentalData';

interface BookingSectionProps {
  initialServiceId?: string;
  initialDoctorId?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onCloseModal?: () => void;
  isModal?: boolean;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialServiceId,
  initialDoctorId,
  onAppointmentCreated,
  onCloseModal,
  isModal = false,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || DENTAL_SERVICES[0].id
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctorId || 'any'
  );

  // Generate next 14 business days (skipping Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const now = new Date();
    let current = new Date(now);
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (dates.length < 12) {
      if (current.getDay() !== 0) { // skip Sunday
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        const dateString = `${yyyy}-${mm}-${dd}`;

        const dayName = current.toLocaleDateString('es-ES', { weekday: 'short' });
        const dayNumber = current.getDate();
        const monthName = current.toLocaleDateString('es-ES', { month: 'short' });

        dates.push({
          dateString,
          label: `${dayName} ${dayNumber} ${monthName}`,
          dayName,
          dayNumber,
          monthName,
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);

  const timeSlots = {
    morning: ['09:00', '10:00', '11:15', '12:30', '13:30'],
    afternoon: ['16:00', '17:00', '18:15', '19:15'],
  };
  const [selectedTime, setSelectedTime] = useState<string>('10:00');

  // Form Fields
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  const selectedService = DENTAL_SERVICES.find((s) => s.id === selectedServiceId) || DENTAL_SERVICES[0];
  const selectedDoctor = selectedDoctorId === 'any'
    ? null
    : DENTAL_DOCTORS.find((d) => d.id === selectedDoctorId);

  const handleNextStep = () => {
    if (step === 3) {
      // Validate patient details
      const errors: { [key: string]: string } = {};
      if (!patientName.trim()) errors.name = 'Por favor introduce tu nombre completo';
      if (!patientPhone.trim() || patientPhone.trim().length < 9) {
        errors.phone = 'Introduce un teléfono de contacto válido (mínimo 9 dígitos)';
      }
      if (!patientEmail.trim() || !patientEmail.includes('@')) {
        errors.email = 'Introduce una dirección de email válida';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});

      // Create appointment
      const randomCode = `NVS-${Math.floor(1000 + Math.random() * 9000)}`;
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        bookingCode: randomCode,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        doctorId: selectedDoctor ? selectedDoctor.id : 'dr-any',
        doctorName: selectedDoctor ? selectedDoctor.name : 'Especialista de guardia asignado',
        date: selectedDate,
        timeSlot: selectedTime,
        isFirstVisit,
        symptoms: symptoms.trim() || undefined,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(newAppointment);
      onAppointmentCreated(newAppointment);
      setStep(4);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const generateGoogleCalendarUrl = (apt: Appointment) => {
    const title = encodeURIComponent(`Cita Odontológica NovaSmile: ${apt.serviceName}`);
    const details = encodeURIComponent(
      `Cita confirmada en NovaSmile Clínica Dental.\nDoctor: ${apt.doctorName}\nCódigo de cita: ${apt.bookingCode}\nTeléfono clínica: ${CLINIC_INFO.phone}`
    );
    const location = encodeURIComponent(CLINIC_INFO.address);
    // Rough date formatting
    const [year, month, day] = apt.date.split('-');
    const [hour, minute] = apt.timeSlot.split(':');
    const startIso = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String(Number(hour) + 1).padStart(2, '0');
    const endIso = `${year}${month}${day}T${endHour}${minute}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${endIso}`;
  };

  const getWhatsAppBookingUrl = (apt: Appointment) => {
    const message = `¡Hola NovaSmile! Acabo de reservar cita en su web.%0A%0A*Código:* ${apt.bookingCode}%0A*Paciente:* ${encodeURIComponent(apt.patientName)}%0A*Tratamiento:* ${encodeURIComponent(apt.serviceName)}%0A*Fecha:* ${apt.date}%0A*Hora:* ${apt.timeSlot}%0A*Doctor:* ${encodeURIComponent(apt.doctorName)}%0A%0A¿Podrían confirmarme la cita por favor? Gracias.`;
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${message}`;
  };

  return (
    <div className={`bg-white ${isModal ? 'p-6 sm:p-8 rounded-2xl shadow-xl' : 'py-16'}`}>
      <div className={isModal ? 'max-w-2xl mx-auto' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-1">
              <span>Reserva de Citas en Línea</span>
              <span aria-hidden="true">·</span>
              <span>Confirmación Inmediata</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {confirmedBooking ? '¡Cita confirmada con éxito!' : 'Agenda tu visita en 4 sencillos pasos'}
            </h2>
          </div>
          {isModal && onCloseModal && (
            <button
              type="button"
              onClick={onCloseModal}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar (steps 1 to 3) */}
        {!confirmedBooking && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span className={step >= 1 ? 'font-semibold text-sky-800' : ''}>1. Tratamiento</span>
              <span className={step >= 2 ? 'font-semibold text-sky-800' : ''}>2. Doctor y Fecha</span>
              <span className={step >= 3 ? 'font-semibold text-sky-800' : ''}>3. Datos Paciente</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-700 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Select Service */}
        {step === 1 && !confirmedBooking && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Selecciona el motivo de tu consulta o tratamiento
              </h3>
              <p className="text-xs text-slate-500">
                La primera visita y diagnóstico 3D con ortopantomografía son 100% gratuitos y sin compromiso.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DENTAL_SERVICES.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-50/60 border-sky-600 ring-1 ring-sky-600/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
                          {service.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 font-mono">
                          {service.priceFrom === 0 ? 'Sin coste' : `Desde ${service.priceFrom}€`}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {service.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span>Duración: ~{service.durationMinutes} min</span>
                      {isSelected && <span className="text-sky-700 font-medium">✓ Seleccionado</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Siguiente: Elegir Doctor y Horario</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Doctor & Date & Time */}
        {step === 2 && !confirmedBooking && (
          <div className="space-y-6">
            {/* Doctor preference */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                ¿Prefieres algún especialista en particular?
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Puedes seleccionar un doctor preferente o elegir la primera disponibilidad general.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDoctorId('any')}
                  className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    selectedDoctorId === 'any'
                      ? 'bg-sky-50 border-sky-600 text-sky-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold">Primer doctor libre</p>
                  <p className="text-[11px] text-slate-500">Mayor disponibilidad horaria</p>
                </button>
                {DENTAL_DOCTORS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      selectedDoctorId === doc.id
                        ? 'bg-sky-50 border-sky-600 text-sky-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold">{doc.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{doc.role.split('&')[0]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date selection */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Selecciona la fecha de tu cita
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.dateString;
                  return (
                    <button
                      key={d.dateString}
                      type="button"
                      onClick={() => setSelectedDate(d.dateString)}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold opacity-80">
                        {d.dayName}
                      </div>
                      <div className="text-lg font-bold font-mono my-0.5">
                        {d.dayNumber}
                      </div>
                      <div className="text-[10px] capitalize opacity-80">
                        {d.monthName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slot selection */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Franja horaria disponible
              </h3>
              <div className="space-y-3 mt-2">
                <div>
                  <span className="text-xs text-slate-500 font-medium block mb-1.5">Turno de Mañana</span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.morning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-sky-700 text-white border-sky-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-medium block mb-1.5">Turno de Tarde</span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.afternoon.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-sky-700 text-white border-sky-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Siguiente: Tus Datos de Contacto</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Patient Form */}
        {step === 3 && !confirmedBooking && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Datos personales y de contacto del paciente
              </h3>
              <p className="text-xs text-slate-500">
                Utilizaremos estos datos para enviarte el recordatorio de cita y el código de acceso médico.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ej. Carmen García López"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${
                      formErrors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-sky-600'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono Móvil (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Ej. 612 345 678"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${
                      formErrors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-sky-600'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="carmen.garcia@email.com"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${
                      formErrors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-sky-600'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Motivo de la visita o síntomas (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Ej. Me gustaría consultar precios de ortodoncia invisible y tengo una ligera molestia en una muela..."
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="firstVisitCheck"
                  checked={isFirstVisit}
                  onChange={(e) => setIsFirstVisit(e.target.checked)}
                  className="rounded text-sky-700 focus:ring-sky-600 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="firstVisitCheck" className="text-xs text-slate-700 cursor-pointer">
                  Es mi primera vez en la clínica (Aplica revisión y diagnóstico 3D gratuito).
                </label>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Resumen de la cita solicitada:</p>
              <p>• Tratamiento: <span className="font-medium text-slate-900">{selectedService.name}</span></p>
              <p>• Especialista: <span className="font-medium text-slate-900">{selectedDoctor ? selectedDoctor.name : 'Primer especialista disponible'}</span></p>
              <p>• Día y hora: <span className="font-medium text-slate-900">{selectedDate} a las {selectedTime}h</span></p>
              <p>• Ubicación: <span className="text-slate-900">{CLINIC_INFO.address}</span></p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirmar Reserva de Cita</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Booking Confirmation Screen */}
        {confirmedBooking && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-950">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-lg text-emerald-900">
                  ¡Cita reservada correctamente!
                </span>
              </div>
              <p className="text-sm text-emerald-800">
                Hemos enviado un correo de confirmación a <strong className="font-semibold">{confirmedBooking.patientEmail}</strong> con todos los detalles de tu cita.
              </p>
            </div>

            {/* Booking Ticket Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Código localizador</span>
                  <span className="text-xl font-mono font-bold text-sky-800">{confirmedBooking.bookingCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Estado</span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Confirmada
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <span className="text-xs text-slate-400 block">Paciente</span>
                  <span className="font-medium text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Teléfono de contacto</span>
                  <span className="font-mono text-slate-900">{confirmedBooking.patientPhone}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Tratamiento</span>
                  <span className="font-medium text-slate-900">{confirmedBooking.serviceName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Doctor asignado</span>
                  <span className="font-medium text-slate-900">{confirmedBooking.doctorName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Fecha y Hora</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {confirmedBooking.date} · {confirmedBooking.timeSlot}h
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Ubicación</span>
                  <span className="text-xs text-slate-700">{CLINIC_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* WhatsApp direct notification */}
              <a
                href={getWhatsAppBookingUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <span>📲 Confirmar por WhatsApp con la Clínica</span>
              </a>

              {/* Google Calendar export */}
              <a
                href={generateGoogleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <CalendarPlus className="w-4 h-4 text-sky-700" />
                <span>Añadir a Google Calendar</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setStep(1);
                  if (onCloseModal) onCloseModal();
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                {isModal ? 'Cerrar esta ventana' : 'Reservar otra cita'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
