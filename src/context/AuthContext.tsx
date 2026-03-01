import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isNewUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    setIsNewUser(false);
    setUser({ name: email.split('@')[0], email, role: 'Professional' });
  };

  const register = async (name: string, email: string, _password: string, role: string) => {
    await new Promise(r => setTimeout(r, 800));
    setIsNewUser(true);
    setUser({ name, email, role });
  };

  const logout = () => { setUser(null); setIsNewUser(false); };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isNewUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
