import { createContext, useEffect, useState, ReactNode } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: string;
  nome: string;
  email: string;
  // adicione os campos necessários
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},  
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Você foi desconectado.');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decodifica o payload do token JWT (base64)
        const base64Payload = token.split('.')[1];
        const jsonPayload = atob(base64Payload);
        const decodedToken = JSON.parse(jsonPayload) as User;

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
