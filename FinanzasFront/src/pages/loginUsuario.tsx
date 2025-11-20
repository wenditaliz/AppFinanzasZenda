import React, { useState } from "react";
import { loginUsuario } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Eye, EyeOff } from "lucide-react";

const LoginUsuario = () => {
  const [form, setForm] = useState({ correoElectronico: "", contrasena: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUsuario(form);
      if (res.token && res.user) {
        login(res.user, res.token); 
        navigate("/dashboard");
      } else {
        alert("Error al iniciar sesión. Revisa tus credenciales.");
      }
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
 };


  return (
    // Fondo blanco general
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Contenedor azul degradado */}
      <div className="bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Título con ícono */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <LogIn className="h-7 w-7 text-white" />
          <h1 className="text-3xl font-bold text-white text-center">
            Iniciar sesión
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">
              Correo electrónico
            </label>
            <Input
              placeholder="correo@ejemplo.com"
              name="correoElectronico"
              onChange={handleChange}
              type="email"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg px-3 py-2 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">
              Contraseña
            </label>
            <div className="relative">
              <input
                placeholder="********"
                name="contrasena"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-white focus:outline-none pr-10 [&::-ms-reveal]:hidden [&::-webkit-textfield-decoration-container]:hidden"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/80 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botón de inicio de sesión con degradado */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 hover:scale-105 transition-all duration-300"
          >
            Entrar
          </Button>
        </form>

        {/* Enlace inferior */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/90 mb-1">
            ¿No tienes una cuenta?
          </p>
          <Link
            to="/register"
            className="inline-block mt-1 text-white font-semibold underline hover:text-blue-200 transition"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUsuario;
