import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './admin.module.css';

export default function Admin() {
  const {
    sesion,
    usuarios,
    guardarUsuario,
    actualizarUsuario,
    compras,
    actualizarCompra,
    productosLista,
    guardarProducto,
    actualizarProducto
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sesion || sesion.tipo !== 'admin') {
      navigate('/login');
    }
  }, [sesion, navigate]);

  // Form states
  const [formProdAbierto, setFormProdAbierto] = useState(false);
  const [prodForm, setProdForm] = useState({
    id: '',
    titulo: '',
    categoria: '',
    precio: '',
    imagen: '',
    descripcion: ''
  });

  const [formUserAbierto, setFormUserAbierto] = useState(false);
  const [userForm, setUserForm] = useState({
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    tipo: 'cliente'
  });

  const [formPedidoAbierto, setFormPedidoAbierto] = useState(false);
  const [pedidoForm, setPedidoForm] = useState({
    id: '',
    fechaEnvio: ''
  });

  if (!sesion || sesion.tipo !== 'admin') return null;

  const totalRecaudado = compras.reduce((t, c) => t + (c.total || 0), 0);

  // PRODUCTOS
  const handleNuevoProd = () => {
    setProdForm({ id: '', titulo: '', categoria: '', precio: '', imagen: '', descripcion: '' });
    setFormUserAbierto(false);
    setFormPedidoAbierto(false);
    setFormProdAbierto(true);
  };

  const handleEditarProd = (p) => {
    setProdForm({
      id: p.id,
      titulo: p.titulo,
      categoria: p.categoria,
      precio: p.precio,
      imagen: p.imagen,
      descripcion: p.descripcion
    });
    setFormUserAbierto(false);
    setFormPedidoAbierto(false);
    setFormProdAbierto(true);
  };

  const handleGuardarProd = (e) => {
    e.preventDefault();
    if (!prodForm.titulo || !prodForm.precio) return;
    const prodData = {
      id: prodForm.id || ('PROD' + Date.now()),
      categoria: prodForm.categoria || 'Tortas_cuadradas',
      titulo: prodForm.titulo,
      imagen: prodForm.imagen || '/img/pasteles/TC001.png',
      precio: prodForm.precio,
      descripcion: prodForm.descripcion,
      permiteMensaje: true
    };

    const existe = productosLista.some(p => p.id === prodData.id);
    if (existe) {
      actualizarProducto(prodData);
    } else {
      guardarProducto(prodData);
    }
    setFormProdAbierto(false);
  };

  // USUARIOS
  const handleNuevoUser = () => {
    setUserForm({
      id: 'USR' + Date.now(),
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      tipo: 'cliente'
    });
    setFormProdAbierto(false);
    setFormPedidoAbierto(false);
    setFormUserAbierto(true);
  };

  const handleEditarUser = (u) => {
    setUserForm({
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      correo: u.correo,
      password: u.password,
      tipo: u.tipo
    });
    setFormProdAbierto(false);
    setFormPedidoAbierto(false);
    setFormUserAbierto(true);
  };

  const handleGuardarUser = (e) => {
    e.preventDefault();
    if (!userForm.nombre || !userForm.correo || !userForm.password) return;
    const existente = usuarios.find(u => u.id === userForm.id);
    const userData = existente || {
      id: userForm.id,
      fechaNacimiento: '2000-01-01',
      direccion: { comuna: '', calle: '', numero: '' },
      codigoReferencia: '',
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    userData.nombre = userForm.nombre;
    userData.apellido = userForm.apellido;
    userData.correo = userForm.correo;
    userData.password = userForm.password;
    userData.tipo = userForm.tipo;

    if (existente) {
      actualizarUsuario(userData);
    } else {
      guardarUsuario(userData);
    }
    setFormUserAbierto(false);
  };

  // PEDIDOS
  const handleEditarPedido = (ped) => {
    setPedidoForm({
      id: ped.id,
      fechaEnvio: ped.fechaEnvio || ''
    });
    setFormProdAbierto(false);
    setFormUserAbierto(false);
    setFormPedidoAbierto(true);
  };

  const handleGuardarPedido = (e) => {
    e.preventDefault();
    const ped = compras.find(item => item.id === pedidoForm.id);
    if (ped) {
      actualizarCompra({ ...ped, fechaEnvio: pedidoForm.fechaEnvio });
    }
    setFormPedidoAbierto(false);
  };

  return (
    <main>
      <div className={styles.adminContenedor}>
        <h3 className={styles.authTitulo}>Panel de administración</h3>
        <p className={styles.authSubtitulo}>Hola, {sesion.nombre}.</p>

        {/* Resumen */}
        <div className={styles.adminGridResumen}>
          <div className={styles.adminCardResumen}>
            <p className={styles.adminNumero}>{usuarios.length}</p>
            <p>Usuarios registrados</p>
          </div>
          <div className={styles.adminCardResumen}>
            <p className={styles.adminNumero}>{compras.length}</p>
            <p>Pedidos realizados</p>
          </div>
          <div className={styles.adminCardResumen}>
            <p className={styles.adminNumero}>$ {totalRecaudado.toLocaleString('es-CL')}</p>
            <p>Total recaudado</p>
          </div>
        </div>

        {/* TABLA PEDIDOS */}
        <div className={styles.adminSeccion}>
          <h5 className={styles.perfilCardTitulo}>
            <span>Pedidos</span>
          </h5>
          <table className={`striped ${styles.adminTabla}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Fecha entrega</th>
                <th>Descuento</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {compras.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>Sin pedidos aún</td>
                </tr>
              ) : (
                compras.map(c => {
                  const u = usuarios.find(usr => usr.id === c.usuarioId);
                  const nombreCliente = u
                    ? `${u.nombre} ${u.apellido}`
                    : (c.datosInvitado?.nombre || 'Invitado');
                  return (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td>{nombreCliente}</td>
                      <td>{c.fecha}</td>
                      <td>{c.fechaEnvio || '-'}</td>
                      <td>{c.descuento > 0 ? `${c.descuento}%` : '-'}</td>
                      <td>$ {(c.total || 0).toLocaleString('es-CL')}</td>
                      <td>
                        <span className={styles.btnEditar} onClick={() => handleEditarPedido(c)}>
                          [Editar]
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* TABLA USUARIOS */}
        <div className={styles.adminSeccion}>
          <div className={styles.perfilCardTitulo}>
            <span>Usuarios</span>
            <button className={styles.btnNuevo} onClick={handleNuevoUser}>
              + Nuevo
            </button>
          </div>
          <table className={`striped ${styles.adminTabla}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Registro</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.tipo}</td>
                  <td>{u.fechaRegistro || '-'}</td>
                  <td>
                    <span className={styles.btnEditar} onClick={() => handleEditarUser(u)}>
                      [Editar]
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLA PRODUCTOS */}
        <div className={styles.adminSeccion}>
          <div className={styles.perfilCardTitulo}>
            <span>Productos</span>
            <button className={styles.btnNuevo} onClick={handleNuevoProd}>
              + Nuevo
            </button>
          </div>
          <table className={`striped ${styles.adminTabla}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productosLista.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titulo}</td>
                  <td>{p.categoria}</td>
                  <td>$ {p.precio}</td>
                  <td>
                    <span className={styles.btnEditar} onClick={() => handleEditarProd(p)}>
                      [Editar]
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FORMULARIO EDITAR / CREAR USUARIO */}
        {formUserAbierto && (
          <div className={`${styles.adminSeccion} ${styles.formularioBox}`}>
            <h5>{userForm.id ? 'Editar / Crear Usuario' : 'Nuevo Usuario'}</h5>
            <form onSubmit={handleGuardarUser}>
              <input
                type="text"
                placeholder="ID (ej. USR123)"
                value={userForm.id}
                onChange={(e) => setUserForm({ ...userForm, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombre"
                value={userForm.nombre}
                onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={userForm.apellido}
                onChange={(e) => setUserForm({ ...userForm, apellido: e.target.value })}
              />
              <input
                type="text"
                placeholder="Correo"
                value={userForm.correo}
                onChange={(e) => setUserForm({ ...userForm, correo: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contraseña"
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tipo (admin o cliente)"
                value={userForm.tipo}
                onChange={(e) => setUserForm({ ...userForm, tipo: e.target.value })}
              />
              <div style={{ marginTop: '10px' }}>
                <button type="submit" className={styles.btnGuardar}>Guardar</button>
                <button type="button" className={styles.btnCancelar} onClick={() => setFormUserAbierto(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FORMULARIO EDITAR / CREAR PRODUCTO */}
        {formProdAbierto && (
          <div className={`${styles.adminSeccion} ${styles.formularioBox}`}>
            <h5>{prodForm.id ? 'Editar Producto' : 'Nuevo Producto'}</h5>
            <form onSubmit={handleGuardarProd}>
              <input
                type="text"
                placeholder="ID (ej. TC003)"
                value={prodForm.id}
                onChange={(e) => setProdForm({ ...prodForm, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Título"
                value={prodForm.titulo}
                onChange={(e) => setProdForm({ ...prodForm, titulo: e.target.value })}
              />
              <input
                type="text"
                placeholder="Categoría"
                value={prodForm.categoria}
                onChange={(e) => setProdForm({ ...prodForm, categoria: e.target.value })}
              />
              <input
                type="text"
                placeholder="Precio (ej. 45,000)"
                value={prodForm.precio}
                onChange={(e) => setProdForm({ ...prodForm, precio: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ruta Imagen (ej. /img/pasteles/TC001.png)"
                value={prodForm.imagen}
                onChange={(e) => setProdForm({ ...prodForm, imagen: e.target.value })}
              />
              <textarea
                placeholder="Descripción"
                rows="3"
                value={prodForm.descripcion}
                onChange={(e) => setProdForm({ ...prodForm, descripcion: e.target.value })}
              />
              <div style={{ marginTop: '10px' }}>
                <button type="submit" className={styles.btnGuardar}>Guardar</button>
                <button type="button" className={styles.btnCancelar} onClick={() => setFormProdAbierto(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FORMULARIO EDITAR PEDIDO */}
        {formPedidoAbierto && (
          <div className={`${styles.adminSeccion} ${styles.formularioBox}`}>
            <h5>Editar Pedido #{pedidoForm.id}</h5>
            <form onSubmit={handleGuardarPedido}>
              <input
                type="date"
                placeholder="Fecha Entrega"
                value={pedidoForm.fechaEnvio}
                onChange={(e) => setPedidoForm({ ...pedidoForm, fechaEnvio: e.target.value })}
              />
              <div style={{ marginTop: '10px' }}>
                <button type="submit" className={styles.btnGuardar}>Guardar</button>
                <button type="button" className={styles.btnCancelar} onClick={() => setFormPedidoAbierto(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
