import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Card({ movie }) {
  const { addItem } = useCart();
  const price = movie.price ?? movie.priceUSD ?? 3.99;

  function handleAdd(e) {
    e.preventDefault();
    addItem({ id: movie.id, title: movie.title, poster: movie.poster, price });
  }

  return (
    <Link to={`/pelicula/${movie.id}`} className="card" onClick={(e) => {}}>
      <div style={{position:'relative'}}>
        <img src={movie.poster} className="card__img" alt={movie.title} />
        <button className="card__add" onClick={handleAdd} aria-label="Agregar al carrito">Añadir</button>
      </div>
      <h3 className="card__title">{movie.title}</h3>
      <p className="card__meta">{movie.year} · {movie.genre} · ${price}</p>
    </Link>
  );
}
