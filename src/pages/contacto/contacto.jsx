import React, { useState } from 'react';
import styles from './contacto.module.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    if (window.M && window.M.toast) {
      window.M.toast({ html: '¡Mensaje enviado con éxito! Te contactaremos pronto.' });
    }
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  return (
    <main className="container">
      <div className={styles.menu}>
        <section className={styles.mainSection}>
          <h1 className={styles.tituloMenu}>Ponte en Contacto</h1>
          <p className={styles.lead}>
            ¿Tienes dudas sobre nuestros productos o quieres hacer un pedido especial? ¡Escríbenos!
          </p>
        </section>

        <div className="row w-100">
          {/* Formulario */}
          <div className="col s12 m7">
            <div className="card white">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  Envíanos un mensaje
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />

                {enviado && (
                  <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    ¡Gracias por comunicarte! Hemos recibido tu mensaje.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="input-field">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    <label htmlFor="nombre" className={formData.nombre ? 'active' : ''}>
                      Nombre Completo
                    </label>
                  </div>

                  <div className="input-field">
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email" className={formData.email ? 'active' : ''}>
                      Correo Electrónico
                    </label>
                  </div>

                  <div className="input-field">
                    <i className="material-icons prefix">phone</i>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                    <label htmlFor="telefono" className={formData.telefono ? 'active' : ''}>
                      Teléfono de Contacto
                    </label>
                  </div>

                  <div className="input-field">
                    <i className="material-icons prefix">message</i>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      className="materialize-textarea"
                      required
                      value={formData.mensaje}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor="mensaje" className={formData.mensaje ? 'active' : ''}>
                      Mensaje o Consulta
                    </label>
                  </div>

                  <div className="right-align" style={{ marginTop: '1.5rem' }}>
                    <button className={styles.btnEnviar} type="submit">
                      Enviar Mensaje <i className="material-icons right">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Info de contacto */}
          <div className="col s12 m5">
            <div className="card white">
              <div className="card-content">
                <span className={`card-title ${styles.cardTitleBold}`}>
                  Información de Contacto
                </span>
                <hr style={{ margin: '1rem 0', border: 0, borderTop: '1px solid #e0e0e0' }} />

                <ul className="collection" style={{ border: 'none' }}>
                  <li className={`collection-item avatar ${styles.collectionItemAvatar}`}>
                    <i className="material-icons circle orange text-darken-2">place</i>
                    <span className="title" style={{ fontWeight: 'bold' }}>Dirección</span>
                    <p className="grey-text text-darken-1">Av. Principal #1234, Santiago, Chile</p>
                  </li>
                  <li className={`collection-item avatar ${styles.collectionItemAvatar}`}>
                    <i className="material-icons circle orange text-darken-2">phone</i>
                    <span className="title" style={{ fontWeight: 'bold' }}>Teléfono</span>
                    <p className="grey-text text-darken-1">+56 9 1234 5678</p>
                  </li>
                  <li className={`collection-item avatar ${styles.collectionItemAvatar}`}>
                    <i className="material-icons circle orange text-darken-2">access_time</i>
                    <span className="title" style={{ fontWeight: 'bold' }}>Horario de Atención</span>
                    <p className="grey-text text-darken-1">
                      Lunes a Sábado: 09:00 - 20:00 hrs<br />
                      Domingos: 10:00 - 15:00 hrs
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
