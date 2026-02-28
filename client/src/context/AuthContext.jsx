import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../services/apiClient.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Au chargement de l'app, on tente de récupérer le profil si un token existe.
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    apiFetch("/auth/me", { token })
      .then((res) => setUser(res.data))
      .catch(() => {
        // Si le token est invalide, on nettoie la session locale.
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      });
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login(newToken, newUser) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
      },
      logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
