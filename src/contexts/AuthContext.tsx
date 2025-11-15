import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "user" | "admin") => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string, role: "user" | "admin"): boolean => {
    // Simulate authentication
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const userSession: User = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role as "user" | "admin" };
      setUser(userSession);
      localStorage.setItem("currentUser", JSON.stringify(userSession));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }

    // Demo credentials
    if (role === "admin" && email === "admin@grievance.com" && password === "admin123") {
      const adminUser: User = { id: "admin-1", name: "Admin User", email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      toast.success("Welcome, Admin!");
      return true;
    }

    if (role === "user" && email === "user@example.com" && password === "user123") {
      const demoUser: User = { id: "user-1", name: "Demo User", email, role: "user" };
      setUser(demoUser);
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
      toast.success("Welcome back!");
      return true;
    }

    toast.error("Invalid credentials");
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      toast.error("Email already registered");
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email, role: "user" as const };
    setUser(userSession);
    localStorage.setItem("currentUser", JSON.stringify(userSession));
    
    toast.success("Registration successful!");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
