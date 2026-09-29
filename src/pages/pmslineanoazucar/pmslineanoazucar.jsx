import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pmslineanoazucar.module.css';

export default function PmsLineaNoAzucar() {
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
                <h1 className={styles.articuloTitulo}>Línea Sin Azúcar</h1>
                <p className="grey-text text-darken-1">10 de Abril, 2026</p>
                <p className={styles.lead}>
                  Conoce las nuevas alternativas pensadas para que todos disfruten del mismo sabor.
                </p>
                <hr style={{ margin: '1.5rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <div className={styles.articuloContenido}>
                  <p>
                    Sabemos que disfrutar de un buen postre es uno de los placeres más lindos del día, pero también entendemos que las necesidades de nuestros clientes cambian. Por eso creamos nuestra Línea Sin Azúcar, una propuesta pensada para que las personas con diabetes, quienes cuidan su alimentación o simplemente prefieren opciones más livianas no tengan que dejar de lado el sabor de siempre. El mayor desafío no fue quitar el azúcar, sino lograr que cada bocado mantuviera la misma textura esponjosa y el toque casero que nos caracteriza. Tras meses probando y ajustando nuestras recetas clásicas con endulzantes de alta calidad, logramos versiones increíbles de nuestras tortas, empolvados y tartaletas de fruta. Creemos firmemente que nadie debería quedarse fuera a la hora de cantar el cumpleaños o compartir una tarde de té en familia. Te invitamos a probar estas alternativas en nuestras sucursales y descubrir que comer consciente también puede ser deliciosamente dulce.
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
