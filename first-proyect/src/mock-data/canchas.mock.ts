// ===================================
// src/mock-data/canchas.mock.ts
// ===================================
import type { CanchaProps } from "../interfaces/cancha.interface";

// Datos de prueba (Mocks)
export const mockCanchas: CanchaProps[] = [
    { id: 1, nombre: 'Cancha Central', tipo: 'Fútbol', precioHora: 25000, capacidad: 22, imagenUrl: 'https://cncs.cl/wp-content/uploads/2024/05/FUTB.jpg', descripcion: 'Cancha principal de césped sintético para 11 jugadores.', fotos: ['https://i.imgur.com/vHqJ9U3.png'] },
    { id: 2, nombre: 'Cancha Lateral A', tipo: 'Fútbol', precioHora: 18000, capacidad: 14, imagenUrl: 'https://i.imgur.com/N8g1r7l.png', descripcion: 'Cancha de arcilla con iluminación para 7 jugadores.' },
    { id: 3, nombre: 'Cancha 5 (Futsal)', tipo: 'Futsal', precioHora: 20000, capacidad: 5, imagenUrl: 'https://www.futbolitolavara.cl/img/fotos/1.jpg', descripcion: 'Cancha de futsal techada.', fotos: ['https://i.imgur.com/9C3F0qZ.png'] },
    { id: 4, nombre: 'Cancha Río Verde', tipo: 'Fútbol', precioHora: 15000, capacidad: 22, imagenUrl: 'https://static.wixstatic.com/media/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg/v1/fill/w_250,h_166,al_c,q_90,enc_auto/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg', descripcion: 'Cancha al aire libre con buen drenaje para 11 jugadores.', fotos: ['https://i.imgur.com/3Qw8V0b.png'] },
    { id: 5, nombre: 'Cancha Parque Norte', tipo: 'Fútbol', precioHora: 22000, capacidad: 14, imagenUrl: 'http://www.costanerasport.cl/images/reservas/05.jpg', descripcion: 'Ideal para partidos nocturnos de 7 jugadores.', fotos: ['https://i.imgur.com/1X4fR9K.png'] },
    { id: 6, nombre: 'Cancha Techada Sur', tipo: 'Futsal', precioHora: 27000, capacidad: 10, imagenUrl: 'https://techone.cl/loshalcones/images/cancha-futbolito.jpg', descripcion: 'Techada y con calefacción.', fotos: ['https://i.imgur.com/4Vg7sKQ.png'] },
];