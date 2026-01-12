
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stripeService } from '../services/stripe';
import { Check, Zap, Shield, Star } from 'lucide-react';

const SubscriptionView: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = async (plan: string) => {
    // Real logic: call stripe checkout
    await stripeService.createCheckoutSession(plan, '1');
    // For demo, just navigate to admin
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Escolha o plano ideal para crescer</h1>
        <p className="text-xl text-gray-600 mb-16">30 dias grátis para testar. Cancele quando quiser.</p>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl p-10 border border-gray-100 flex flex-col h-full shadow-lg shadow-gray-200/50">
            <div className="mb-8">
              <Zap className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold">Plano Barbeiro</h3>
              <p className="text-gray-500">Para profissionais individuais.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black">R$ 49</span>
              <span className="text-gray-500">/mês</span>
            </div>
            <ul className="text-left space-y-4 mb-12 flex-1">
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Agendamentos Ilimitados</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Link Público Personalizado</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> 1 Barbeiro</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Lembretes WhatsApp</li>
            </ul>
            <button 
              onClick={() => handleSubscribe('basic')}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all"
            >
              Começar Teste Grátis
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-white rounded-3xl p-10 border-2 border-indigo-600 flex flex-col h-full shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
              RECOMENDADO
            </div>
            <div className="mb-8">
              <Star className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold">Plano Barbearia</h3>
              <p className="text-gray-500">Para salões com múltiplos profissionais.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black">R$ 97</span>
              <span className="text-gray-500">/mês</span>
            </div>
            <ul className="text-left space-y-4 mb-12 flex-1">
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Tudo do Plano Barbeiro</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Barbeiros Ilimitados</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Gestão de Comissões</li>
              <li className="flex gap-3 text-gray-600"><Check className="text-green-500" /> Relatórios Avançados</li>
            </ul>
            <button 
              onClick={() => handleSubscribe('pro')}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Começar Teste Grátis Pro
            </button>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2"><Shield className="w-5 h-5" /> Pagamento Seguro</div>
          <div className="flex items-center gap-2"><Zap className="w-5 h-5" /> Ativação Instantânea</div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
