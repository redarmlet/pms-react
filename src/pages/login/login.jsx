import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './login.module.css';

export default function Login() {
  const { sesion, usuarios, iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    if (sesion) {
      navigate(sesion.tipo === 'admin' ? '/admin' : '/perfil');
    }
  }, [sesion, navigate]);

  const procesarLogin = (e) => {
    if (e) e.preventDefault();
    const c = correo.trim().toLowerCase();
    if (!c || !password) {
      setMensaje({ texto: 'Completa todos los campos.', tipo: 'error' });
      return;
    }

    const usuario = usuarios.find(u => u.correo.toLowerCase() === c && u.password === password);
    if (!usuario) {
      setMensaje({ texto: 'Correo o contraseña incorrectos.', tipo: 'error' });
      return;
    }

    iniciarSesion(usuario);
    const redirect = sessionStorage.getItem('pms_redirect');
    if (redirect) {
      sessionStorage.removeItem('pms_redirect');
      navigate(redirect);
    } else {
      navigate(usuario.tipo === 'admin' ? '/admin' : '/perfil');
    }
  };

  return (
    <main>
      <div className={styles.authContenedor}>
        <div className={styles.authCard}>
          <h3 className={styles.authTitulo}>Bienvenido/a</h3>
          <p className={styles.authSubtitulo}>Ingresa a tu cuenta</p>

          {mensaje.texto && (
            <div
              className={`${styles.authMensaje} ${
                mensaje.tipo === 'error' ? styles.authError : styles.authExito
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={procesarLogin}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  id="login-correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label htmlFor="login-correo" className={correo ? 'active' : ''}>
                  Correo electrónico
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="login-password" className={password ? 'active' : ''}>
                  Contraseña
                </label>
              </div>
            </div>

            <button type="submit" className={`btn ${styles.authBtn}`}>
              <i className="material-icons left">login</i>Ingresar
            </button>
          </form>

          <p className={styles.authLinkTexto}>
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className={styles.authLink}>
              Regístrate
            </Link>
          </p>

          <div className={styles.authCuentasPrueba}>
            <p><strong>Cuentas de prueba</strong></p>
            <p>Admin: admin@milsabores.cl — admin1234</p>
            <p>Cliente: maria@ejemplo.cl — cliente123</p>
            <p>Duoc: pedro.ramirez@duocuc.cl — duoc2024</p>
          </div>
        </div>
      </div>
    </main>
  );
}
