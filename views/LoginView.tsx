"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginView() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // 🚀 Login direto sem checar confirmação de e-mail
    router.push("/dashboard");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // 🚀 Se o Supabase retornou sessão, entra direto
    if (data.session) {
      router.push("/onboarding");
      return;
    }

    // Fallback (não deveria acontecer)
    setError("Erro inesperado ao criar conta");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">MeuBarbeiro</h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gray-200 text-black py-3 rounded hover:bg-gray-300"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>
      </div>
    </div>
  );
}
