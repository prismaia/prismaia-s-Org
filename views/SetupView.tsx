
import React, { useState, useEffect } from 'react';
import { api } from '../services/supabaseMock';
import { Barber, Service, Barbershop } from '../types';
import { Plus, Trash2, Scissors, User, Store } from 'lucide-react';

const SetupView: React.FC = () => {
  const [shop, setShop] = useState<Barbershop | null>(null);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [newBarberName, setNewBarberName] = useState('');
  const [newService, setNewService] = useState({ name: '', duration: 30, price: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await api.barbershops.getByOwner('owner-1');
    if (s) {
      setShop(s);
      setBarbers(await api.barbers.list(s.id));
      setServices(await api.services.list(s.id));
    }
  };

  const handleAddBarber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBarberName || !shop) return;
    await api.barbers.create({ name: newBarberName, barbershop_id: shop.id });
    setNewBarberName('');
    loadData();
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !shop) return;
    await api.services.create({ ...newService, barbershop_id: shop.id });
    setNewService({ name: '', duration: 30, price: 0 });
    loadData();
  };

  const deleteBarber = async (id: string) => {
    await api.barbers.delete(id);
    loadData();
  };

  const deleteService = async (id: string) => {
    await api.services.delete(id);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500">Configure seu perfil, equipe e serviços oferecidos.</p>
      </header>

      {/* Barbershop Info */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Store className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold">Informações da Barbearia</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Barbearia</label>
            <input type="text" value={shop?.name || ''} readOnly className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link de Agendamento</label>
            <div className="flex items-center bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg text-indigo-700 font-medium">
              meubarbeiro.com/#/b/{shop?.slug}
            </div>
          </div>
        </div>
      </section>

      {/* Barbers */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold">Sua Equipe</h2>
        </div>
        
        <form onSubmit={handleAddBarber} className="flex space-x-3 mb-6">
          <input 
            type="text" 
            placeholder="Nome do Barbeiro" 
            value={newBarberName}
            onChange={(e) => setNewBarberName(e.target.value)}
            className="flex-1 border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" 
          />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Adicionar</span>
          </button>
        </form>

        <div className="space-y-3">
          {barbers.map(b => (
            <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-900">{b.name}</span>
              <button onClick={() => deleteBarber(b.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Scissors className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold">Serviços e Preços</h2>
        </div>

        <form onSubmit={handleAddService} className="grid md:grid-cols-4 gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Nome do Serviço" 
            value={newService.name}
            onChange={(e) => setNewService({...newService, name: e.target.value})}
            className="md:col-span-2 border border-gray-200 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <input 
            type="number" 
            placeholder="Minutos" 
            value={newService.duration}
            onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
            className="border border-gray-200 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </form>

        <div className="space-y-3">
          {services.map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-gray-900">{s.name}</span>
                <span className="text-sm text-gray-500">{s.duration} min</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-indigo-600">R$ {s.price}</span>
                <button onClick={() => deleteService(s.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SetupView;
