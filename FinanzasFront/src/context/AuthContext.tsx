import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { actualizarUsuario } from "../services/api";

type User = {
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  numeroCelular: string;
  pais: string;
  fechaNacimiento?: string;
  modoOscuro?: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User> & { contrasena?: string }) => Promise<{ success: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar usuario guardado en localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Iniciar sesión
  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Actualizar datos del usuario (mejorada)
  const updateUser = async (
    updatedData: Partial<User> & { contrasena?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: "No hay usuario autenticado" };

    try {
      const updatedUser = await actualizarUsuario(user.idUsuario, updatedData, token);

      if (!updatedUser) {
        return { success: false, error: "No se pudo actualizar el usuario" };
      }

      // Actualizar el estado local y el localStorage
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true };
    } catch (error: any) {
      console.error("Error actualizando usuario:", error);
      return { success: false, error: error.message || "Error desconocido" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
