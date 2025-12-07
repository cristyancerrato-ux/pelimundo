import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(correo, clave);
  }

  return (
    <div className="login">
      <div className="login__box">
        <h2 className="login__title">Iniciar sesión</h2>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={e => setClave(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
