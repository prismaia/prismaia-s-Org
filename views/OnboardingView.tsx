
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/supabaseMock';
import { Scissors, Store, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  user: any;
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    slug: '',
    phone: '',
    barberName: ''
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);

  const handleFinish = async () => {
    // Save to DB
    const shop = await api.barbershops.update({ 
      id: '1', 
      name: formData.shopName, 
      slug: formData.slug, 
      phone: formData.phone 
    });
    await api.barbers.create({ name: formData.barberName, barbershop_id: shop.id });
    
    onComplete();
    navigate('/subscription');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-2xl">
            <Scissors className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Bem-vindo ao MeuBarbeiro!</h1>
          <p className="text-gray-500">Vamos configurar sua barbearia em 2 minutos.</p>
        </div>

        {/* Steps Content */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Store className="w-5 h-5 text-indigo-600" /> Sobre a Barbearia
              </h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome Comercial</label>
                <input 
                  type="text"
                  placeholder="Ex: Barber Shop Vintage"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-600 transition-all"
                  value={formData.shopName}
                  onChange={(e) => setFormData({...formData, shopName: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Link de Agendamento</label>
                <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl">
                  <span className="text-gray-400 text-sm">meubarbeiro.com/b/</span>
                  <span className="font-bold text-indigo-600">{formData.slug || 'seu-nome'}</span>
                </div>
              </div>
              <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700">
                Continuar <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Contato e Equipe</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp para Notificações</label>
                <input 
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-600 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome de Barbeiro</label>
                <input 
                  type="text"
                  placeholder="Como os clientes te chamam?"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-600 transition-all"
                  value={formData.barberName}
                  onChange={(e) => setFormData({...formData, barberName: e.target.value})}
                />
              </div>
              <button onClick={handleFinish} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700">
                Finalizar Configuração <Check className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <div className={`h-2 w-8 rounded-full transition-colors ${step === 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-8 rounded-full transition-colors ${step === 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
