import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './carrito.module.css';

export default function Carrito() {
  const {
    carrito,
    carritoAbierto,
    cerrarCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    calcularTotal
  } = useCart();
  const navigate = useNavigate();

  const handleFinalizar = () => {
    cerrarCarrito();
    navigate('/pago');
  };

  return (
    <>
      <div
        id="carrito-overlay"
        className={`${styles.carritoOverlay} ${carritoAbierto ? styles.visible : ''}`}
        onClick={cerrarCarrito}
      />
      <aside
        id="carrito-panel"
        className={`${styles.carritoPanel} ${carritoAbierto ? styles.abierto : ''}`}
      >
        <div className={styles.carritoPanelHeader}>
          <h4>Tu carro</h4>
          <button
            id="carrito-cerrar"
            className={`material-icons ${styles.carritoCerrar}`}
            onClick={cerrarCarrito}
            aria-label="Cerrar carrito"
          >
            close
          </button>
        </div>

        <div id="carrito-lista" className={styles.carritoLista}>
          {carrito.length === 0 ? (
            <p className={styles.carritoVacio}>
              Tu carro está vacío. ¡Agrega alguna delicia!
            </p>
          ) : (
            carrito.map(item => (
              <div key={item.id + (item.mensaje || '')} className={styles.carritoItem}>
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className={styles.carritoItemImagen}
                />
                <div className={styles.carritoItemInfo}>
                  <p className={styles.carritoItemTitulo}>{item.titulo}</p>
                  <p className={styles.carritoItemPrecio}>$ {item.precio}</p>
                  {item.permiteMensaje && (
                    <p className={styles.carritoItemMensaje}>
                      Mensaje: {item.mensaje ? item.mensaje : "Ninguno"}
                    </p>
                  )}
                  <div className={styles.carritoItemCantidad}>
                    <button
                      className={styles.btnCantidad}
                      onClick={() => cambiarCantidad(item.id, -1)}
                      aria-label="Restar cantidad"
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className={styles.btnCantidad}
                      onClick={() => cambiarCantidad(item.id, 1)}
                      aria-label="Sumar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={`material-icons ${styles.carritoItemEliminar}`}
                  onClick={() => eliminarDelCarrito(item.id)}
                  aria-label="Eliminar producto"
                >
                  close
                </button>
              </div>
            ))
          )}
        </div>

        <div className={styles.carritoPanelFooter}>
          <div className={styles.carritoTotalFila}>
            <span>Total</span>
            <span id="carrito-total">
              $ {calcularTotal().toLocaleString('es-CL')}
            </span>
          </div>
          <button
            id="carrito-finalizar"
            className={`btn ${styles.carritoFinalizar}`}
            disabled={carrito.length === 0}
            onClick={handleFinalizar}
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  );
}
