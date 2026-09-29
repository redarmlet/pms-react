import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pmsdestacado.module.css';

export default function PmsDestacado() {
  return (
    <main className="container">
      <div className={styles.menu}>
        <div className="row w-100 mt-3">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgeDestacado}>Destacado</span>
                  <span className={styles.badgePms}>P Mil Sab</span>
                </div>
                <h1 className={styles.articuloTitulo}>
                  Celebrando 50 años de la repostería más dulce de Chile
                </h1>
                <p className="grey-text text-darken-1">12 de Mayo, 2026</p>
                <p className={styles.lead}>
                  Un recorrido por nuestras cinco décadas de tradición artesanal endulzando las mesas del país. Descubre cómo mantenemos vivas nuestras recetas clásicas con el cariño de siempre.
                </p>
                <hr style={{ margin: '1.5rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <div className={styles.articuloContenido}>
                  <p>
                    Todo empezó en el año 1976 cuando prendimos los hornos en nuestra primera repostería. Lo que empezó como un taller familiar se convirtió con los años en el lugar de encuentro para generaciones de clientes que buscan revivir los sabores de siempre. Nuestras recetas clásicas —desde la clásica torta mil hojas con manjar casero hasta nuestros tradicionales empolvados— se siguen preparando hoy exactamente con los mismos ingredientes frescos y el cuidado de hace 50 años. Creemos que el verdadero secreto de la repostería no está en acelerar los procesos, sino en darle el tiempo y el cariño que cada masa necesita. Agradecemos infinitamente a cada familia que nos ha hecho parte de sus cumpleaños, domingos por la tarde y celebraciones más importantes. Seguiremos horneando con la misma dedicación para acompañarlos por muchos años más.
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
