
# MeuBarbeiro SaaS 💈

The ultimate B2B SaaS for barbershop management. Features online booking, automated WhatsApp reminders, and subscription management via Stripe.

## ✨ Features

- **Multi-tenant SaaS**: Each barbershop gets its own dashboard and public booking URL.
- **Next.js App Router**: Optimized for performance and SEO.
- **Supabase Integration**: Real-time database, auth, and storage.
- **Stripe Billing**: Automated monthly subscriptions (Basic & Pro).
- **Public Booking**: Client-facing page at `/[slug]` for easy appointments.
- **WhatsApp Integration**: Stubs for confirmation, reminder, and reactivation messages.

## 🛠 Database Schema

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Barbershops table
CREATE TABLE barbershops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  phone TEXT,
  subscription_status TEXT DEFAULT 'trialing',
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Barbers table
CREATE TABLE barbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barbershop_id UUID REFERENCES barbershops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barbershop_id UUID REFERENCES barbershops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration INTEGER NOT NULL, -- minutes
  price DECIMAL(10,2) NOT NULL
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barbershop_id UUID REFERENCES barbershops(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  last_visit DATE,
  UNIQUE(barbershop_id, phone)
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barbershop_id UUID REFERENCES barbershops(id) ON DELETE CASCADE,
  barber_id UUID REFERENCES barbers(id),
  service_id UUID REFERENCES services(id),
  client_id UUID REFERENCES clients(id),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Setup

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Setup Env**: Copy `.env.example` to `.env.local`
4. **Run Dev**: `npm run dev`

## 📦 Deployment

Deploy to Vercel with one click. Ensure you add your production Supabase and Stripe environment variables.
