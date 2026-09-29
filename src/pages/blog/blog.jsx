import React from 'react';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';

export default function Blog() {
  return (
    <main className="container">
      <div className={styles.menu}>
        <section className={styles.mainSection}>
          <h1 className={styles.tituloMenu}>blog y noticias</h1>
          <p className={styles.lead}>
            Novedades, historias y los secretos de nuestras recetas tradicionales.
          </p>
        </section>

        {/* Artículo Destacado */}
        <div className="row w-100">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgeDestacado}>Destacado</span>
                  <span className={styles.badgePms}>P Mil Sab</span>
                </div>
                <span className="card-title bold" style={{ fontWeight: 'bold' }}>
                  Celebrando 50 años de la repostería más dulce de Chile
                </span>
                <p className="grey-text text-darken-1">12 de Mayo, 2026</p>
                <p style={{ marginTop: '1rem' }}>
                  Un recorrido por nuestras cinco décadas de tradición artesanal endulzando las mesas del país. Descubre cómo mantenemos vivas nuestras recetas clásicas con el cariño de siempre.
                </p>
              </div>
              <div className="card-action">
                <Link to="/blog/pmsdestacado" className={styles.btnLeerMas}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Artículos Secundarios */}
        <div className="row w-100">
          <div className="col s12 m6 l4">
            <div className="card white h-100 d-flex flex-column">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgeUser}>User</span>
                </div>
                <span className="card-title" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  Secretos de conservación
                </span>
                <p className="grey-text text-darken-1">03 de Junio, 2026</p>
                <p>
                  Consejos para mantener la frescura y textura de tus tortas por más tiempo en casa.
                </p>
              </div>
              <div className="card-action" style={{ marginTop: 'auto' }}>
                <Link to="/blog/userpost" className={styles.btnLeerMas} style={{ width: '100%', textAlign: 'center' }}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>

          <div className="col s12 m6 l4">
            <div className="card white h-100 d-flex flex-column">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgePms}>P Mil Sab</span>
                </div>
                <span className="card-title" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  La Torta Mil Hojas
                </span>
                <p className="grey-text text-darken-1">20 de Mayo, 2026</p>
                <p>
                  La historia de cómo se convirtió en el postre preferido para los cumpleaños familiares.
                </p>
              </div>
              <div className="card-action" style={{ marginTop: 'auto' }}>
                <Link to="/blog/pmstortamilhojas" className={styles.btnLeerMas} style={{ width: '100%', textAlign: 'center' }}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>

          <div className="col s12 m6 l4">
            <div className="card white h-100 d-flex flex-column">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgePms}>P Mil Sab</span>
                </div>
                <span className="card-title" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  Línea Sin Azúcar
                </span>
                <p className="grey-text text-darken-1">10 de Abril, 2026</p>
                <p>
                  Conoce las nuevas alternativas pensadas para que todos disfruten del mismo sabor.
                </p>
              </div>
              <div className="card-action" style={{ marginTop: 'auto' }}>
                <Link to="/blog/pmslineanoazucar" className={styles.btnLeerMas} style={{ width: '100%', textAlign: 'center' }}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
