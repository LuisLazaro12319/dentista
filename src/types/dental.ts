export interface DentalService {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'ortodoncia' | 'implantes' | 'estetica' | 'general' | 'cirugia';
  durationMinutes: number;
  priceFrom: number;
  icon: string;
  benefits: string[];
  technology: string;
  doctorId: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  collegiateNumber: string;
  photoUrl: string;
  bio: string;
  specialties: string[];
  education: string;
  availableDays: string[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  category: 'ortodoncia' | 'estetica' | 'implantes' | 'periodoncia';
  patientInitials: string;
  patientAge: number;
  treatmentDuration: string;
  doctorName: string;
  doctorId: string;
  problemDescription: string;
  solutionDescription: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  highlights: string[];
  tags: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Ortodoncia' | 'Implantes' | 'Higiene y Prevención' | 'Estética Dental';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  tags: string[];
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientAge: number;
  patientCity: string;
  treatment: string;
  rating: number;
  comment: string;
  outcome: string;
  date: string;
  verified: boolean;
  avatarInitials: string;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  isFirstVisit: boolean;
  symptoms?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'clinic' | 'user';
  text: string;
  time: string;
  options?: string[];
}
