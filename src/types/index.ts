export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  features: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  servicePackage: ServicePackage;
  date: Date;
  timeSlot: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}




