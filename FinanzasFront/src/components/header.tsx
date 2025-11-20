import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogIn, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); //redirige al Home tras cerrar sesión
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/img/zenda.png"
            alt="Logo ZENDA"
            className="h-9 w-9 rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide text-background">
            ZENDA
          </h1>
        </Link>

        <nav className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/register"
                className="flex items-center gap-2 border border-white/20 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-blue-600 transition"
              >
                <User className="h-5 w-5" />
                Registrarse
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 border border-white/20 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-blue-600 transition"
              >
                <LogIn className="h-5 w-5" />
                Iniciar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/configuracion"
                className="flex items-center gap-2 border border-white/20 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-blue-600 transition"
              >
                <Settings className="h-5 w-5" />
                Configuración
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-white/20 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-blue-600 transition"
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
