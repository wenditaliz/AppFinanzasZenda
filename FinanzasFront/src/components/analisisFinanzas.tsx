import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  gastos: any[];
  ingresos: any[];
  modoOscuro: boolean;
};

const AnalisisFinanzas = ({ gastos, ingresos, modoOscuro }: Props) => {
  const [periodo, setPeriodo] = useState<"semanal" | "mensual">("mensual");
  const [mostrarLista, setMostrarLista] = useState(false);

  const hoy = new Date();

  const filtrarPorPeriodo = (items: any[]) => {
    return items.filter((item) => {
      const fecha = new Date(
  item.fechaGasto ||
  item.fechaIngreso ||
  item.fechaRecibido ||   // <- tu tabla sí usa este nombre
  item.fechagasto ||
  item.fechaingreso
);

      if (periodo === "semanal") {
        const hace7dias = new Date();
        hace7dias.setDate(hoy.getDate() - 7);
        return fecha >= hace7dias && fecha <= hoy;
      }

      if (periodo === "mensual") {
        return (
          fecha.getMonth() === hoy.getMonth() &&
          fecha.getFullYear() === hoy.getFullYear()
        );
      }

      return true;
    });
  };

  const gastosFiltrados = useMemo(
    () => filtrarPorPeriodo(gastos),
    [gastos, periodo]
  );
  const ingresosFiltrados = useMemo(
    () => filtrarPorPeriodo(ingresos),
    [ingresos, periodo]
  );

  const totalIngresos = ingresosFiltrados.reduce(
    (acc, item) => acc + Number(item.cantidadIngreso || item.cantidadingreso),
    0
  );

  const totalGastos = gastosFiltrados.reduce(
    (acc, item) => acc + Number(item.cantidadGasto || item.cantidadgasto),
    0
  );

  const data = [
    { name: "Ingresos", value: totalIngresos },
    { name: "Gastos", value: totalGastos },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="w-full">
      {/* Selector de periodo */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setPeriodo("semanal")}
          className={`px-4 py-2 rounded-xl font-semibold transition 
            ${
              periodo === "semanal"
                ? "bg-indigo-500 text-white"
                : modoOscuro
                ? "bg-white/20 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
        >
          Semanal
        </button>

        <button
          onClick={() => setPeriodo("mensual")}
          className={`px-4 py-2 rounded-xl font-semibold transition
            ${
              periodo === "mensual"
                ? "bg-indigo-500 text-white"
                : modoOscuro
                ? "bg-white/20 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
        >
          Mensual
        </button>
      </div>

      {/* Gráfica circular */}
      <div className="w-full h-80 flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: modoOscuro ? "#1e1e1e" : "#ffffff",
                borderRadius: "10px",
                border: modoOscuro ? "1px solid #555" : "1px solid #ddd",
              }}
            />

            <Legend
              wrapperStyle={{
                color: modoOscuro ? "white" : "#333",
                fontSize: "14px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Totales */}
      <p className="text-center mt-4 font-semibold">
        Total ingresos: ${totalIngresos.toFixed(2)}
        <br />
        Total gastos: ${totalGastos.toFixed(2)}
      </p>

      {/* Botón mostrar/ocultar lista */}
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => setMostrarLista(!mostrarLista)}
          className={`px-4 py-2 rounded-xl font-semibold 
            ${
              modoOscuro
                ? "bg-indigo-600 text-white"
                : "bg-indigo-500 text-white"
            }`}
        >
          {mostrarLista ? "Ocultar detalles" : "Ver detalles"}
        </button>
      </div>

      {/* Lista ingresos + gastos */}
      {mostrarLista && (
        <div className="mt-6 w-full px-4">
          {/* Ingresos */}
          <h3
            className={`text-lg font-bold mb-2 ${
              modoOscuro ? "text-green-400" : "text-green-700"
            }`}
          >
            Ingresos
          </h3>

          {ingresosFiltrados.length === 0 ? (
            <p>No hay ingresos en este periodo.</p>
          ) : (
            <ul className="space-y-2">
              {ingresosFiltrados.map((ing, i) => (
                <li
                  key={i}
                  className={`p-3 rounded-lg shadow 
                    ${
                      modoOscuro
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                >
                  <p><strong>Cantidad:</strong> ${ing.cantidadIngreso || ing.cantidadingreso}</p>
                  <p><strong>Fecha:</strong> {new Date(ing.fechaIngreso || ing.fechaingreso).toLocaleDateString()}</p>
                  <p><strong>Descripción:</strong> {ing.descripcionIngreso || ing.descripcioningreso}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Gastos */}
          <h3
            className={`text-lg font-bold mt-6 mb-2 ${
              modoOscuro ? "text-red-400" : "text-red-700"
            }`}
          >
            Gastos
          </h3>

          {gastosFiltrados.length === 0 ? (
            <p>No hay gastos en este periodo.</p>
          ) : (
            <ul className="space-y-2">
              {gastosFiltrados.map((gasto, i) => (
                <li
                  key={i}
                  className={`p-3 rounded-lg shadow 
                    ${
                      modoOscuro
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                >
                  <p><strong>Cantidad:</strong> ${gasto.cantidadGasto || gasto.cantidadgasto}</p>
                  <p><strong>Fecha:</strong> {new Date(gasto.fechaGasto || gasto.fechagasto).toLocaleDateString()}</p>
                  <p><strong>Descripción:</strong> {gasto.descripcionGasto || gasto.descripciongasto}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalisisFinanzas;
