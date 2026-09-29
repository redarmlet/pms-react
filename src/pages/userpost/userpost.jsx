import React from 'react';
import { Link } from 'react-router-dom';
import styles from './userpost.module.css';

export default function UserPost() {
  return (
    <main className="container">
      <div className={styles.menu}>
        <div className="row w-100 mt-3">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <div style={{ marginBottom: '1rem' }}>
                  <span className={styles.badgeUser}>User</span>
                </div>
                <h1 className={styles.articuloTitulo}>Secretos de conservación</h1>
                <p className="grey-text text-darken-1">03 de Junio, 2026</p>
                <p className={styles.lead}>
                  Consejos para mantener la frescura y textura de tus tortas por más tiempo en casa.
                </p>
                <hr style={{ margin: '1.5rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />
                <div className={styles.articuloContenido}>
                  <p>
                    No hay nada más triste que guardar un trozo de torta para el día siguiente y notar que el bizcocho se secó o que la hojarasca perdió todo su toque crocante. Después de varios intentos y un par de desastres en mi propia cocina, les comparto mis mejores trucos para mantener los pasteles como recién salidos de la pastelería.
                  </p>
                  <p>
                    <strong>Paso 1 - Corte inteligente:</strong> Si la torta es grande y la vas a guardar por partes, cubre la zona expuesta del corte con un pedazo de papel mantequilla o film plástico pegado directamente al relleno. Esto evita que el aire del refrigerador seque el bizcocho.
                  </p>
                  <p>
                    <strong>Paso 2 - El recipiente adecuado:</strong> Evita guardar los pasteles descubiertos. El frío del refrigerador absorbe la humedad de las masas y, peor aún, los lácteos y el manjar absorben rápido los olores de otros alimentos. Un contenedor hermético (o la misma caja de la pastelería bien cerrada dentro de una bolsa) es vital.
                  </p>
                  <p>
                    <strong>Paso 3 - Hojarasca vs. Bizcocho:</strong> Las tortas de hojarasca son enemigas de la humedad extrema. Si vives en una zona muy húmeda, guarda la torta en el lugar menos frío del refrigerador y sácala unos 15 minutos antes de servir para que el manjar recupere su textura cremosa sin perder lo crocante.
                  </p>
                  <p>
                    <strong>Paso 4 - Congelar si se puede:</strong> Si te sobró mucho, puedes congelar porciones individuales envueltas en alusa plas. Para comerlas, solo déjalas descongelar dentro del refrigerador desde la noche anterior; mantendrán la textura casi intacta.
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
