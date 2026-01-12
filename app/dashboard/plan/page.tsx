export default function PlanPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Escolha o plano ideal para sua barbearia
        </h1>
        <p className="text-gray-400 mb-12">
          Comece grátis e só pague quando sua barbearia estiver faturando.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* FREE */}
          <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-950">
            <h2 className="text-xl font-bold mb-2">Free</h2>
            <p className="text-3xl font-bold mb-4">R$ 0</p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ 1 barbeiro</li>
              <li>✔ 1 agenda</li>
              <li>✔ Até 50 clientes</li>
              <li>✔ Página pública</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
              Começar grátis
            </button>
          </div>

          {/* PRO */}
          <div className="border border-yellow-500 rounded-xl p-8 bg-zinc-950 relative">
            <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-sm px-3 py-1 rounded-full">
              Mais escolhido
            </div>
            <h2 className="text-xl font-bold mb-2">Pro</h2>
            <p className="text-3xl font-bold mb-4">R$ 49/mês</p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Até 5 barbeiros</li>
              <li>✔ Agendas ilimitadas</li>
              <li>✔ Clientes ilimitados</li>
              <li>✔ Relatórios financeiros</li>
              <li>✔ Suporte prioritário</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition">
              Escolher Pro
            </button>
          </div>

          {/* PREMIUM */}
          <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-950">
            <h2 className="text-xl font-bold mb-2">Premium</h2>
            <p className="text-3xl font-bold mb-4">R$ 99/mês</p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Barbearia ilimitada</li>
              <li>✔ Múltiplas unidades</li>
              <li>✔ Dashboard avançado</li>
              <li>✔ API & integrações</li>
              <li>✔ Atendimento dedicado</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
              Falar com vendas
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
