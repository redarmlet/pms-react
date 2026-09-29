import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './perfil.module.css';

export default function Perfil() {
  const {
    sesion,
    cerrarSesion,
    compras,
    calcularEdad,
    esDuoc,
    esMayorDe50,
    tieneCodigo,
    obtenerDescuento,
    tieneTortaGratis
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sesion) {
      navigate('/login');
    } else if (sesion.tipo === 'admin') {
      navigate('/admin');
    }
  }, [sesion, navigate]);

  if (!sesion) return null;

  const descuento = obtenerDescuento(sesion);
  const tortaGratis = tieneTortaGratis(sesion);
  const edad = calcularEdad(sesion.fechaNacimiento);

  const listaBeneficios = [];
  if (esMayorDe50(sesion)) listaBeneficios.push({ texto: '50% de descuento en todos los productos', icono: 'elderly' });
  if (tieneCodigo(sesion)) listaBeneficios.push({ texto: '10% de descuento (código FELICES50)', icono: 'card_giftcard' });
  if (esDuoc(sesion)) listaBeneficios.push({ texto: 'Torta gratis en tu cumpleaños', icono: 'cake' });

  const misCompras = compras.filter(c => c.usuarioId === sesion.id);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <main>
      <div className={styles.perfilContenedor}>
        <div className={styles.perfilHeader}>
          <div className={styles.perfilAvatar}>
            <i className={`material-icons ${styles.materialIcons}`}>account_circle</i>
          </div>
          <div className={styles.perfilHeaderInfo}>
            <h2>{sesion.nombre} {sesion.apellido}</h2>
            <p className={styles.perfilCorreoTexto}>{sesion.correo}</p>
            <div className={styles.perfilBadges}>
              {esDuoc(sesion) && (
                <span className={`${styles.perfilBadge} ${styles.perfilBadgeDuoc}`}>
                  Estudiante Duoc
                </span>
              )}
              {esMayorDe50(sesion) && (
                <span className={`${styles.perfilBadge} ${styles.perfilBadgeSenior}`}>
                  +50 años
                </span>
              )}
            </div>
          </div>
          <button className={`btn ${styles.btnCerrarSesion}`} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

        {descuento.porcentaje > 0 && (
          <div className={styles.perfilDescuentoBanner}>
            🎁 {descuento.descripcion} activo en todas tus compras!
          </div>
        )}

        {tortaGratis && (
          <div className={styles.perfilTortaBanner}>
            🎂 ¡Feliz cumpleaños! Hoy tienes una <strong>torta gratis</strong> por ser estudiante Duoc. Se aplicará en tu próxima compra.
          </div>
        )}

        <div className={styles.perfilGrid}>
          <div className={styles.perfilCard}>
            <h5 className={styles.perfilCardTitulo}>
              <i className={`material-icons ${styles.materialIcons}`}>person</i>
              Datos personales
            </h5>
            <div className={styles.perfilDato}><span>Nombre</span><strong>{sesion.nombre}</strong></div>
            <div className={styles.perfilDato}><span>Apellido</span><strong>{sesion.apellido}</strong></div>
            <div className={styles.perfilDato}><span>Fecha de nacimiento</span><strong>{sesion.fechaNacimiento || '-'}</strong></div>
            <div className={styles.perfilDato}><span>Edad</span><strong>{edad} años</strong></div>
          </div>

          <div className={styles.perfilCard}>
            <h5 className={styles.perfilCardTitulo}>
              <i className={`material-icons ${styles.materialIcons}`}>home</i>
              Dirección de entrega
            </h5>
            <div className={styles.perfilDato}><span>Comuna</span><strong>{sesion.direccion?.comuna || '-'}</strong></div>
            <div className={styles.perfilDato}><span>Calle</span><strong>{sesion.direccion?.calle || '-'}</strong></div>
            <div className={styles.perfilDato}><span>Número</span><strong>{sesion.direccion?.numero || '-'}</strong></div>
          </div>

          <div className={styles.perfilCard}>
            <h5 className={styles.perfilCardTitulo}>
              <i className={`material-icons ${styles.materialIcons}`}>star</i>
              Mis beneficios
            </h5>
            {listaBeneficios.length === 0 ? (
              <p className={styles.perfilSinDatos}>No tienes beneficios activos aún.</p>
            ) : (
              listaBeneficios.map((b, idx) => (
                <div key={idx} className={styles.perfilBeneficio}>
                  <i className={`material-icons ${styles.materialIcons}`}>{b.icono}</i>
                  <span>{b.texto}</span>
                </div>
              ))
            )}
          </div>

          <div className={`${styles.perfilCard} ${styles.perfilCardAncho}`}>
            <h5 className={styles.perfilCardTitulo}>
              <i className={`material-icons ${styles.materialIcons}`}>receipt</i>
              Historial de compras
            </h5>
            {misCompras.length === 0 ? (
              <p className={styles.perfilSinDatos}>Aún no tienes compras registradas.</p>
            ) : (
              misCompras.map(c => (
                <div key={c.id} className={styles.perfilCompra}>
                  <div className={styles.perfilCompraHeader}>
                    <span className={styles.perfilCompraId}>Pedido #{c.id}</span>
                    <span className={styles.perfilCompraFecha}>{c.fecha}</span>
                    <span className={styles.perfilCompraTotal}>
                      $ {(c.total || 0).toLocaleString('es-CL')}
                    </span>
                  </div>
                  <div className={styles.perfilCompraItems}>
                    {c.items?.map(i => `${i.cantidad}x ${i.titulo}`).join(' | ')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
