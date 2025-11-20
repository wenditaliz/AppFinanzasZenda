const BASE_URL = "http://localhost:4000/api"; //incluye /api directamente

// Registrar usuario
export const registrarUsuario = async (data: any) => {
  const res = await fetch(`${BASE_URL}/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al registrar usuario");
  return res.json();
};

// Login usuario
export const loginUsuario = async (data: { correoElectronico: string; contrasena: string }) => {
  const response = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al iniciar sesión");
  }

  const res = await response.json();
  return { user: res.usuario, token: res.token };
};

// Crear gasto
export const crearGasto = async (data: any, token: string) => {
  const res = await fetch(`${BASE_URL}/gastos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear gasto");
  return res.json();
};

// Listar gastos
export const listarGastos = async (token: string) => {
  const res = await fetch(`${BASE_URL}/gastos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Error al listar gastos");
  return res.json();
};

// Actualizar usuario (corregido)
export const actualizarUsuario = async (
  idUsuario: number, 
  updatedData: any,
  token: string
) => {
  try {
    const res = await fetch(`${BASE_URL}/usuarios/actualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Error al actualizar el usuario");

    const data = await res.json();
    return data.usuario; 
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return null;
  }
};

// Crear ingreso
export const crearIngreso = async (data: any, token: string) => {
  const res = await fetch(`${BASE_URL}/ingresos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear ingreso");
  return res.json();
};

// Listar ingresos
export const listarIngresos = async (token: string) => {
  const res = await fetch(`${BASE_URL}/ingresos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al listar ingresos");
  return res.json();
};
