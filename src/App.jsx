import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Favoritos from "./pages/Favoritos";
import Carrito from "./pages/Carrito";
import RequireAuth from "./componentes/RequireAuth";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<RequireAuth><Catalogo /></RequireAuth>} />
          <Route path="/favoritos" element={<RequireAuth><Favoritos /></RequireAuth>} />
          <Route path="/carrito" element={<RequireAuth><Carrito /></RequireAuth>} />
          <Route path="/pelicula/:id" element={<Detalle />} />
          <Route path="*" element={<div style={{color:"white"}}>Página no encontrada</div>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
