
import React, { useState, useEffect } from 'react';
import { api } from '../services/supabaseMock';
import { Client } from '../types';
import { Search, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, isAfter, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ClientsView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const data = await api.clients.list('1');
    setClients(data);
    setLoading(false);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  const isInactive = (lastVisit: string | null) => {
    if (!lastVisit) return true;
    return !isAfter(new Date(lastVisit), subDays(new Date(), 30));
  };

  const sendReactivationMessage = (phone: string, name: string) => {
    const message = encodeURIComponent(`Olá ${name}! Faz tempo que você não aparece na Barbearia. Que tal marcar um horário para dar aquele tapa no visual? Estamos com novos serviços!`);
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Meus Clientes</h1>
        <p className="text-gray-500">Gerencie sua base de contatos e fidelize seus clientes.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou celular..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
          />
        </div>
        <div className="flex space-x-3">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Inativo (+30 dias)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Última Visita</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-400">Nenhum cliente encontrado.</td>
              </tr>
            ) : (
              filteredClients.map((client) => {
                const inactive = isInactive(client.last_visit);
                return (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.last_visit ? (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{formatDistanceToNow(new Date(client.last_visit), { addSuffix: true, locale: ptBR })}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-sm">Nunca visitou</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {inactive ? (
                        <span className="flex items-center space-x-1 text-red-600 text-sm font-bold">
                          <AlertCircle className="w-4 h-4" />
                          <span>Inativo</span>
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm font-bold">Ativo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => sendReactivationMessage(client.phone, client.name)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all ${
                          inactive ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!inactive}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Reativar</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsView;
