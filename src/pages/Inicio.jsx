import React from "react";
import Slider from "../componentes/Slider";

export default function Inicio() {
  const imagenes = [
    "/imagenes/Avatar.jpg",
    "/imagenes/Asesino.jpg",
    "/imagenes/Stranger_Things.png"
  ];

  return (
    <section className="inicio">
      <Slider imagenes={imagenes} />
    </section>
  );
}
