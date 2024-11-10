import { createContext, useEffect, useState, ReactNode } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função de logout que remove o token e reseta o estado do usuário
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Você foi desconectado.');
  };

  // Verifica o token no localStorage na inicialização do componente
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decodifica o token e seta o usuário autenticado
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
