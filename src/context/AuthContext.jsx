import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("peli_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function login({ email }) {
    const u = { name: "Salir", email };
    setUser(u);
    localStorage.setItem("peli_user", JSON.stringify(u));
    return Promise.resolve(u);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("peli_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
