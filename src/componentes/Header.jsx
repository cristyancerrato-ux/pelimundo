import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; 
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart(); 
  const navigate = useNavigate();

  function handleAuthClick() {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="header">
      <div className="header__inner">
        
        <NavLink to="/" className="header__logo">
          PeliMundo
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>

          <NavLink to="/carrito" className="header__cart">
            <span className="header__cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="header__cart-count">{totalItems}</span>
            )}
          </NavLink>
        </nav>

        <button className="header__login-btn" onClick={handleAuthClick}>
          {user ? user.name : "Iniciar sesión"}
        </button>

      </div>
    </header>
  );
}
