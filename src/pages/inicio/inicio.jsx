import React from 'react';
import { Link } from 'react-router-dom';
import styles from './inicio.module.css';

export default function Inicio() {
  return (
    <div>
      <div className={styles.bannerInicio}>
        <img src="img/anuncio.webp" alt="Anuncio Pastelería Mil Sabores" />
      </div>
      <main className="container">
        <div className={styles.menu}>
          <section className={styles.mainSection}>
            <h1 className={styles.tituloMenu}>
              Bienvenidos a<br /> Pastelería Mil Sabores
            </h1>
            <p className={styles.lead}>
              Celebrando 50 años de la repostería más dulce y tradicional de Chile.
            </p>
          </section>
          <Link to="/productos" className={styles.btnAction}>
            Revisa nuestros ricos productos
          </Link>
        </div>
      </main>
    </div>
  );
}
