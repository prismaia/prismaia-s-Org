
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/supabaseMock';
import { Barbershop, Barber, Service } from '../types';
import { Scissors, Calendar, Clock, User, CheckCircle2, ChevronLeft } from 'lucide-react';
import { format, addDays, setHours, setMinutes, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PublicBookingView: React.FC = () => {
  const { slug } = useParams();
  const [shop, setShop] = useState<Barbershop | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientData, setClientData] = useState({ name: '', phone: '' });

  // Data
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    if (slug) loadShop();
  }, [slug]);

  const loadShop = async () => {
    const s = await api.barbershops.getBySlug(slug!);
    if (s) {
      setShop(s);
      setServices(await api.services.list(s.id));
      setBarbers(await api.barbers.list(s.id));
    }
    setLoading(false);
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop || !selectedService || !selectedBarber || !selectedTime) return;

    // Split time HH:mm
    const [h, m] = selectedTime.split(':').map(Number);
    const startDateTime = setMinutes(setHours(selectedDate, h), m);

    // Get/Create Client
    const client = await api.clients.getOrCreate(shop.id, clientData.name, clientData.phone);

    // Create Appt
    await api.appointments.create({
      barbershop_id: shop.id,
      barber_id: selectedBarber.id,
      service_id: selectedService.id,
      client_id: client.id,
      start_time: startDateTime.toISOString()
    });

    setStep(5); // Success step
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  if (!shop) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">Barbearia não encontrada.</div>;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Available times logic (Mock)
  const availableTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Public Header */}
      <header className="bg-white shadow-sm py-4 border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
               <h1 className="text-lg font-bold text-gray-900">{shop.name}</h1>
               <p className="text-xs text-gray-500">Agendamento Online</p>
            </div>
          </div>
          {step > 1 && step < 5 && (
            <button onClick={prevStep} className="text-sm font-bold text-indigo-600 flex items-center space-x-1">
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Flow */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        
        {/* Progress Bar */}
        {step < 5 && (
           <div className="flex items-center justify-between mb-8 px-2">
             {[1,2,3,4].map(s => (
               <div key={s} className={`h-1.5 flex-1 mx-1 rounded-full transition-colors ${s <= step ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
             ))}
           </div>
        )}

        {step === 1 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Escolha o serviço</h2>
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedService(s); nextStep(); }}
                className="w-full bg-white p-5 rounded-2xl border-2 border-transparent hover:border-indigo-600 hover:shadow-lg transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <div className="font-bold text-lg text-gray-900 group-hover:text-indigo-600">{s.name}</div>
                  <div className="text-sm text-gray-500">{s.duration} minutos</div>
                </div>
                <div className="font-black text-indigo-600 text-lg">R$ {s.price}</div>
              </button>
            ))}
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Escolha o barbeiro</h2>
            <button
              onClick={() => { setSelectedBarber({ id: 'any', name: 'Qualquer um', barbershop_id: shop.id, active: true }); nextStep(); }}
              className="w-full bg-white p-5 rounded-2xl border-2 border-transparent hover:border-indigo-600 hover:shadow-lg transition-all text-left flex items-center space-x-4 group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <User className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg group-hover:text-indigo-600">Qualquer um (Primeiro disponível)</span>
            </button>
            {barbers.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelectedBarber(b); nextStep(); }}
                className="w-full bg-white p-5 rounded-2xl border-2 border-transparent hover:border-indigo-600 hover:shadow-lg transition-all text-left flex items-center space-x-4 group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                  {b.name[0]}
                </div>
                <span className="font-bold text-lg group-hover:text-indigo-600">{b.name}</span>
              </button>
            ))}
          </section>
        )}

        {step === 3 && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900">Selecione data e hora</h2>
            
            {/* Horizontal Date Picker (Next 7 days) */}
            <div className="flex overflow-x-auto pb-4 space-x-3 no-scrollbar">
              {[0, 1, 2, 3, 4, 5, 6].map(i => {
                const date = addDays(new Date(), i);
                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold opacity-75">{format(date, 'eee', { locale: ptBR })}</span>
                    <span className="text-xl font-black">{format(date, 'dd')}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl font-bold transition-all border-2 ${
                    selectedTime === time 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                      : 'bg-white border-transparent text-gray-700 hover:border-indigo-100 hover:bg-indigo-50/50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedTime}
              onClick={nextStep}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              Confirmar Horário
            </button>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quase lá! Só seus dados</h2>
            
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-600 font-bold">Serviço:</span>
                <span className="text-indigo-900 font-medium">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-600 font-bold">Barbeiro:</span>
                <span className="text-indigo-900 font-medium">{selectedBarber?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-600 font-bold">Quando:</span>
                <span className="text-indigo-900 font-medium">{format(selectedDate, "dd 'de' MMM")} às {selectedTime}</span>
              </div>
            </div>

            <form onSubmit={handleFinish} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Seu Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={clientData.name}
                  onChange={(e) => setClientData({...clientData, name: e.target.value})}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" 
                  placeholder="Como devemos te chamar?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Seu WhatsApp</label>
                <input 
                  required
                  type="tel" 
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" 
                  placeholder="(00) 00000-0000"
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-100"
              >
                Concluir Agendamento
              </button>
            </form>
          </section>
        )}

        {step === 5 && (
          <section className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Tudo certo!</h2>
            <p className="text-lg text-gray-600 max-w-xs mx-auto">Seu agendamento foi realizado com sucesso. Aguardamos você!</p>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-sm mx-auto text-left space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>{format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>às {selectedTime}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <User className="w-5 h-5 text-indigo-500" />
                <span>com {selectedBarber?.name}</span>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              Novo Agendamento
            </button>
          </section>
        )}
      </main>

      <footer className="py-8 text-center border-t border-gray-100 text-gray-400 text-xs">
        <p>Desenvolvido por <span className="font-bold text-indigo-600">MeuBarbeiro SaaS</span></p>
      </footer>
    </div>
  );
};

export default PublicBookingView;
