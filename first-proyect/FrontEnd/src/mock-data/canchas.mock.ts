// ===================================
// src/mock-data/canchas.mock.ts
// ===================================
import type { CanchaProps } from "../interfaces/cancha.interface";

// Datos de prueba (Mocks)
export const mockCanchas: CanchaProps[] = [
    { id: 1, nombre: 'Cancha Central', tipo: 'Fútbol', precioHora: 25000, capacidad: 22, imagenUrl: 'https://cncs.cl/wp-content/uploads/2024/05/FUTB.jpg', descripcion: 'Cancha principal de césped sintético para 11 jugadores.', ubicacion: 'Las Condes, Santiago' },
    { id: 2, nombre: 'Cancha Lateral A', tipo: 'Fútbol', precioHora: 18000, capacidad: 14, imagenUrl: 'https://pastojansen.cl/wp-content/uploads/2018/08/PORTAFOLIO1.png', descripcion: 'Cancha de arcilla con iluminación para 7 jugadores.', ubicacion: 'Providencia, Santiago' },
    { id: 3, nombre: 'Cancha 5 (Futsal)', tipo: 'Futsal', precioHora: 20000, capacidad: 5, imagenUrl: 'https://www.futbolitolavara.cl/img/fotos/1.jpg', descripcion: 'Cancha de futsal techada.', ubicacion: 'Maipú, Santiago' },
    { id: 4, nombre: 'Cancha Río Verde', tipo: 'Fútbol', precioHora: 15000, capacidad: 22, imagenUrl: 'https://static.wixstatic.com/media/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg/v1/fill/w_250,h_166,al_c,q_90,enc_auto/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg', descripcion: 'Cancha al aire libre con buen drenaje para 11 jugadores.', ubicacion: 'Viña del Mar, Valparaíso' },
    { id: 5, nombre: 'Cancha Parque Norte', tipo: 'Fútbol', precioHora: 22000, capacidad: 14, imagenUrl: 'http://www.costanerasport.cl/images/reservas/05.jpg', descripcion: 'Ideal para partidos nocturnos de 7 jugadores.', ubicacion: 'La Florida, Santiago' },
    { id: 6, nombre: 'Cancha Techada Sur', tipo: 'Futsal', precioHora: 27000, capacidad: 10, imagenUrl: 'https://techone.cl/loshalcones/images/cancha-futbolito.jpg', descripcion: 'Techada y con calefacción.', ubicacion: 'Concepción, Biobío' },
];