
"use client";
import React from 'react';
import LoginView from '../../views/LoginView';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const setUser = (user: any) => {
    localStorage.setItem('meubarbeiro_user', JSON.stringify({...user, onboarded: true}));
    window.location.href = '/admin';
  };
  return <LoginView onLogin={setUser} />;
}
