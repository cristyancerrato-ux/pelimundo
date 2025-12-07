import React, { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import Lista from "../componentes/Lista";
import Buscador from "../componentes/Buscador/Buscador";
import "./Catalogo.css";

export default function Catalogo() {
  const { data, loading, error } = useFetch("/datos/peliculas.json");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(movie => {
      const title = (movie.title || "").toLowerCase();
      const genre = (movie.genre || "").toLowerCase();
      const year = String(movie.year || "");
      return title.includes(q) || genre.includes(q) || year.includes(q);
    });
  }, [data, query]);

  return (
    <main className="catalogo container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
        <h2 className="catalogo__title">Catálogo</h2>
        <div style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
          <Buscador onSearch={setQuery} />
        </div>
      </div>

      {loading && <p className="catalogo__status">Cargando películas...</p>}
      {error && <p className="catalogo__error">Error cargando películas.</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="catalogo__empty">No se encontraron películas para "{query}"</p>
      )}

      {filtered.length > 0 && <Lista items={filtered} />}
    </main>
  );
}
