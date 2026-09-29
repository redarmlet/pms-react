import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { NOMBRES_CATEGORIA } from '../../data/datos';
import styles from './productos.module.css';

export default function Productos() {
  const { productosLista } = useAuth();
  const { guardar } = useCart();
  const navigate = useNavigate();

  const [categoriasActivas, setCategoriasActivas] = useState(new Set());
  const [verTodo, setVerTodo] = useState(true);

  // Modal para mensaje
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensajeTexto, setMensajeTexto] = useState('');

  const categorias = [...new Set(productosLista.map(p => p.categoria))];

  const handleToggleVerTodo = () => {
    setVerTodo(true);
    setCategoriasActivas(new Set());
  };

  const handleToggleCategoria = (cat) => {
    setVerTodo(false);
    setCategoriasActivas(prev => {
      const nuevo = new Set(prev);
      if (nuevo.has(cat)) {
        nuevo.delete(cat);
        if (nuevo.size === 0) setVerTodo(true);
      } else {
        nuevo.add(cat);
      }
      return nuevo;
    });
  };

  const handleAgregarClick = (e, prod) => {
    e.stopPropagation();
    if (prod.permiteMensaje) {
      setProductoSeleccionado(prod);
      setMensajeTexto('');
      setModalAbierto(true);
    } else {
      guardar(prod, 1, '');
      if (window.M && window.M.toast) {
        window.M.toast({ html: `${prod.titulo} agregado al carro` });
      }
    }
  };

  const handleConfirmarModal = () => {
    if (productoSeleccionado) {
      guardar(productoSeleccionado, 1, mensajeTexto.trim());
      if (window.M && window.M.toast) {
        window.M.toast({ html: `${productoSeleccionado.titulo} agregado al carro` });
      }
    }
    setModalAbierto(false);
  };

  const productosFiltrados = verTodo
    ? productosLista
    : productosLista.filter(p => categoriasActivas.has(p.categoria));

  return (
    <main className="container">
      <div className={styles.menu}>
        <h3 className={styles.tituloMenu}>Nuestros productos</h3>
        <div className={styles.layoutProductos}>
          <aside className={styles.sidebarFiltros}>
            <h4 className={styles.sidebarTitulo}>Categorías</h4>
            <div className={styles.filtrosLista}>
              <label className={`${styles.filtroCategoria} ${styles.filtroVerTodo}`}>
                <input
                  type="checkbox"
                  checked={verTodo}
                  onChange={handleToggleVerTodo}
                />
                <span>Ver Todo</span>
              </label>

              {categorias.map(cat => (
                <label key={cat} className={styles.filtroCategoria}>
                  <input
                    type="checkbox"
                    checked={categoriasActivas.has(cat)}
                    onChange={() => handleToggleCategoria(cat)}
                  />
                  <span>{NOMBRES_CATEGORIA[cat] || cat}</span>
                </label>
              ))}
            </div>
          </aside>

          <section className={styles.productosSeccion}>
            {productosFiltrados.length === 0 ? (
              <p className={styles.sinResultados}>
                No hay productos para las categorías seleccionadas.
              </p>
            ) : (
              <div className={styles.contenedorCards}>
                {productosFiltrados.map(p => (
                  <div
                    key={p.id}
                    className={styles.carta}
                    onClick={() => navigate(`/producto/${p.id}`)}
                  >
                    <div className={styles.contenedorImagen}>
                      <img
                        src={p.imagen}
                        alt={p.titulo}
                        className={styles.imagenProducto}
                      />
                      <button
                        className={styles.btnAgregar}
                        onClick={(e) => handleAgregarClick(e, p)}
                      >
                        <i className="material-icons">shopping_cart</i>
                      </button>
                    </div>
                    <h3 className={styles.h3Producto}>{p.titulo.toUpperCase()}</h3>
                    <p className={styles.precioProducto}>$ {p.precio}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal Mensaje */}
      {modalAbierto && (
        <div className={styles.modalOverlay} onClick={() => setModalAbierto(false)}>
          <div className={styles.modalContentBox} onClick={(e) => e.stopPropagation()}>
            <h5 className={styles.modalTitulo}>Mensaje personalizado</h5>
            <p>¿Quieres agregar un mensaje para tu torta? (opcional)</p>
            <textarea
              className={styles.modalTextarea}
              placeholder="Ej: ¡Feliz cumpleaños Camila!"
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
            />
            <div className={styles.modalBotones}>
              <button
                className={styles.modalBtnCancelar}
                onClick={() => setModalAbierto(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.modalBtnGuardar}
                onClick={handleConfirmarModal}
              >
                Agregar al carro
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
