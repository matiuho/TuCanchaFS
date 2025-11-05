// ===================================
// src/mock-data/canchas.mock.ts
// ===================================
import type { CanchaProps } from "../interfaces/cancha.interface";

// Datos de prueba (Mocks)
export const mockCanchas: CanchaProps[] = [
    { id: 1, nombre: 'Cancha Central', tipo: 'Fútbol', precioHora: 25000, capacidad: 22, imagenUrl: 'https://i.imgur.com/vHqJ9U3.png', descripcion: 'Cancha principal de césped sintético para 11 jugadores.' },
    { id: 2, nombre: 'Cancha Lateral A', tipo: 'Fútbol', precioHora: 18000, capacidad: 14, imagenUrl: 'https://i.imgur.com/N8g1r7l.png', descripcion: 'Cancha de arcilla con iluminación para 7 jugadores.' },
    { id: 3, nombre: 'Cancha 5 (Futsal)', tipo: 'Futsal', precioHora: 20000, capacidad: 5, imagenUrl: 'https://i.imgur.com/9C3F0qZ.png', descripcion: 'Cancha de futsal techada.' },
    { id: 4, nombre: 'Cancha Río Verde', tipo: 'Fútbol', precioHora: 15000, capacidad: 22, imagenUrl: 'https://i.imgur.com/3Qw8V0b.png', descripcion: 'Cancha al aire libre con buen drenaje para 11 jugadores.' },
    { id: 5, nombre: 'Cancha Parque Norte', tipo: 'Fútbol', precioHora: 22000, capacidad: 14, imagenUrl: 'https://i.imgur.com/1X4fR9K.png', descripcion: 'Ideal para partidos nocturnos de 7 jugadores.' },
    { id: 6, nombre: 'Cancha Techada Sur', tipo: 'Futsal', precioHora: 27000, capacidad: 10, imagenUrl: 'https://i.imgur.com/4Vg7sKQ.png', descripcion: 'Techada y con calefacción.' },
];