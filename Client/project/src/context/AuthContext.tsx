import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
  username: string;
  interests?: string[];
  age?: number;
  gender?: string;
  customFeed?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (userData: User & { password: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('clothic_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const storedUsers = localStorage.getItem('clothic_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userData } = foundUser;
        setUser(userData);
        localStorage.setItem('clothic_user', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const signup = (userData: User & { password: string }) => {
    const storedUsers = localStorage.getItem('clothic_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const { password, ...userWithoutPassword } = userData;
    users.push(userData);
    localStorage.setItem('clothic_users', JSON.stringify(users));
    
    setUser(userWithoutPassword);
    localStorage.setItem('clothic_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clothic_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


