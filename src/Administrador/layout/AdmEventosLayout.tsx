import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectLayoutProps {
    children: React.ReactNode;
  }

const ProtectAdmEventosLayout: React.FC<ProtectLayoutProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado para controle de autenticação
    const [isAuthorized, setIsAuthorized] = useState(true); // Estado para controle de autorização
  
    useEffect(() => {
      if (!token) {
        setIsAuthenticated(false); // Se não há token, não está autenticado
        return;
      }
  
      try {
        // Decodifica apenas a segunda parte do JWT (o payload)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64)); // Decodifica o payload
  
        if (decodedPayload.tipo !== 'ADMEVENTOS' && decodedPayload.tipo !== 'ADMGERAL' && decodedPayload.tipo !== 'ADMEVENTOS_E_CONTEUDOS' && decodedPayload.tipo !== 'ADMEVENTOS_CONTEUDOS_E_LITURGIA' && decodedPayload.tipo !== 'ADMEVENTOS_E_LITURGIA') {
          setShowModal(true); // Exibe o modal se não for 'ADMGERAL'
          setIsAuthorized(false); // Define que o usuário não tem permissão
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setIsAuthenticated(false); // Se o token é inválido, não está autenticado
      }
    }, [token]);
  
    // Redireciona para login se não estiver autenticado
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    // Se o usuário não tem permissão e o modal foi fechado, redireciona para o login
    if (!isAuthorized && !showModal) {
      return <Navigate to="/dashboard" />;
    }
  
    return (
      <>
        {/* Só renderiza as children se o usuário for autorizado */}
        {isAuthorized && children}
  
        {/* Exibe o modal caso o estado showModal seja true */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Acesso negado</h2>
              <p>Essa rota é protegida e somente administradores de evento podem ter acesso a ela.</p>
              <button
                onClick={() => setShowModal(false)} // Fecha o modal ao clicar no botão
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  export default ProtectAdmEventosLayout