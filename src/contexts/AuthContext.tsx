
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '@/types';
import { employees } from '@/data/mockData';

interface AuthContextType {
  currentEmployee: Employee | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // For MVP, we'll auto-login the first employee on mount
  useEffect(() => {
    const storedEmployee = localStorage.getItem('currentEmployee');
    if (storedEmployee) {
      setCurrentEmployee(JSON.parse(storedEmployee));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login for MVP
    // This would be replaced with a real authentication call
    const employee = employees.find(e => e.email.toLowerCase() === email.toLowerCase());
    
    if (employee) {
      setCurrentEmployee(employee);
      setIsAuthenticated(true);
      localStorage.setItem('currentEmployee', JSON.stringify(employee));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentEmployee(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentEmployee');
  };

  return (
    <AuthContext.Provider value={{ currentEmployee, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
