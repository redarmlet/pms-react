import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pmstortamilhojas.module.css';

export default function PmsTortaMilHojas() {
  return (
    <main className="container">
      <div className={styles.menu}>
        <div className="row w-100 mt-3">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgePms}>P Mil Sab</span>
                </div>
                <h1 className={styles.articuloTitulo}>La Torta Mil Hojas</h1>
                <p className="grey-text text-darken-1">20 de Mayo, 2026</p>
                <p className={styles.lead}>
                  La historia de cómo se convirtió en el postre preferido para los cumpleaños familiares.
                </p>
                <hr style={{ margin: '1.5rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <div className={styles.articuloContenido}>
                  <p>
                    Si hay un postre que no puede faltar en una mesa chilena, es la clásica Torta Mil Hojas. Con el paso de los años, este ícono de nuestra repostería se ha transformado en el centro de los cumpleaños familiares, los aniversarios y los domingos de té. Su secreto radica en el equilibrio perfecto: capas infinitas de hojarasca crujiente y dorada al punto justo, intercaladas con generosas capas de manjar artesanal. El verdadero arte está en la paciencia que requiere la masa para lograr esa textura crocante que no se deshace ni se vuelve pesada, sino que se derrite en la boca con cada bocado. Para nosotros, preparar la Torta Mil Hojas es mantener viva una tradición que ha pasado de generación en generación. Cada vez que horneamos una, sabemos que no solo estamos entregando un pastel, sino el motivo principal para reunir a la familia alrededor de la mesa.
                  </p>
                </div>
              </div>
              <div className={`card-action ${styles.cardAction}`}>
                <Link to="/blog" className={styles.btnVolver}>
                  Volver al Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
