
export const whatsappService = {
  formatPhone: (phone: string) => phone.replace(/\D/g, ''),
  
  sendConfirmation: (phone: string, name: string, date: string, time: string, shopName: string) => {
    const text = `Olá ${name}! Seu agendamento na ${shopName} foi confirmado para o dia ${date} às ${time}. 💈`;
    const url = `https://wa.me/55${whatsappService.formatPhone(phone)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },

  sendReminder: (phone: string, name: string, time: string) => {
    const text = `Oi ${name}, passando para lembrar do seu horário hoje às ${time}. Nos vemos em breve! 💈`;
    const url = `https://wa.me/55${whatsappService.formatPhone(phone)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },

  sendReactivation: (phone: string, name: string, shopName: string) => {
    const text = `Olá ${name}! Faz tempo que você não aparece na ${shopName}. Que tal dar um tapa no visual essa semana? Clique no link para agendar: meubarbeiro.com/b/demo`;
    const url = `https://wa.me/55${whatsappService.formatPhone(phone)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
};
