
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'MeuBarbeiro - Sua Barbearia no Próximo Nível',
  description: 'Gestão completa para barbeiros e agendamento online para clientes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
