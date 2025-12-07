import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";

export default function Detalle() {
  const { id } = useParams();
  const { data } = useFetch("/datos/peliculas.json");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!data) return <p>Cargando…</p>;

  const movie = data.find(m => m.id === id);
  if (!movie) return <p>Película no encontrada</p>;

  const price = movie.price ?? 3.99;

  function handleAdd() {
    addItem({ id: movie.id, title: movie.title, poster: movie.poster, price }, Number(qty));
  }

  return (
    <div className="detalle container">
      <img src={movie.poster} className="detalle__img" alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Precio: ${price}</p>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} style={{width:80,padding:6}} />
        <button onClick={handleAdd}>Agregar al carrito</button>
      </div>
    </div>
  );
}
