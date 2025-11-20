import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Swal from "sweetalert2";

const ConfiguracionUsuario = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [pais, setPais] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  // Cargar datos del usuario logeado
  useEffect(() => {
    if (user) {
      setNombreUsuario(user.nombreUsuario || "");
      setApellidoUsuario(user.apellidoUsuario || "");
      setCorreoElectronico(user.correoElectronico || "");
      setNumeroCelular(user.numeroCelular || "");
      setPais(user.pais || "");
      setFechaNacimiento(
        user.fechaNacimiento
          ? new Date(user.fechaNacimiento).toISOString().split("T")[0]
          : ""
      );
    }

    // Cargar preferencia local del modo oscuro (solo para dashboard y configuración)
    const modoGuardado = localStorage.getItem("modoOscuroDashboard");
    if (modoGuardado) setModoOscuro(JSON.parse(modoGuardado));
  }, [user]);

  // Aplicar modo oscuro solo al contenedor local (no a toda la app)
  const contenedorClass = modoOscuro
    ? "bg-[oklch(37.9%_0.146_265.522)] text-white"
    : "bg-gray-100 text-gray-800";

  const tarjetaClass = modoOscuro
    ? "bg-white/10 backdrop-blur-md text-white"
    : "bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white";

  // Cambiar modo oscuro (solo local y en dashboard)
  const handleToggleModoOscuro = () => {
    const nuevoModo = !modoOscuro;
    setModoOscuro(nuevoModo);
    localStorage.setItem("modoOscuroDashboard", JSON.stringify(nuevoModo));
  };

  // Guardar cambios del usuario (sin tocar modoOscuro)
  const handleGuardar = async (e: React.FormEvent) => {
  e.preventDefault();

  const updatedUser = {
    ...user,
    nombreUsuario,
    apellidoUsuario,
    correoElectronico,
    numeroCelular,
    pais,
    fechaNacimiento,
    ...(nuevaContrasena ? { contrasena: nuevaContrasena } : {}),
  };

  try {
    const response = await updateUser(updatedUser);

    // Si no hay error, asumimos éxito
    if (!response?.error) {
      Swal.fire({
        icon: "success",
        title: "Datos actualizados correctamente",
        confirmButtonColor: "#2563eb",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar datos",
        text: response.error || "No se pudo guardar los cambios",
      });
    }
  } catch (error) {
    console.error("Error al guardar:", error);
    Swal.fire({
      icon: "error",
      title: "Ocurrió un error al guardar los datos",
      text: "Revisa tu conexión o intenta más tarde.",
    });
  }
};


  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 py-16 transition-colors duration-300 ${contenedorClass}`}
    >
      <div className="flex items-start justify-center gap-8 w-full max-w-4xl">
        {/* Botón Volver al perfil */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm font-medium transition mt-4 ${
            modoOscuro
              ? "bg-white/10 text-white/90 hover:bg-white/20"
              : "bg-white/70 text-blue-800 hover:bg-white/90"
          }`}
        >
          <ArrowLeft size={18} />
          Volver a mi perfil
        </button>

        {/* Formulario */}
        <div className={`flex-1 p-8 rounded-2xl shadow-2xl ${tarjetaClass}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Configuración de Usuario
          </h2>

          <form onSubmit={handleGuardar} className="space-y-5">
            {[
              { label: "Nombre", value: nombreUsuario, setValue: setNombreUsuario },
              { label: "Apellido", value: apellidoUsuario, setValue: setApellidoUsuario },
              { label: "Correo electrónico", value: correoElectronico, setValue: setCorreoElectronico },
              { label: "Número celular", value: numeroCelular, setValue: setNumeroCelular },
              { label: "País", value: pais, setValue: setPais },
            ].map((campo, i) => (
              <div key={i}>
                <Label className="block text-sm font-medium mb-1 text-white/90">
                  {campo.label}
                </Label>
                <Input
                  type="text"
                  value={campo.value}
                  onChange={(e) => campo.setValue(e.target.value)}
                  className="border border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            ))}

            <div>
              <Label className="block text-sm font-medium mb-1 text-white/90">
                Fecha de nacimiento
              </Label>
              <Input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="border border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1 text-white/90">
                Nueva contraseña (opcional)
              </Label>
              <Input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="border border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>

            {/* Modo oscuro local */}
            <div className="flex items-center justify-between mt-6">
              <Label
                htmlFor="modoOscuro"
                className={`font-medium ${modoOscuro ? "text-white" : "text-white/90"}`}
              >
                Modo oscuro (solo panel del usuario)
              </Label>
              <Switch id="modoOscuro" checked={modoOscuro} onCheckedChange={handleToggleModoOscuro} />
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              Guardar cambios
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionUsuario;
