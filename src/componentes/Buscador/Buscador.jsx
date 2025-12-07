import React, { useEffect, useState } from "react";
import "./Buscador.css";

export default function Buscador({ onSearch, placeholder = "Buscar películas, géneros..." , delay = 350 }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(value.trim());
    }, delay);
    return () => clearTimeout(t);
  }, [value, onSearch, delay]);

  function clear() {
    setValue("");
    onSearch("");
  }

  return (
    <div className="buscador">
      <input
        className="buscador__input"
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar"
      />
      {value ? (
        <button className="buscador__clear" onClick={clear} aria-label="Limpiar búsqueda">×</button>
      ) : (
        <span className="buscador__icon" aria-hidden>🔍</span>
      )}
    </div>
  );
}
