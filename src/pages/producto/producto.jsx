import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { NOMBRES_CATEGORIA } from '../../data/datos';
import styles from './producto.module.css';

export default function DetalleProducto() {
  const { id } = useParams();
  const { productosLista } = useAuth();
  const { guardar } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const producto = productosLista.find(p => p.id === id);

  if (!producto) {
    return (
      <main className="container">
        <div className={styles.detalleNoEncontrado}>
          <h3>No encontramos ese producto</h3>
          <p>Puede que el enlace esté mal escrito o el producto ya no exista.</p>
          <Link to="/productos" className={styles.btnVolver}>
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  const handleAgregar = () => {
    guardar(producto, cantidad, mensaje.trim());
    if (window.M && window.M.toast) {
      window.M.toast({ html: `${cantidad} x ${producto.titulo} agregado al carro` });
    }
  };

  return (
    <main className="container">
      <div className={styles.menu}>
        <div className={styles.detalleProducto}>
          <Link to="/productos" className={styles.detalleVolver}>
            <i className="material-icons">arrow_back</i> Volver a productos
          </Link>

          <div className={styles.detalleGrid}>
            <div className={styles.detalleImagenContenedor}>
              <img
                src={producto.imagen}
                alt={producto.titulo}
                className={styles.detalleImagen}
              />
            </div>

            <div className={styles.detalleInfo}>
              <span className={styles.detalleCategoria}>
                {NOMBRES_CATEGORIA[producto.categoria] || producto.categoria}
              </span>
              <h1 className={styles.detalleTitulo}>{producto.titulo}</h1>
              <p className={styles.detallePrecio}>$ {producto.precio}</p>
              <p className={styles.detalleDescripcion}>{producto.descripcion}</p>

              {producto.permiteMensaje && (
                <div className={styles.detalleMensaje}>
                  <label htmlFor="detalle-mensaje-texto">
                    Mensaje personalizado (opcional):
                  </label>
                  <textarea
                    id="detalle-mensaje-texto"
                    placeholder="Ej: ¡Feliz cumpleaños Ana!"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.detalleCantidad}>
                <span>Cantidad:</span>
                <div className={styles.detalleCantidadControl}>
                  <button
                    className={styles.btnCantidad}
                    onClick={() => setCantidad(c => Math.max(1, c - 1))}
                    aria-label="Restar cantidad"
                  >
                    -
                  </button>
                  <span>{cantidad}</span>
                  <button
                    className={styles.btnCantidad}
                    onClick={() => setCantidad(c => c + 1)}
                    aria-label="Sumar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className={`btn ${styles.detalleBotonAgregar}`}
                onClick={handleAgregar}
              >
                <i className="material-icons">shopping_cart</i> Agregar al carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
