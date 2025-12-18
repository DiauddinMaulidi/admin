import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Cek keberadaan token di Local Storage
  const token = localStorage.getItem('token');

  // Jika token ada, izinkan rute anak (Outlet) untuk dirender
  // Jika token tidak ada, arahkan paksa ke halaman login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;