import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './navbar.module.css';

export default function Navbar() {
  const { sesion, cerrarSesion } = useAuth();
  const { totalItems, abrirCarrito } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    cerrarSesion();
    setMenuAbierto(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navWrapper}>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            <img src="/img/logo01.webp" alt="Pastelería Mil Sabores" className={styles.logo} />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/nosotros" className={styles.navLink}>Nosotros</Link>
            </li>
            <li>
              <Link to="/blog" className={styles.navLink}>Blogs</Link>
            </li>
            <li>
              <Link to="/productos" className={styles.navLink}>Productos</Link>
            </li>
            <li>
              <a
                id="carrito-boton"
                className={`${styles.navLink} ${styles.carritoBoton}`}
                onClick={(e) => { e.preventDefault(); abrirCarrito(); }}
                role="button"
                aria-label="Abrir carrito"
              >
                <i className="material-icons">shopping_cart</i>
                {totalItems > 0 && (
                  <span id="carrito-contador" className={styles.carritoContador}>
                    {totalItems}
                  </span>
                )}
              </a>
            </li>

            {/* Auth section */}
            <li style={{ position: 'relative' }} ref={dropdownRef}>
              {sesion ? (
                <>
                  <a
                    className={`${styles.navUsuario}`}
                    onClick={(e) => { e.preventDefault(); setMenuAbierto(!menuAbierto); }}
                    role="button"
                  >
                    <i className="material-icons">account_circle</i>
                    <span>{sesion.nombre}</span>
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                  {menuAbierto && (
                    <ul className={styles.dropdownMenu}>
                      <li className={styles.dropdownItem}>
                        <Link
                          to={sesion.tipo === 'admin' ? '/admin' : '/perfil'}
                          onClick={() => setMenuAbierto(false)}
                        >
                          Panel
                        </Link>
                      </li>
                      <li className={styles.dropdownDivider}></li>
                      <li className={styles.dropdownItem}>
                        <a href="#!" onClick={handleLogout}>Cerrar Sesión</a>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <a
                    className={styles.navLink}
                    onClick={(e) => { e.preventDefault(); setMenuAbierto(!menuAbierto); }}
                    role="button"
                  >
                    Iniciar Sesión
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                  {menuAbierto && (
                    <ul className={styles.dropdownMenu}>
                      <li className={styles.dropdownItem}>
                        <Link to="/registro" onClick={() => setMenuAbierto(false)}>Registrarse</Link>
                      </li>
                      <li className={styles.dropdownDivider}></li>
                      <li className={styles.dropdownItem}>
                        <Link to="/login" onClick={() => setMenuAbierto(false)}>Iniciar Sesión</Link>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
