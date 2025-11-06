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
        <h3>Nuestros Fundadores</h3>
        <p style={{ color: 'var(--muted)' }}>
          Somos Samuel Villanueva y Matías Concha. A nuestra corta edad, somos capaces de reconocer lo que la gente busca,
          y por eso estamos comprometidos a mejorar la experiencia de reserva de canchas a través de esta plataforma web.
        </p>
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
