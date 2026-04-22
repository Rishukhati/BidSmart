import React, { useState } from 'react';
import LandPage from './page/LandPage';
import AuthPage from './page/AuthPage';
import AdminDashboard from './page/AdminDashboard';
import VendorDashboard from './page/VendorDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');

  const handleNavigate = (mode) => {
    setAuthMode(mode);
    setCurrentPage('auth');
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  const handleLogin = (role) => {
    if (role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('vendor'); 
    }
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'auth') {
    return <AuthPage initialMode={authMode} onBack={handleBack} onLogin={handleLogin} />;
  }

  if (currentPage === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'vendor') {
    return <VendorDashboard onLogout={handleLogout} />;
  }

  return (
    <LandPage onNavigate={handleNavigate} />
  );
}

export default App;
