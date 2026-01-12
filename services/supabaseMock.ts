
import { Barbershop, Barber, Service, Client, Appointment, AppointmentStatus, SubscriptionStatus } from '../types';

// Initial Mock Data
let barbershops: Barbershop[] = [
  // Added subscription_status: SubscriptionStatus.TRIAL to satisfy Barbershop interface requirements
  { id: '1', owner_id: 'owner-1', name: 'Barbearia do João', slug: 'barbearia-do-joao', phone: '11999999999', subscription_status: SubscriptionStatus.TRIAL, created_at: new Date().toISOString() }
];

let barbers: Barber[] = [
  { id: 'b1', barbershop_id: '1', name: 'João Silva', active: true },
  { id: 'b2', barbershop_id: '1', name: 'Ricardo Santos', active: true }
];

let services: Service[] = [
  { id: 's1', barbershop_id: '1', name: 'Corte de Cabelo', duration: 30, price: 50 },
  { id: 's2', barbershop_id: '1', name: 'Barba', duration: 20, price: 30 },
  { id: 's3', barbershop_id: '1', name: 'Combo (Cabelo + Barba)', duration: 50, price: 70 }
];

let clients: Client[] = [
  { id: 'c1', barbershop_id: '1', name: 'Marcos Oliveira', phone: '11988887777', last_visit: '2023-10-01' },
  { id: 'c2', barbershop_id: '1', name: 'Felipe Souza', phone: '11977776666', last_visit: '2024-01-15' }
];

let appointments: Appointment[] = [];

// API Layer
export const api = {
  auth: {
    login: async (email: string) => {
      const user = { id: 'owner-1', email };
      localStorage.setItem('meubarbeiro_user', JSON.stringify(user));
      return user;
    },
    signup: async (email: string) => {
      const user = { id: 'owner-1', email };
      localStorage.setItem('meubarbeiro_user', JSON.stringify(user));
      return user;
    },
    logout: () => localStorage.removeItem('meubarbeiro_user')
  },

  barbershops: {
    getBySlug: async (slug: string) => barbershops.find(b => b.slug === slug),
    getByOwner: async (ownerId: string) => barbershops.find(b => b.owner_id === ownerId),
    update: async (data: Partial<Barbershop>) => {
      barbershops = barbershops.map(b => b.id === data.id ? { ...b, ...data } as Barbershop : b);
      return barbershops[0];
    }
  },

  barbers: {
    list: async (shopId: string) => barbers.filter(b => b.barbershop_id === shopId),
    create: async (data: any) => {
      const newBarber = { id: Math.random().toString(36).substr(2, 9), active: true, ...data };
      barbers.push(newBarber);
      return newBarber;
    },
    delete: async (id: string) => {
      barbers = barbers.filter(b => b.id !== id);
    }
  },

  services: {
    list: async (shopId: string) => services.filter(s => s.barbershop_id === shopId),
    create: async (data: any) => {
      const newService = { id: Math.random().toString(36).substr(2, 9), ...data };
      services.push(newService);
      return newService;
    },
    delete: async (id: string) => {
      services = services.filter(s => s.id !== id);
    }
  },

  clients: {
    list: async (shopId: string) => clients.filter(c => c.barbershop_id === shopId),
    getOrCreate: async (shopId: string, name: string, phone: string) => {
      let client = clients.find(c => c.phone === phone && c.barbershop_id === shopId);
      if (!client) {
        client = { id: Math.random().toString(36).substr(2, 9), barbershop_id: shopId, name, phone, last_visit: null };
        clients.push(client);
      }
      return client;
    }
  },

  appointments: {
    list: async (shopId: string) => {
      return appointments.filter(a => a.barbershop_id === shopId).map(a => ({
        ...a,
        client: clients.find(c => c.id === a.client_id),
        barber: barbers.find(b => b.id === a.barber_id),
        service: services.find(s => s.id === a.service_id)
      }));
    },
    create: async (data: any) => {
      const newAppt = { 
        id: Math.random().toString(36).substr(2, 9), 
        status: AppointmentStatus.SCHEDULED,
        ...data 
      };
      appointments.push(newAppt);
      return newAppt;
    },
    updateStatus: async (id: string, status: AppointmentStatus) => {
      appointments = appointments.map(a => a.id === id ? { ...a, status } : a);
    }
  }
};
