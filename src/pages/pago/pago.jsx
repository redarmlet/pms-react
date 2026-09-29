import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { COMUNAS_SANTIAGO } from '../../data/datos';
import styles from './pago.module.css';

export default function Pago() {
  const { sesion, usuarios, guardarUsuario, iniciarSesion, guardarCompra, obtenerDescuento } = useAuth();
  const { carrito, limpiarCarrito, precioANumero } = useCart();
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);

  // Invitado
  const [invitado, setInvitado] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    nacimiento: '',
    password: '',
    confirmar: ''
  });

  // Dirección
  const [usarGuardada, setUsarGuardada] = useState(!!sesion);
  const [dirNueva, setDirNueva] = useState({
    comuna: '',
    calle: '',
    numero: ''
  });

  // Fecha y código
  const [fechaEnvio, setFechaEnvio] = useState(() => {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return manana.toISOString().split('T')[0];
  });
  const [codigoInput, setCodigoInput] = useState('');
  const [codigoMensaje, setCodigoMensaje] = useState({ texto: '', tipo: '' });

  // Descuento
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
  const [descuentoDesc, setDescuentoDesc] = useState('');

  // Tarjeta
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    nombre: '',
    vence: '',
    cvv: ''
  });

  // Resumen final de compra
  const [compraExitosa, setCompraExitosa] = useState(null);

  useEffect(() => {
    if (carrito.length === 0 && !compraExitosa) {
      navigate('/productos');
    }
  }, [carrito, compraExitosa, navigate]);

  useEffect(() => {
    if (sesion) {
      const desc = obtenerDescuento(sesion);
      setDescuentoPorcentaje(desc.porcentaje);
      setDescuentoDesc(desc.descripcion);
    }
  }, [sesion, obtenerDescuento]);

  const subtotal = carrito.reduce((t, i) => t + precioANumero(i.precio) * i.cantidad, 0);
  const montoDescuento = Math.round(subtotal * descuentoPorcentaje / 100);
  const total = subtotal - montoDescuento;

  const aplicarCodigo = () => {
    const cod = codigoInput.trim().toUpperCase();
    if (cod === 'FELICES50') {
      if (descuentoPorcentaje < 10) {
        setDescuentoPorcentaje(10);
        setDescuentoDesc('Descuento 10% (código FELICES50)');
        setCodigoMensaje({ texto: 'Código aplicado: 10% de descuento', tipo: 'exito' });
      } else {
        setCodigoMensaje({ texto: 'Ya tienes un descuento mayor activo.', tipo: 'exito' });
      }
    } else {
      setCodigoMensaje({ texto: 'Código no válido.', tipo: 'error' });
    }
  };

  // Formato tarjeta
  const handleNumeroTarjeta = (e) => {
    const v = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = (v.match(/.{1,4}/g) || []).join(' ');
    setTarjeta({ ...tarjeta, numero: formatted });
  };

  const handleVenceTarjeta = (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    setTarjeta({ ...tarjeta, vence: v });
  };

  // Navegación entre pasos
  const irPaso2 = () => {
    if (!sesion) {
      const { nombre, apellido, correo, nacimiento, password, confirmar } = invitado;
      if (!nombre.trim() || !apellido.trim() || !correo.trim() || !nacimiento || !password || !confirmar) {
        if (window.M && window.M.toast) window.M.toast({ html: 'Completa todos los datos personales' });
        return;
      }
      if (password !== confirmar) {
        if (window.M && window.M.toast) window.M.toast({ html: 'Las contraseñas no coinciden' });
        return;
      }
    }

    if (!sesion || !usarGuardada) {
      if (!dirNueva.comuna || !dirNueva.calle.trim() || !dirNueva.numero.trim()) {
        if (window.M && window.M.toast) window.M.toast({ html: 'Completa la dirección de entrega' });
        return;
      }
    }

    if (!fechaEnvio) {
      if (window.M && window.M.toast) window.M.toast({ html: 'Selecciona una fecha de entrega' });
      return;
    }

    setPaso(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irPaso3 = () => {
    const numClean = tarjeta.numero.replace(/\s/g, '');
    if (numClean.length < 16 || !tarjeta.nombre.trim() || tarjeta.vence.length < 5 || tarjeta.cvv.length < 3) {
      if (window.M && window.M.toast) window.M.toast({ html: 'Completa los datos de la tarjeta' });
      return;
    }
    setPaso(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmarCompra = () => {
    let usuarioId = null;
    let datosInvitado = null;
    let direccionFinal = (sesion && usarGuardada) ? sesion.direccion : dirNueva;

    if (sesion) {
      usuarioId = sesion.id;
    } else {
      const c = invitado.correo.trim().toLowerCase();
      const existente = usuarios.find(u => u.correo.toLowerCase() === c);
      if (!existente) {
        const nuevaCuenta = {
          id: 'USR' + Date.now(),
          tipo: 'cliente',
          nombre: invitado.nombre.trim(),
          apellido: invitado.apellido.trim(),
          correo: c,
          password: invitado.password,
          fechaNacimiento: invitado.nacimiento,
          direccion: direccionFinal,
          codigoReferencia: codigoInput.trim().toUpperCase(),
          fechaRegistro: new Date().toISOString().split('T')[0]
        };
        guardarUsuario(nuevaCuenta);
        iniciarSesion(nuevaCuenta);
        usuarioId = nuevaCuenta.id;
      } else {
        usuarioId = existente.id;
      }
      datosInvitado = {
        nombre: invitado.nombre.trim(),
        apellido: invitado.apellido.trim(),
        correo: c
      };
    }

    const nuevaCompra = {
      id: 'PED' + Date.now(),
      usuarioId,
      datosInvitado,
      fecha: new Date().toLocaleDateString('es-CL'),
      items: carrito.map(i => ({
        id: i.id,
        titulo: i.titulo,
        cantidad: i.cantidad,
        precio: precioANumero(i.precio)
      })),
      subtotal,
      descuento: descuentoPorcentaje,
      total,
      direccion: direccionFinal,
      fechaEnvio,
      tarjeta: '**** **** **** ' + tarjeta.numero.replace(/\s/g, '').slice(-4)
    };

    guardarCompra(nuevaCompra);
    setCompraExitosa(nuevaCompra);
    limpiarCarrito();
    setPaso(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const direccionMostrada = (sesion && usarGuardada) ? sesion.direccion : dirNueva;

  return (
    <main>
      <div className={styles.pagoContenedor}>
        {/* Indicador de pasos */}
        <div className={styles.pagoPasos}>
          <div className={`${styles.pagoPaso} ${paso === 1 ? styles.activo : paso > 1 ? styles.completado : ''}`}>
            <div className={styles.pagoPasoNum}>1</div>
            <span>Entrega</span>
          </div>
          <div className={styles.pagoPasoLinea} />
          <div className={`${styles.pagoPaso} ${paso === 2 ? styles.activo : paso > 2 ? styles.completado : ''}`}>
            <div className={styles.pagoPasoNum}>2</div>
            <span>Pago</span>
          </div>
          <div className={styles.pagoPasoLinea} />
          <div className={`${styles.pagoPaso} ${paso === 3 ? styles.activo : paso > 3 ? styles.completado : ''}`}>
            <div className={styles.pagoPasoNum}>3</div>
            <span>Confirmar</span>
          </div>
        </div>

        <div className={styles.pagoLayout}>
          <div className={styles.pagoFormulario}>
            {/* PASO 1: ENTREGA */}
            {paso === 1 && (
              <div>
                <h4 className={styles.pagoStepTitulo}>Datos de entrega</h4>

                {!sesion && (
                  <div>
                    <p className={styles.pagoSubseccion}>Datos personales</p>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input
                          type="text"
                          value={invitado.nombre}
                          onChange={(e) => setInvitado({ ...invitado, nombre: e.target.value })}
                        />
                        <label className={invitado.nombre ? 'active' : ''}>Nombre</label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input
                          type="text"
                          value={invitado.apellido}
                          onChange={(e) => setInvitado({ ...invitado, apellido: e.target.value })}
                        />
                        <label className={invitado.apellido ? 'active' : ''}>Apellido</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input
                          type="email"
                          value={invitado.correo}
                          onChange={(e) => setInvitado({ ...invitado, correo: e.target.value })}
                        />
                        <label className={invitado.correo ? 'active' : ''}>Correo electrónico</label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input
                          type="date"
                          value={invitado.nacimiento}
                          onChange={(e) => setInvitado({ ...invitado, nacimiento: e.target.value })}
                        />
                        <label className="active">Fecha de nacimiento</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input
                          type="password"
                          value={invitado.password}
                          onChange={(e) => setInvitado({ ...invitado, password: e.target.value })}
                        />
                        <label className={invitado.password ? 'active' : ''}>Contraseña (se creará tu cuenta)</label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input
                          type="password"
                          value={invitado.confirmar}
                          onChange={(e) => setInvitado({ ...invitado, confirmar: e.target.value })}
                        />
                        <label className={invitado.confirmar ? 'active' : ''}>Confirmar contraseña</label>
                      </div>
                    </div>
                  </div>
                )}

                <p className={styles.pagoSubseccion}>Dirección de entrega</p>
                {sesion && (
                  <div className={styles.pagoDirOpciones}>
                    <label className={styles.pagoRadioLabel}>
                      <input
                        type="radio"
                        name="tipo-dir"
                        checked={usarGuardada}
                        onChange={() => setUsarGuardada(true)}
                      />
                      <span>
                        Usar mi dirección guardada: <strong>{sesion.direccion?.calle} {sesion.direccion?.numero}, {sesion.direccion?.comuna}</strong>
                      </span>
                    </label>
                    <label className={styles.pagoRadioLabel}>
                      <input
                        type="radio"
                        name="tipo-dir"
                        checked={!usarGuardada}
                        onChange={() => setUsarGuardada(false)}
                      />
                      <span>Usar una dirección diferente</span>
                    </label>
                  </div>
                )}

                {(!sesion || !usarGuardada) && (
                  <div>
                    <div className="row">
                      <div className="input-field col s12">
                        <select
                          className={`browser-default ${styles.comunaSelect}`}
                          value={dirNueva.comuna}
                          onChange={(e) => setDirNueva({ ...dirNueva, comuna: e.target.value })}
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
                        <input
                          type="text"
                          value={dirNueva.calle}
                          onChange={(e) => setDirNueva({ ...dirNueva, calle: e.target.value })}
                        />
                        <label className={dirNueva.calle ? 'active' : ''}>Calle</label>
                      </div>
                      <div className="input-field col s12 m4">
                        <input
                          type="text"
                          value={dirNueva.numero}
                          onChange={(e) => setDirNueva({ ...dirNueva, numero: e.target.value })}
                        />
                        <label className={dirNueva.numero ? 'active' : ''}>Número</label>
                      </div>
                    </div>
                  </div>
                )}

                <p className={styles.pagoSubseccion}>Fecha de entrega preferida</p>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <input
                      type="date"
                      value={fechaEnvio}
                      onChange={(e) => setFechaEnvio(e.target.value)}
                    />
                    <label className="active">Fecha</label>
                  </div>
                </div>

                {(!sesion || descuentoPorcentaje === 0) && (
                  <div>
                    <p className={styles.pagoSubseccion}>Código de descuento</p>
                    <div className={styles.pagoCodigoFila}>
                      <div className={`input-field ${styles.pagoCodigoInput}`}>
                        <input
                          type="text"
                          placeholder="Ej: FELICES50"
                          value={codigoInput}
                          onChange={(e) => setCodigoInput(e.target.value)}
                        />
                      </div>
                      <button className="btn" onClick={aplicarCodigo} type="button">
                        Aplicar
                      </button>
                    </div>
                    {codigoMensaje.texto && (
                      <div style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '0.4rem',
                        marginTop: '0.5rem',
                        backgroundColor: codigoMensaje.tipo === 'exito' ? '#e8f5e9' : '#fdecea',
                        color: codigoMensaje.tipo === 'exito' ? '#2e7d32' : '#c62828'
                      }}>
                        {codigoMensaje.texto}
                      </div>
                    )}
                  </div>
                )}

                <button className={`btn ${styles.pagoBtnSiguiente}`} onClick={irPaso2}>
                  Continuar <i className="material-icons right">arrow_forward</i>
                </button>
              </div>
            )}

            {/* PASO 2: PAGO */}
            {paso === 2 && (
              <div>
                <h4 className={styles.pagoStepTitulo}>Datos de pago</h4>

                {/* Tarjeta Visual */}
                <div className={styles.pagoTarjetaVisual}>
                  <div className={styles.pagoTarjetaChip}></div>
                  <div className={styles.pagoTarjetaNumero}>
                    {tarjeta.numero || '**** **** **** ****'}
                  </div>
                  <div className={styles.pagoTarjetaFila}>
                    <div>
                      <div className={styles.pagoTarjetaLabel}>Titular</div>
                      <div className={styles.pagoTarjetaValor}>
                        {tarjeta.nombre.toUpperCase() || 'NOMBRE APELLIDO'}
                      </div>
                    </div>
                    <div>
                      <div className={styles.pagoTarjetaLabel}>Vencimiento</div>
                      <div className={styles.pagoTarjetaValor}>
                        {tarjeta.vence || 'MM/AA'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="text"
                      maxLength={19}
                      value={tarjeta.numero}
                      onChange={handleNumeroTarjeta}
                      placeholder="1234 5678 9012 3456"
                    />
                    <label className="active">Número de tarjeta</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="text"
                      value={tarjeta.nombre}
                      onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
                      placeholder="Como aparece en la tarjeta"
                    />
                    <label className="active">Nombre del titular</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 m6">
                    <input
                      type="text"
                      maxLength={5}
                      value={tarjeta.vence}
                      onChange={handleVenceTarjeta}
                      placeholder="MM/AA"
                    />
                    <label className="active">Vencimiento (MM/AA)</label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      type="password"
                      maxLength={4}
                      value={tarjeta.cvv}
                      onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                      placeholder="123"
                    />
                    <label className="active">CVV</label>
                  </div>
                </div>

                <div className={styles.pagoNavBotones}>
                  <button className={styles.pagoBtnVolver} onClick={() => setPaso(1)}>
                    <i className="material-icons left">arrow_back</i>Volver
                  </button>
                  <button className={`btn ${styles.pagoBtnConfirmar}`} onClick={irPaso3}>
                    Continuar <i className="material-icons right">arrow_forward</i>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3: CONFIRMAR */}
            {paso === 3 && (
              <div>
                <h4 className={styles.pagoStepTitulo}>Confirmar pedido</h4>
                <div className={styles.pagoResumenFinal}>
                  <p className={styles.pagoSubseccion}>Entrega</p>
                  <div className={styles.confBloque}>
                    <i className="material-icons tiny">home</i>
                    {direccionMostrada?.calle} {direccionMostrada?.numero}, {direccionMostrada?.comuna}
                  </div>
                  <div className={styles.confBloque}>
                    <i className="material-icons tiny">event</i>
                    Entrega estimada: {fechaEnvio}
                  </div>

                  <p className={styles.pagoSubseccion}>Pago</p>
                  <div className={styles.confBloque}>
                    <i className="material-icons tiny">credit_card</i>
                    **** **** **** {tarjeta.numero.replace(/\s/g, '').slice(-4)} — vence {tarjeta.vence}
                  </div>

                  <p className={styles.pagoSubseccion}>Productos</p>
                  {carrito.map(i => (
                    <div key={i.id + (i.mensaje || '')} className={styles.confProducto}>
                      <span>{i.cantidad}x {i.titulo}</span>
                      <span>$ {(precioANumero(i.precio) * i.cantidad).toLocaleString('es-CL')}</span>
                    </div>
                  ))}

                  {descuentoPorcentaje > 0 && (
                    <div className={`${styles.confProducto} ${styles.confDescuento}`}>
                      <span>{descuentoDesc}</span>
                      <span>- $ {montoDescuento.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className={`${styles.confProducto} ${styles.confTotal}`}>
                    <strong>Total</strong>
                    <strong>$ {total.toLocaleString('es-CL')}</strong>
                  </div>
                </div>

                <div className={styles.pagoNavBotones}>
                  <button className={styles.pagoBtnVolver} onClick={() => setPaso(2)}>
                    <i className="material-icons left">arrow_back</i>Volver
                  </button>
                  <button className={`btn ${styles.pagoBtnConfirmar}`} onClick={confirmarCompra}>
                    <i className="material-icons left">check_circle</i>Confirmar compra
                  </button>
                </div>
              </div>
            )}

            {/* PASO 4: ÉXITO */}
            {paso === 4 && compraExitosa && (
              <div className={styles.pagoExito}>
                <i className={`material-icons ${styles.pagoExitoIcono}`}>check_circle</i>
                <h4>¡Pedido confirmado!</h4>
                <p>
                  ¡Gracias por tu compra! Tu pedido #{compraExitosa.id} llegará el {compraExitosa.fechaEnvio}.
                </p>
                {compraExitosa.datosInvitado && (
                  <p>
                    Hemos creado tu cuenta con el correo {compraExitosa.datosInvitado.correo}.
                  </p>
                )}
                <Link to="/productos" className={styles.btnSeguirComprando}>
                  Seguir comprando
                </Link>
              </div>
            )}
          </div>

          {/* Resumen lateral */}
          {paso !== 4 && (
            <aside className={styles.pagoResumen}>
              <h5 className={styles.pagoResumenTitulo}>Tu pedido</h5>
              <div>
                {carrito.map(i => (
                  <div key={i.id + (i.mensaje || '')} className={styles.pagoResumenItem}>
                    <span>{i.cantidad}x {i.titulo}</span>
                    <span>$ {(precioANumero(i.precio) * i.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
              <div className={styles.pagoResumenLinea}>
                <span>Subtotal</span>
                <span>$ {subtotal.toLocaleString('es-CL')}</span>
              </div>
              {descuentoPorcentaje > 0 && (
                <div className={`${styles.pagoResumenLinea} ${styles.pagoResumenDescuento}`}>
                  <span>{descuentoDesc}</span>
                  <span>- $ {montoDescuento.toLocaleString('es-CL')}</span>
                </div>
              )}
              <div className={`${styles.pagoResumenLinea} ${styles.pagoResumenTotal}`}>
                <span>Total</span>
                <span>$ {total.toLocaleString('es-CL')}</span>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
