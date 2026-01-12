
export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}

export enum SubscriptionStatus {
  TRIAL = 'trialing',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled'
}

export interface Barbershop {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  phone: string;
  subscription_status: SubscriptionStatus;
  stripe_customer_id?: string;
  created_at: string;
}

export interface Barber {
  id: string;
  barbershop_id: string;
  name: string;
  active: boolean;
}

export interface Service {
  id: string;
  barbershop_id: string;
  name: string;
  duration: number;
  price: number;
}

export interface Client {
  id: string;
  barbershop_id: string;
  name: string;
  phone: string;
  last_visit: string | null;
}

export interface Appointment {
  id: string;
  barbershop_id: string;
  barber_id: string;
  service_id: string;
  client_id: string;
  start_time: string;
  status: AppointmentStatus;
  notes?: string;
  client?: Client;
  barber?: Barber;
  service?: Service;
}

export interface User {
  id: string;
  email: string;
  onboarded: boolean;
}
