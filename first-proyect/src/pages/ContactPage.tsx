import type { FC } from 'react';
import { useToast } from '../sharedComponents/components/ToastProvider';
import '../styles/pages/ContactPage.css';

export const ContactPage: FC = () => {
  const { showToast } = useToast();
  return (
    <div className="container contact-page">
      <h2>Contacto</h2>
      <p className="contact-subtitle">
        ¿Tienes preguntas? Escríbenos a <strong>soporte@tucancha.test</strong> y
        te responderemos a la brevedad.
      </p>

      <section className="contact-section">
        <h3>Envíanos un mensaje</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast({
              type: 'success',
              title: 'Mensaje enviado',
              message: 'Gracias por contactarnos. Te responderemos a la brevedad.',
              durationMs: 3500
            });
          }}
          className="contact-form"
        >
          <div className="contact-form-field">
            <label>Nombre</label>
            <input className="search-input" />
          </div>
          <div className="contact-form-field">
            <label>Correo</label>
            <input className="search-input" />
          </div>
          <div className="contact-form-field">
            <label>Mensaje</label>
            <textarea className="search-input contact-textarea" />
          </div>
          <div>
            <button className="btn" type="submit">Enviar</button>
          </div>
        </form>
      </section>

      <section className="contact-section">
        <h3>Redes</h3>
        <div className="contact-social">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="contact-social-link">X</a>
          <a href="#" className="contact-social-link">Instagram</a>
          <a href="#" className="contact-social-link">Facebook</a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
