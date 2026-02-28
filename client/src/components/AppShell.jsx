import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import styles from "./AppShell.module.css";

export function AppShell() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            Numérique Responsable
          </Link>
          <nav className={styles.nav}>
            <button
              type="button"
              aria-label="Basculer le theme"
              className={`${styles.themeSwitch} ${isDark ? styles.themeSwitchDark : styles.themeSwitchLight}`}
              onClick={toggleTheme}
            >
              <span className={styles.switchTrack} aria-hidden="true">
                <span className={styles.switchThumb} />
              </span>
              <span className={styles.switchLabel}>
                {isDark ? "Mode sombre" : "Mode clair"}
              </span>
            </button>
            <NavLink to="/structures" className={styles.link}>
              Structures
            </NavLink>
            <NavLink to="/jeunes" className={styles.link}>
              Jeunes
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={styles.link}>
                  Connexion
                </NavLink>
                <NavLink to="/register" className={styles.link}>
                  Inscription
                </NavLink>
              </>
            ) : (
              <button type="button" className={styles.logout} onClick={logout}>
                {user?.pseudo || user?.email} | Déconnexion
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
