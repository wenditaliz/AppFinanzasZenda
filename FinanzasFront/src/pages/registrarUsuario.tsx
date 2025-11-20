import { useState } from "react";
import { registrarUsuario } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { UserPlus } from "lucide-react";

export default function RegistrarUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoElectronico: "",
    contrasena: "",
    numeroCelular: "",
    pais: "",
  });

  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>();
  const [errores, setErrores] = useState<string[]>([]);

  const mostrarErrores = errores.length > 0;

  const handleChange = (e: any) => {
    let value = e.target.value;

    if (e.target.name === "nombreUsuario" || e.target.name === "apellidoUsuario") {
      value = value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúñÑ ]/g, "");
    }

    if (e.target.name === "numeroCelular") {
      value = value.replace(/\D/g, "").substring(0, 10);
    }

    setForm({ ...form, [e.target.name]: value });
  };

  const validarFormulario = () => {
    const erroresTemp: string[] = [];

    if (!form.nombreUsuario.trim()) erroresTemp.push("El nombre es obligatorio.");
    if (!form.apellidoUsuario.trim()) erroresTemp.push("El apellido es obligatorio.");

    const regexCorreo = /\S+@\S+\.\S+/;
    if (!regexCorreo.test(form.correoElectronico))
      erroresTemp.push("Correo electrónico no válido.");

    const regexContrasena = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(form.contrasena))
      erroresTemp.push("La contraseña debe tener 8 caracteres, una mayúscula y un número.");

    if (!fechaNacimiento) {
      erroresTemp.push("Selecciona tu fecha de nacimiento.");
    } else {
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      if (edad < 10) erroresTemp.push("Debes tener mínimo 10 años.");
    }

    if (form.numeroCelular.length !== 10)
      erroresTemp.push("El número debe tener exactamente 10 dígitos.");

    if (!form.pais.trim()) erroresTemp.push("El país es obligatorio.");

    setErrores(erroresTemp);
    return erroresTemp.length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await registrarUsuario({
        ...form,
        fechaNacimiento: fechaNacimiento
          ? format(fechaNacimiento, "yyyy-MM-dd")
          : null,
      });
      navigate("/login");
    } catch (err) {
      setErrores(["Error al registrar usuario."]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">

      {/* TARJETA FLOTANTE DE ERRORES con botón de cierre */}
    {mostrarErrores && (
      <Card className="absolute top-6 z-50 bg-red-100 border border-red-300 w-full max-w-lg p-4 shadow-xl animate-in fade-in slide-in-from-top-3 rounded-xl">
        <div className="flex justify-between items-start">
          <h2 className="text-red-800 font-semibold text-lg">Revisa los siguientes errores:</h2>

          {/* BOTÓN PARA CERRAR */}
          <button
            onClick={() => setErrores([])}
            className="text-red-600 hover:text-red-800 transition"
          >
            ✕
          </button>
        </div>

        <ul className="mt-3 space-y-1">
          {errores.map((err, i) => (
            <li
              key={i}
              className="text-red-700 bg-red-200/60 px-3 py-1 rounded-md text-sm border border-red-300"
            >
              {err}
            </li>
          ))}
        </ul>
      </Card>
      )}

      {/* Contenedor azul igual al login */}
      <div className="bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        {/* Título con icono */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <UserPlus className="h-7 w-7 text-white" />
          <h1 className="text-3xl font-bold text-white text-center">
            Crear cuenta
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre */}
          <div>
            <Label className="text-white/90">Nombre</Label>
            <Input
              name="nombreUsuario"
              value={form.nombreUsuario}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* Apellidos */}
          <div>
            <Label className="text-white/90">Apellidos</Label>
            <Input
              name="apellidoUsuario"
              value={form.apellidoUsuario}
              onChange={handleChange}
              placeholder="Tus apellidos"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* Fecha nacimiento */}
          <div>
            <Label className="text-white/90">Fecha de nacimiento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full bg-white/20 border border-white/30 text-white text-left px-3 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  {fechaNacimiento
                    ? format(fechaNacimiento, "dd/MM/yyyy")
                    : "Seleccionar fecha"}
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="center"
                className="bg-white text-black shadow-xl rounded-xl mt-2 p-2 border"
              >
                <Calendar
                  mode="single"
                  selected={fechaNacimiento}
                  onSelect={setFechaNacimiento}
                  captionLayout="dropdown"
                  fromYear={1940}
                  toYear={2025}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Teléfono */}
          <div>
            <Label className="text-white/90">Número celular</Label>
            <Input
              name="numeroCelular"
              value={form.numeroCelular}
              onChange={handleChange}
              placeholder="10 dígitos"
              maxLength={10}
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* País */}
          <div>
            <Label className="text-white/90">País</Label>
            <Input
              name="pais"
              value={form.pais}
              onChange={handleChange}
              placeholder="México"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* Correo */}
          <div>
            <Label className="text-white/90">Correo electrónico</Label>
            <Input
              type="email"
              name="correoElectronico"
              value={form.correoElectronico}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* Contraseña */}
          <div>
            <Label className="text-white/90">Contraseña</Label>
            <Input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="••••••••"
              className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg"
            />
          </div>

          {/* Botón igual al login */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 hover:scale-105 transition-all duration-300"
          >
            Registrarme
          </Button>
        </form>

        {/* Enlace a login */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/90">¿Ya tienes una cuenta?</p>
          <Link
            to="/login"
            className="inline-block mt-1 text-white font-semibold underline hover:text-blue-100 transition"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
