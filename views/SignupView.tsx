
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/supabaseMock';
import { Scissors, Mail, Lock, Store, Smartphone } from 'lucide-react';

interface SignupViewProps {
  onSignup: (user: any) => void;
}

const SignupView: React.FC<SignupViewProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
    shopSlug: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'shopName') {
      const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, [name]: value, shopSlug: slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.auth.signup(formData.email);
      onSignup(user);
      navigate('/admin/setup');
    } catch (err) {
      alert('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
            <Scissors className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 tracking-tight">
          Crie sua barbearia
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Já possui conta?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500">
            Fazer login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700">Seu Nome</label>
                <div className="mt-1 relative">
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    placeholder="João Silva"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Seu Email</label>
                <div className="mt-1 relative">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    placeholder="joao@exemplo.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700">Nome da Barbearia</label>
                <div className="mt-1 relative">
                  <input
                    name="shopName"
                    type="text"
                    required
                    value={formData.shopName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    placeholder="Barbearia do João"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700">Telefone/WhatsApp</label>
                <div className="mt-1 relative">
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Senha</label>
                <div className="mt-1 relative">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-xs text-indigo-700 font-bold uppercase tracking-wider mb-1">Seu link exclusivo será:</p>
              <p className="text-indigo-900 font-black truncate">meubarbeiro.com/#/b/{formData.shopSlug || '...'}</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 shadow-indigo-200"
              >
                {loading ? 'Criando Conta...' : 'Começar Agora'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
