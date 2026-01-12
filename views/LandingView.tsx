
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, CheckCircle, Smartphone, Calendar, BarChart } from 'lucide-react';

const LandingView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scissors className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">MeuBarbeiro</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Recursos</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Preços</a>
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Entrar</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Começar Grátis
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Gerencie sua barbearia com o <span className="text-indigo-600">toque de um mestre</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Agendamentos online, controle de clientes e lembretes por WhatsApp. Tudo em um só lugar para você focar no que faz de melhor.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="inline-flex justify-center items-center bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Criar Minha Barbearia
                </Link>
                <Link to="/login" className="inline-flex justify-center items-center bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                  Ver Demonstração
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <img 
                src="https://picsum.photos/800/600?random=1" 
                alt="App Dashboard Preview" 
                className="relative rounded-3xl shadow-2xl border border-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Feito para o barbeiro moderno</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">Tudo que você precisa para automatizar sua rotina e faturar mais.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Smartphone className="w-8 h-8 text-indigo-600" />}
              title="Agendamento Público"
              description="Seus clientes agendam sozinhos através de um link exclusivo da sua barbearia."
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8 text-green-600" />}
              title="Agenda Inteligente"
              description="Visualize seus horários, controle cancelamentos e reagendamentos com facilidade."
            />
            <FeatureCard 
              icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
              title="WhatsApp Integrado"
              description="Confirmações automáticas e lembretes para reduzir faltas em até 80%."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Plano Único e Transparente</h2>
          <div className="bg-white border-2 border-indigo-600 rounded-3xl p-10 relative shadow-xl">
             <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
               MAIS POPULAR
             </div>
             <p className="text-lg text-gray-500 mb-2">Tudo ilimitado</p>
             <div className="flex items-center justify-center mb-6">
               <span className="text-3xl font-bold text-gray-500 mr-2">R$</span>
               <span className="text-6xl font-black text-gray-900">49,90</span>
               <span className="text-xl text-gray-500 ml-2">/mês</span>
             </div>
             <ul className="text-left space-y-4 mb-8 max-w-xs mx-auto">
               <li className="flex items-center space-x-3">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>Barbeiros ilimitados</span>
               </li>
               <li className="flex items-center space-x-3">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>Agendamentos ilimitados</span>
               </li>
               <li className="flex items-center space-x-3">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>Link de agendamento próprio</span>
               </li>
               <li className="flex items-center space-x-3">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>Suporte Prioritário</span>
               </li>
             </ul>
             <Link to="/signup" className="block w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all">
               Assinar Agora
             </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 MeuBarbeiro SaaS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingView;
