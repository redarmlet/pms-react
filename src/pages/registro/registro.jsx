import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { COMUNAS_SANTIAGO } from '../../data/datos';
import styles from './registro.module.css';

export default function Registro() {
  const { sesion, usuarios, guardarUsuario, esMayorDe50, esDuoc } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    nacimiento: '',
    correo: '',
    password: '',
    confirmar: '',
    comuna: '',
    calle: '',
    numero: '',
    codigo: ''
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    if (sesion) {
      navigate(sesion.tipo === 'admin' ? '/admin' : '/perfil');
    }
  }, [sesion, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const procesarRegistro = (e) => {
    e.preventDefault();
    const {
      nombre, apellido, nacimiento, correo, password,
      confirmar, comuna, calle, numero, codigo
    } = form;

    const c = correo.trim().toLowerCase();
    const cod = codigo.trim().toUpperCase();

    if (!nombre.trim() || !apellido.trim() || !nacimiento || !c || !password || !confirmar || !comuna || !calle.trim() || !numero.trim()) {
      setMensaje({ texto: 'Por favor completa todos los campos obligatorios.', tipo: 'error' });
      return;
    }

    if (password !== confirmar) {
      setMensaje({ texto: 'Las contraseñas no coinciden.', tipo: 'error' });
      return;
    }

    if (password.length < 6) {
      setMensaje({ texto: 'La contraseña debe tener al menos 6 caracteres.', tipo: 'error' });
      return;
    }

    if (cod && cod !== 'FELICES50') {
      setMensaje({ texto: 'El código de referencia no es válido.', tipo: 'error' });
      return;
    }

    if (usuarios.some(u => u.correo.toLowerCase() === c)) {
      setMensaje({ texto: 'Ya existe una cuenta con ese correo electrónico.', tipo: 'error' });
      return;
    }

    const nuevoUsuario = {
      id: 'USR' + Date.now(),
      tipo: 'cliente',
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      correo: c,
      password: password,
      fechaNacimiento: nacimiento,
      direccion: { comuna, calle: calle.trim(), numero: numero.trim() },
      codigoReferencia: cod,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    guardarUsuario(nuevoUsuario);

    const beneficios = [];
    if (esMayorDe50(nuevoUsuario)) beneficios.push('50% de descuento por ser mayor de 50 años');
    if (cod === 'FELICES50') beneficios.push('10% de descuento de por vida');
    if (esDuoc(nuevoUsuario)) beneficios.push('torta gratis en tu cumpleaños');

    let msj = '¡Cuenta creada con éxito!';
    if (beneficios.length) msj += ' Beneficios activados: ' + beneficios.join(', ') + '.';

    setMensaje({ texto: msj, tipo: 'exito' });
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <main>
      <div className={styles.authContenedor}>
        <div className={styles.authCard}>
          <h3 className={styles.authTitulo}>Crear cuenta</h3>
          <p className={styles.authSubtitulo}>Únete a Pastelería Mil Sabores</p>

          {mensaje.texto && (
            <div
              className={`${styles.authMensaje} ${
                mensaje.tipo === 'error' ? styles.authError : styles.authExito
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={procesarRegistro}>
            <p className={styles.authSeccionTitulo}>Datos personales</p>
            <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">person</i>
                <input
                  id="reg-nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-nombre" className={form.nombre ? 'active' : ''}>
                  Nombre
                </label>
              </div>
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">person_outline</i>
                <input
                  id="reg-apellido"
                  name="apellido"
                  type="text"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-apellido" className={form.apellido ? 'active' : ''}>
                  Apellido
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">cake</i>
                <input
                  id="reg-nacimiento"
                  name="nacimiento"
                  type="date"
                  value={form.nacimiento}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-nacimiento" className="active">
                  Fecha de nacimiento
                </label>
              </div>
            </div>

            <p className={styles.authSeccionTitulo}>Cuenta</p>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  id="reg-correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-correo" className={form.correo ? 'active' : ''}>
                  Correo electrónico
                </label>
                <span className="helper-text">
                  Usa tu correo @duocuc.cl para obtener beneficios de estudiante
                </span>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">lock</i>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-password" className={form.password ? 'active' : ''}>
                  Contraseña
                </label>
              </div>
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">lock_outline</i>
                <input
                  id="reg-confirmar"
                  name="confirmar"
                  type="password"
                  value={form.confirmar}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-confirmar" className={form.confirmar ? 'active' : ''}>
                  Confirmar contraseña
                </label>
              </div>
            </div>

            <p className={styles.authSeccionTitulo}>Dirección de entrega</p>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">location_city</i>
                <select
                  id="reg-comuna"
                  name="comuna"
                  value={form.comuna}
                  onChange={handleChange}
                  className={`browser-default ${styles.comunaSelect}`}
                  required
                >
                  <option value="" disabled>Selecciona una comuna</option>
                  {COMUNAS_SANTIAGO.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m8">
                <i className="material-icons prefix">home</i>
                <input
                  id="reg-calle"
                  name="calle"
                  type="text"
                  value={form.calle}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-calle" className={form.calle ? 'active' : ''}>
                  Calle
                </label>
              </div>
              <div className="input-field col s12 m4">
                <i className="material-icons prefix">tag</i>
                <input
                  id="reg-numero"
                  name="numero"
                  type="text"
                  value={form.numero}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="reg-numero" className={form.numero ? 'active' : ''}>
                  Número
                </label>
              </div>
            </div>

            <p className={styles.authSeccionTitulo}>
              Código de referencia <span className={styles.authOpcional}>(opcional)</span>
            </p>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">card_giftcard</i>
                <input
                  id="reg-codigo"
                  name="codigo"
                  type="text"
                  placeholder="Ej: FELICES50"
                  value={form.codigo}
                  onChange={handleChange}
                />
                <span className="helper-text">
                  Ingresa FELICES50 para obtener un 10% de descuento de por vida
                </span>
              </div>
            </div>

            <button type="submit" className={`btn ${styles.authBtn}`}>
              <i className="material-icons left">how_to_reg</i>Crear cuenta
            </button>
          </form>

          <p className={styles.authLinkTexto}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className={styles.authLink}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
