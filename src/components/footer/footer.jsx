import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.pageFooter}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className={styles.footerTitle}>Pastelería 1000 Sabores</h5>
            <p className={styles.footerText}>
              Celebrando 50 años de la repostería más dulce y tradicional.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className={styles.footerTitle}>Links</h5>
            <ul>
              <li>
                <Link className={styles.footerLink} to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <div className="container">
          © 2026 - todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
