import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/loginUsuario";
import Register from "./pages/registrarUsuario";
import Dashboard from "./pages/dashboard";
import ConfiguracionUsuario from "./pages/configuracionUsuario";
import Header from "./components/header";
import { Toaster } from "@/components/ui/sonner";


const App = () => {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuracion" element={<ConfiguracionUsuario />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
