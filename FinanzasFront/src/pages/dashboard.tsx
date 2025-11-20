import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { crearGasto, listarGastos, crearIngreso, listarIngresos } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalisisFinanzas from "../components/analisisFinanzas";


type FormGasto = {
  descripcion: string;
  monto: string;
  categoria: string;
};

type FormIngreso = {
  monto: string;
  origen: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [modoOscuro, setModoOscuro] = useState(false);
  const [gastos, setGastos] = useState<any[]>([]);
  const [ingresos, setIngresos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const [formGasto, setFormGasto] = useState<FormGasto>({
    descripcion: "",
    monto: "",
    categoria: "",
  });

  const [formIngreso, setFormIngreso] = useState<FormIngreso>({
    monto: "",
    origen: "",
  });

  useEffect(() => {
    const modoGuardado = localStorage.getItem("modoOscuroDashboard");
    if (modoGuardado) setModoOscuro(JSON.parse(modoGuardado));

    loadGastos();
    loadIngresos();
    loadCategorias();

    
  setTimeout(() => {
    console.log("GASTOS RECIBIDOS:", gastos);
    console.log("INGRESOS RECIBIDOS:", ingresos);
  }, 1000);

  }, []);

  const loadGastos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await listarGastos(token);
    setGastos(res || []);
  };

  const loadIngresos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await listarIngresos(token);
    setIngresos(res || []);
  };

  const loadCategorias = async () => {
    const res = await fetch("http://localhost:4000/api/categorias");
    const data = await res.json();
    setCategorias(data);
  };

  // ---- Manejo de formularios ----
  const handleGastoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormGasto({ ...formGasto, [e.target.name]: e.target.value });

  const handleIngresoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormIngreso({ ...formIngreso, [e.target.name]: e.target.value });

  const handleGastoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const gastoData = {
      nombreGasto: formGasto.descripcion,
      cantidadGasto: formGasto.monto,
      descripcionGasto: formGasto.descripcion,
      idCategoria: parseInt(formGasto.categoria),
    };

    try {
      const res = await crearGasto(gastoData, token);
      if (!res.error) {
        setFormGasto({ descripcion: "", monto: "", categoria: "" });
        loadGastos();
      }
    } catch {
      alert("Error al agregar gasto");
    }
  };

  const handleIngresoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const ingresoData = {
      cantidadIngreso: formIngreso.monto,
      origenIngreso: formIngreso.origen,
    };

    try {
      const res = await crearIngreso(ingresoData, token);
      if (!res.error) {
        setFormIngreso({ monto: "", origen: "" });
        loadIngresos();
      }
    } catch {
      alert("Error al agregar ingreso");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-4 transition-colors duration-300 ${
        modoOscuro
          ? "bg-[oklch(37.9%_0.146_265.522)] text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Botón de regresar al perfil */}
      <button
        onClick={() => navigate("/perfil")}
        className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          modoOscuro
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "bg-blue-100 hover:bg-blue-200 text-blue-800"
        }`}
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Bienvenido, {user?.nombreUsuario || "Usuario"}
        </h1>
        <p className={modoOscuro ? "text-white/70" : "text-gray-600"}>
          Gestiona tus ingresos y gastos fácilmente
        </p>
      </div>

      {/* Formularios lado a lado */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">

        {/* Formulario GASTOS */}
        <div
          className={`flex-1 min-w-[320px] p-6 rounded-2xl shadow-2xl transition-colors duration-300 ${
            modoOscuro
              ? "bg-white/10 backdrop-blur-md text-white"
              : "bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Registrar nuevo gasto
          </h2>

          <form onSubmit={handleGastoSubmit} className="space-y-4">
            <div>
              <label className="text-sm opacity-80">Descripción</label>
              <Input
                placeholder="Ej. Comida, transporte..."
                name="descripcion"
                value={formGasto.descripcion}
                onChange={handleGastoChange}
                className={modoOscuro ? "bg-white/20 text-white" : "bg-white text-gray-800"}
              />
            </div>

            <div>
              <label className="text-sm opacity-80">Monto</label>
              <Input
                placeholder="Monto del gasto"
                name="monto"
                value={formGasto.monto}
                onChange={handleGastoChange}
                className={modoOscuro ? "bg-white/20 text-white" : "bg-white text-gray-800"}
              />
            </div>

            <div>
              <label className="text-sm opacity-80">Categoría</label>
              <select
                name="categoria"
                value={formGasto.categoria}
                onChange={handleGastoChange}
                className={`w-full px-3 py-2 rounded-lg border appearance-none ${
                  modoOscuro
                    ? "bg-gray-800 text-gray-100 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categorias.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className={
                      modoOscuro
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-800"
                    }
                  >
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition-all ${
                modoOscuro
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Agregar gasto
            </Button>
          </form>
        </div>

        {/* Formulario INGRESOS */}
        <div
          className={`flex-1 min-w-[320px] p-6 rounded-2xl shadow-2xl transition-colors duration-300 ${
            modoOscuro
              ? "bg-white/10 backdrop-blur-md text-white"
              : "bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Registrar nuevo ingreso
          </h2>

          <form onSubmit={handleIngresoSubmit} className="space-y-4">
            <div>
              <label className="text-sm opacity-80">Monto</label>
              <Input
                placeholder="Cantidad recibida"
                name="monto"
                value={formIngreso.monto}
                onChange={handleIngresoChange}
                className={modoOscuro ? "bg-white/20 text-white" : "bg-white text-gray-800"}
              />
            </div>

            <div>
              <label className="text-sm opacity-80">Origen</label>
              <Input
                placeholder="Ej. Sueldo, venta, regalo..."
                name="origen"
                value={formIngreso.origen}
                onChange={handleIngresoChange}
                className={modoOscuro ? "bg-white/20 text-white" : "bg-white text-gray-800"}
              />
            </div>

            <Button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition-all ${
                modoOscuro
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Agregar ingreso
            </Button>
          </form>
        </div>
      </div>

      {/* Botón para mostrar análisis */}
      <div className="mt-10">
        <Button
          onClick={() => setMostrarAnalisis(!mostrarAnalisis)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
        >
          <BarChart3 size={18} />
          {mostrarAnalisis ? "Ocultar análisis" : "Ver análisis"}
        </Button>
      </div>

      {/* Contenedor del análisis */}
{mostrarAnalisis && (
  <div
    className={`mt-8 w-full max-w-4xl p-6 rounded-2xl shadow-2xl transition-all duration-500 
      ${modoOscuro
        ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
        : "bg-gradient-to-b from-indigo-200 via-indigo-100 to-indigo-50 text-gray-800"
      }`}
  >
    <h2 className="text-2xl font-bold mb-4 text-center">
      Análisis financiero
    </h2>

    {/* Componente de gráfica o análisis */}
    <AnalisisFinanzas gastos={gastos} ingresos={ingresos} modoOscuro={modoOscuro} />
  </div>
)}

    </div>
  );
  
};



export default Dashboard;
