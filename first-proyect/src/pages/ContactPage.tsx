import type { FC } from 'react';
import { useToast } from '../sharedComponents/components/ToastProvider';

export const ContactPage: FC = () => {
  const { showToast } = useToast();
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2>Contacto</h2>
      <p style={{ color: 'var(--muted)' }}>
        ¿Tienes preguntas? Escríbenos a <strong>soporte@tucancha.test</strong> y
        te responderemos a la brevedad.
      </p>

      <section style={{ marginTop: 18 }}>
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
          style={{ maxWidth: 560 }}
        >
          <div style={{ marginBottom: 8 }}>
            <label>Nombre</label>
            <input className="search-input" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Correo</label>
            <input className="search-input" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Mensaje</label>
            <textarea className="search-input" style={{ minHeight: 120 }} />
          </div>
          <div>
            <button className="btn" type="submit">Enviar</button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Redes</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'var(--topbar)' }}>X</a>
          <a href="#" style={{ color: 'var(--topbar)' }}>Instagram</a>
          <a href="#" style={{ color: 'var(--topbar)' }}>Facebook</a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
