
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import AdminLayout from './components/AdminLayout';
import DashboardView from './views/DashboardView';
import SetupView from './views/SetupView';
import ClientsView from './views/ClientsView';
import PublicBookingView from './views/PublicBookingView';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import SubscriptionView from './views/SubscriptionView';

const App: React.FC = () => {
  const [user, setUser] = useState<{ id: string; email: string; onboarded: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('meubarbeiro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={user ? <Navigate to="/admin" /> : <LoginView onLogin={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/onboarding" /> : <SignupView onSignup={setUser} />} />
        
        <Route path="/onboarding" element={user ? <OnboardingView user={user} onComplete={() => setUser({...user!, onboarded: true})} /> : <Navigate to="/signup" />} />
        <Route path="/subscription" element={user ? <SubscriptionView /> : <Navigate to="/login" />} />
        <Route path="/b/:slug" element={<PublicBookingView />} />

        <Route path="/admin" element={user ? (user.onboarded ? <AdminLayout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/onboarding" />) : <Navigate to="/login" />}>
          <Route index element={<DashboardView />} />
          <Route path="setup" element={<SetupView />} />
          <Route path="clients" element={<ClientsView />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
