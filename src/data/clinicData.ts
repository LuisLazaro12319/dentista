/**
 * DF. Odontología Integral - datos del consultorio.
 * Fuente: ficha de Google Maps e Instagram @od.ferrioldebora.
 * Todo lo que se muestra en la web sale de acá: para otro consultorio alcanza con cambiar este archivo.
 */

export const CLINIC = {
  name: 'DF. Odontología Integral',
  professional: 'Od. Débora Ferriol',
  street: 'Tagle 3602',
  locality: 'Lanús',
  province: 'Provincia de Buenos Aires',
  fullAddress: 'Tagle 3602, Lanús, Provincia de Buenos Aires',
  phone: '011 3650-9803',
  whatsappNumber: '5491136509803',
  whatsappDisplay: '+54 9 11 3650-9803',
  instagramHandle: '@od.ferrioldebora',
  instagramUrl: 'https://www.instagram.com/od.ferrioldebora/',
  mapsUrl: 'https://maps.app.goo.gl/rTWgPxAPTZLVEKrH8',
  coordinates: { lat: -34.6974685, lng: -58.4265429 },
  // Calificación visible en la ficha de Google Maps.
  googleRating: '5.0',
  googleReviews: 38,
};

export interface DentalService {
  id: string;
  name: string;
  description: string;
  icon: 'stethoscope' | 'sparkles' | 'layers' | 'shield' | 'activity' | 'smile';
}

export const SERVICES: DentalService[] = [
  {
    id: 'integral',
    name: 'Odontología integral',
    description: 'Revisión, limpieza y arreglo de caries para cuidar tu salud bucal de forma completa.',
    icon: 'stethoscope',
  },
  {
    id: 'ortodoncia',
    name: 'Ortodoncia y ortopedia',
    description: 'Corrección de la posición de los dientes y acompañamiento del desarrollo de los maxilares.',
    icon: 'sparkles',
  },
  {
    id: 'protesis',
    name: 'Prótesis',
    description: 'Reposición de piezas dentales ausentes para recuperar la masticación y la sonrisa.',
    icon: 'layers',
  },
  {
    id: 'extracciones',
    name: 'Extracciones',
    description: 'Extracción de piezas dentales cuando es necesaria, con indicaciones claras para el después.',
    icon: 'shield',
  },
  {
    id: 'conducto',
    name: 'Tratamientos de conducto',
    description: 'Endodoncia para conservar tu diente cuando el nervio está afectado.',
    icon: 'activity',
  },
  {
    id: 'estetica',
    name: 'Estética dental',
    description: 'Tratamientos para mejorar el color, la forma y la armonía de tu sonrisa.',
    icon: 'smile',
  },
];

export interface ScheduleDay {
  dayName: string;
  dayIndex: number; // 0 = domingo ... 6 = sábado
  open: string | null;
  close: string | null;
}

export const SCHEDULE: ScheduleDay[] = [
  { dayName: 'Lunes', dayIndex: 1, open: '09:00', close: '19:00' },
  { dayName: 'Martes', dayIndex: 2, open: '09:00', close: '18:00' },
  { dayName: 'Miércoles', dayIndex: 3, open: '09:00', close: '19:00' },
  { dayName: 'Jueves', dayIndex: 4, open: '09:00', close: '19:00' },
  { dayName: 'Viernes', dayIndex: 5, open: '09:00', close: '19:00' },
  { dayName: 'Sábado', dayIndex: 6, open: '09:00', close: '16:00' },
  { dayName: 'Domingo', dayIndex: 0, open: null, close: null },
];

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

export interface ClinicStatus {
  isOpen: boolean;
  badge: string;
  detail: string;
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function getClinicStatus(now: Date = new Date()): ClinicStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const weekday = (parts.find((p) => p.type === 'weekday')?.value || '').toLowerCase().slice(0, 3);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10) % 24;
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const dayMap: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const today = dayMap[weekday] ?? now.getDay();
  const minutes = hour * 60 + minute;

  const day = SCHEDULE.find((d) => d.dayIndex === today);
  if (day?.open && day.close) {
    if (minutes >= toMinutes(day.open) && minutes < toMinutes(day.close)) {
      return { isOpen: true, badge: 'Abierto ahora', detail: `Cierra a las ${day.close} hs` };
    }
    if (minutes < toMinutes(day.open)) {
      return { isOpen: false, badge: 'Cerrado ahora', detail: `Abre hoy a las ${day.open} hs` };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const next = SCHEDULE.find((d) => d.dayIndex === (today + i) % 7);
    if (next?.open) {
      const cuando = i === 1 ? 'mañana' : `el ${next.dayName.toLowerCase()}`;
      return { isOpen: false, badge: 'Cerrado por hoy', detail: `Abre ${cuando} a las ${next.open} hs` };
    }
  }
  return { isOpen: false, badge: 'Cerrado ahora', detail: '' };
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
