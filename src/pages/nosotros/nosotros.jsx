import React from 'react';
import styles from './nosotros.module.css';

export default function Nosotros() {
  return (
    <main className="container">
      <div className={styles.menu}>
        {/* Encabezado */}
        <section className={styles.mainSection}>
          <h1 className={styles.tituloMenu}>Nuestra Historia</h1>
          <p className={styles.lead}>
            Más de 50 años endulzando los hogares con recetas tradicionales y artesanas.
          </p>
        </section>

        {/* Sección Historia */}
        <div className="row w-100">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  Sobre Pastelería 1000 Sabores
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <p className="mb-2" style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  Fundada con la pasión por la repostería clásica artesanal, nuestra pastelería ha llevado sabor y tradición a miles de familias. Nos dedicamos a preparar cada producto con ingredientes seleccionados y el mismo amor del primer día.
                </p>
                <div style={{ lineHeight: '1.6', color: '#5D4037' }}>
                  <p>
                    Desde nuestros modestos inicios como un emprendimiento familiar en el corazón de Santiago, nos propusimos rescatar las recetas de antaño que llenaban de calidez los hogares chilenos. Con dedicación, paciencia y un estándar inflexible de calidad, fuimos creciendo gracias a la recomendación de quienes encontraban en nuestras tortas y pasteles ese sabor auténtico que creían perdido. Hoy, con medio siglo de historia, seguimos horneando con la misma vocación de servicio, combinando técnicas tradicionales con innovaciones para adaptarnos a las nuevas preferencias de nuestra comunidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Misión y Visión */}
        <div className="row w-100">
          <div className="col s12 m6">
            <div className="card white h-100">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  <i className="material-icons left orange-text text-darken-2">star</i>
                  Misión
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <p className={styles.cardContentText}>
                  Ofrecer la mejor calidad en repostería tradicional y moderna, brindando experiencias memorables a nuestros clientes a través de sabores auténticos e ingredientes de primera calidad.
                </p>
              </div>
            </div>
          </div>

          <div className="col s12 m6">
            <div className="card white h-100">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  <i className="material-icons left orange-text text-darken-2">visibility</i>
                  Visión
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <p className={styles.cardContentText}>
                  Ser reconocidos a nivel nacional como la pastelería preferida por mantener viva la tradición dulce de Chile, innovando de forma constante en alternativas para todos los gustos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="row w-100">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  Nuestros Valores
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <div className="row">
                  <div className="col s12 m4 center-align">
                    <i className={`material-icons large ${styles.valorIcon}`}>favorite</i>
                    <h5 className={styles.valorTitulo}>Calidad</h5>
                    <p>Ingredientes frescos y recetas hechas con dedicación artesanal.</p>
                  </div>
                  <div className="col s12 m4 center-align">
                    <i className={`material-icons large ${styles.valorIcon}`}>groups</i>
                    <h5 className={styles.valorTitulo}>Tradición</h5>
                    <p>Preservamos los sabores de antaño que unen a las familias.</p>
                  </div>
                  <div className="col s12 m4 center-align">
                    <i className={`material-icons large ${styles.valorIcon}`}>restaurant</i>
                    <h5 className={styles.valorTitulo}>Innovación</h5>
                    <p>Creamos nuevas alternativas para adaptar nuestros productos a todos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
