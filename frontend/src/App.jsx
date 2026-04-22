import React, { useState, useEffect } from 'react';
import LandPage from './page/LandPage';
import AuthPage from './page/AuthPage';
import AdminDashboard from './page/AdminDashboard';
import VendorDashboard from './page/VendorDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    // Auto-login if token exists
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setCurrentPage(role === 'admin' ? 'admin' : 'vendor');
    }
  }, []);

  const handleNavigate = (mode) => {
    setAuthMode(mode);
    setCurrentPage('auth');
  };

  const handleLogin = (role) => {
    setCurrentPage(role === 'admin' ? 'admin' : 'vendor');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setCurrentPage('landing');
  };

  if (currentPage === 'auth') 
    return <AuthPage initialMode={authMode} onBack={() => setCurrentPage('landing')} onLogin={handleLogin} />;
  if (currentPage === 'admin') 
    return <AdminDashboard onLogout={handleLogout} />;
  if (currentPage === 'vendor') 
    return <VendorDashboard onLogout={handleLogout} />;

  return <LandPage onNavigate={handleNavigate} />;
}

export default App;
