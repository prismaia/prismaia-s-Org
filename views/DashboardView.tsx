
import React, { useState, useEffect } from 'react';
import { api } from '../services/supabaseMock';
import { whatsappService } from '../services/whatsapp';
import { Appointment, AppointmentStatus } from '../types';
import { Calendar, Clock, CheckCircle2, XCircle, MessageSquare, TrendingUp, Users, Scissors } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DashboardView: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await api.appointments.list('1');
    setAppointments(data);
    setLoading(false);
  };

  const todayAppointments = appointments.filter(a => isToday(new Date(a.start_time)));

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    await api.appointments.updateStatus(id, status);
    fetchData();
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Bom dia, mestre! ✂️</h1>
          <p className="text-gray-500 font-medium">Você tem <span className="text-indigo-600">{todayAppointments.length} agendamentos</span> para hoje.</p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-700">{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</span>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Agendamentos Hoje" value={todayAppointments.length} icon={<Clock className="text-blue-600" />} />
        <StatCard title="Total Clientes" value="128" icon={<Users className="text-purple-600" />} />
        <StatCard title="Receita de Hoje" value={`R$ ${todayAppointments.reduce((acc, a) => acc + (a.service?.price || 0), 0)}`} icon={<TrendingUp className="text-green-600" />} />
        <StatCard title="Meta Mensal" value="85%" icon={<Scissors className="text-indigo-600" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Daily Agenda */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Próximos Horários
              </h2>
              <button onClick={fetchData} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">Atualizar</button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {todayAppointments.length === 0 ? (
                <div className="p-10 text-center text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">Nenhum agendamento para hoje ainda.</p>
                </div>
              ) : (
                todayAppointments.sort((a,b) => a.start_time.localeCompare(b.start_time)).map((appt) => (
                  <div key={appt.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-all group">
                    <div className="flex flex-col items-center justify-center min-w-[70px] py-2 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <span className="text-lg font-black">{format(new Date(appt.start_time), 'HH:mm')}</span>
                      <span className="text-[10px] font-bold uppercase opacity-60">Horário</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-black text-gray-900 text-lg">{appt.client?.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Scissors className="w-3.5 h-3.5" /> {appt.service?.name} • com {appt.barber?.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={appt.status} />
                      <div className="h-10 w-[1px] bg-gray-100 mx-2" />
                      <button 
                        onClick={() => whatsappService.sendReminder(appt.client!.phone, appt.client!.name, format(new Date(appt.start_time), 'HH:mm'))}
                        className="p-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm shadow-indigo-100"
                        title="Enviar Lembrete"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Quick Actions / Summary */}
        <div className="space-y-6">
          <section className="bg-indigo-900 text-white rounded-3xl p-8 shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2">Seu link público</h3>
              <p className="text-indigo-200 text-sm mb-6 font-medium">Compartilhe no Instagram para receber agendamentos automáticos.</p>
              <div className="bg-indigo-800 p-4 rounded-2xl flex items-center justify-between border border-indigo-700/50">
                <span className="text-xs font-bold truncate pr-4 opacity-80">meubarbeiro.com/b/demo</span>
                <button className="text-xs bg-white text-indigo-900 px-3 py-2 rounded-xl font-black hover:bg-indigo-50 transition-colors uppercase">Copiar</button>
              </div>
            </div>
            <Scissors className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
          </section>

          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4 uppercase text-xs tracking-widest opacity-40">Métricas do dia</h3>
            <div className="space-y-4">
               <MetricRow label="Cancelamentos" value="2" color="text-red-500" />
               <MetricRow label="Novos Clientes" value="5" color="text-green-500" />
               <MetricRow label="Tempo Médio" value="45min" color="text-indigo-500" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-lg transition-all duration-300 group">
    <div>
      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{value}</h3>
    </div>
    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">{icon}</div>
  </div>
);

const MetricRow = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-sm font-bold text-gray-500">{label}</span>
    <span className={`text-lg font-black ${color}`}>{value}</span>
  </div>
);

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const styles = {
    [AppointmentStatus.SCHEDULED]: 'bg-blue-100 text-blue-700',
    [AppointmentStatus.CONFIRMED]: 'bg-green-100 text-green-700',
    [AppointmentStatus.CANCELLED]: 'bg-red-100 text-red-700',
  };
  const labels = {
    [AppointmentStatus.SCHEDULED]: 'Agendado',
    [AppointmentStatus.CONFIRMED]: 'Confirmado',
    [AppointmentStatus.CANCELLED]: 'Cancelado',
  };
  return <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>{labels[status]}</span>;
};

export default DashboardView;
