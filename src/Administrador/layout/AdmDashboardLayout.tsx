// src/components/ProtectAdmLayout.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

interface ProtectLayoutProps {
  children: React.ReactNode;
}


const ProtectAdmLayout: React.FC<ProtectLayoutProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decodifica apenas a segunda parte do JWT (o payload)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // @ts-ignore
    const decodedPayload = JSON.parse(atob(base64)); // Decodifica o payload


  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return <Navigate to="/login" />;
  }
  <Analytics />
  return <>{children}</>;
};


export default ProtectAdmLayout