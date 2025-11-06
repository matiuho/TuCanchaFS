// src/mock-data/blogs.mock.ts
import type { BlogPost } from '../interfaces/blog.interface';

export const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: '¡Nuevas Canchas de Fútbol 5 en el Corazón de la Ciudad!',
    summary: 'Estamos emocionados de anunciar la inauguración de nuestro nuevo complejo de Fútbol 5 con 2 canchas de césped sintético. Ven a conocerlas y aprovecha nuestras promociones de apertura.',
    content: 'El Fútbol 5 sigue creciendo y en TuCancha no nos quedamos atrás. A partir de hoy, puedes reservar en nuestro nuevo complejo "Fútbol Urbano", ubicado estratégicamente para que llegues desde cualquier punto de la ciudad. Las instalaciones cuentan con iluminación LED profesional, vestidores de primer nivel y una cafetería para que te relajes después del partido. ¡No esperes más y sé el primero en estrenarlas!',
    author: 'Ana',
    date: '15 de Julio, 2023',
  imageUrl: 'https://cncs.cl/wp-content/uploads/2024/05/FUTB.jpg',
  },
  {
    id: 2,
    title: 'Inauguramos Complejo de Fútbol 7 con Césped de Última Generación',
    summary: 'El fútbol nos une, y ahora tendrás un nuevo lugar para disfrutarlo. Nuestro complejo "El Potrero Moderno" abre sus puertas con dos canchas de Fútbol 7 equipadas con el mejor césped sintético del mercado.',
    content: 'Después de meses de trabajo, finalmente podemos dar la bienvenida a todos los amantes del fútbol a "El Potrero Moderno". Este nuevo espacio ha sido diseñado pensando en el jugador: césped sintético con certificación FIFA Quality Pro que minimiza el riesgo de lesiones, mallas de contención altas y un sistema de reserva online integrado con TuCancha para que asegures tu horario sin complicaciones. Reúne a tu equipo y ven a vivir la mejor experiencia de Fútbol 7.',
    author: 'Marco',
    date: '22 de Julio, 2023',
    imageUrl: 'https://techone.cl/loshalcones/images/cancha-futbolito.jpg',
  },
];