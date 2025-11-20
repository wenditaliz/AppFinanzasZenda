import React, { useEffect } from "react";
import { PieChart, Shield, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { CarouselZenda } from "@/components/CarouselZenda";
import { useAuth } from "../context/AuthContext"; 

const Home = () => {
  const { logout } = useAuth(); 

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="text-foreground">
      {/* Sección Hero */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-primary-foreground">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Bienvenido a ZENDA</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto text-primary-foreground/90">
          "Organiza tus finanzas para desorganizar tus preocupaciones."
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="border border-background bg-background/10 text-background font-semibold px-6 py-3 rounded-lg shadow hover:bg-background hover:text-primary transition"
          >
            Crear cuenta
          </Link>
          <Link
            to="/login"
            className="border border-background font-semibold px-6 py-3 rounded-lg hover:bg-background hover:text-primary transition"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <CarouselZenda />

      {/* Sección de beneficios */}
      <section className="py-16 px-6 bg-background">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          ¿Por qué usar ZENDA?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="text-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            <PieChart className="mx-auto h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visualiza tus gastos</h3>
            <p className="text-white/90 text-sm">
              Gráficas claras y personalizables para entender tus finanzas en segundos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            <TrendingUp className="mx-auto h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ahorra con propósito</h3>
            <p className="text-white/90 text-sm">
              Crea metas financieras y sigue tu progreso mes a mes con facilidad.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            <Shield className="mx-auto h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seguridad total</h3>
            <p className="text-white/90 text-sm">
              Tus datos están protegidos con autenticación segura y cifrado moderno.
            </p>
          </div>

          {/* Card 4 */}
          <div className="text-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            <Smartphone className="mx-auto h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Accede desde cualquier lugar</h3>
            <p className="text-white/90 text-sm">
              Usa ZENDA desde tu computadora, tableta o celular sin perder tus datos.
            </p>
          </div>
        </div>
      </section>

      {/* Sección final CTA */}
      <section className="py-16 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold mb-4">
          Comienza tu camino hacia la libertad financiera
        </h2>
        <p className="mb-8 text-primary-foreground/90">
          Regístrate gratis y empieza a tomar control de tus finanzas hoy.
        </p>
        <Link
          to="/register"
          className="border border-background bg-background/10 text-background px-8 py-3 font-semibold rounded-lg shadow hover:bg-background hover:text-primary transition"
        >
          Crear cuenta ahora
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background text-center py-6 text-sm">
        © {new Date().getFullYear()} ZENDA — Crea el equilibrio entre tus finanzas y tu bienestar. BY: @weeen_liz
      </footer>
    </div>
  );
};

export default Home;
