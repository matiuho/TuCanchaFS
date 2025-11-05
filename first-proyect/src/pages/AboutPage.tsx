import type { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2>Quienes somos</h2>
      <p style={{ color: 'var(--muted)' }}>
        En TuCancha conectamos a jugadores con canchas locales. Nuestra misión es
        facilitar reservas rápidas y seguras, y ayudar a las comunidades a organizar
        partidos más fácilmente.
      </p>

      <section style={{ marginTop: 18 }}>
        <h3>Nuestro equipo</h3>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <div style={{ background: 'white', padding: 12, borderRadius: 10, boxShadow: '0 8px 20px rgba(9,30,15,0.04)', flex: 1 }}>
            <strong>Ana</strong>
            <div style={{ color: 'var(--muted)' }}>Co-fundadora • Producto</div>
          </div>
          <div style={{ background: 'white', padding: 12, borderRadius: 10, boxShadow: '0 8px 20px rgba(9,30,15,0.04)', flex: 1 }}>
            <strong>Marco</strong>
            <div style={{ color: 'var(--muted)' }}>Co-fundador • Tecnología</div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Valores</h3>
        <ul style={{ color: 'var(--muted)' }}>
          <li>Comunidad</li>
          <li>Simplicidad</li>
          <li>Seguridad</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
