// ===================================
// src/mock-data/canchas.mock.ts
// ===================================
// ===================================
// src/mock-data/canchas.mock.ts
// ===================================
import type { CanchaProps } from "../interfaces/cancha.interface";

// Datos de prueba que simulan una base de datos de canchas
export const mockCanchas: CanchaProps[] = [
    { id: 1, nombre: 'Cancha Central', tipo: 'Fútbol', precioHora: 25000, capacidad: 10, imagenUrl: 'https://i.imgur.com/vHqJ9U3.png', descripcion: 'Cancha principal de césped sintético.' },
    { id: 2, nombre: 'Cancha Lateral A', tipo: 'Tenis', precioHora: 18000, capacidad: 2, imagenUrl: 'https://i.imgur.com/N8g1r7l.png', descripcion: 'Cancha de arcilla con iluminación.' },
    { id: 3, nombre: 'Cancha 5 (Futsal)', tipo: 'Fútbol', precioHora: 20000, capacidad: 5, imagenUrl: 'https://i.imgur.com/9C3F0qZ.png', descripcion: 'Cancha de futsal techada.' },
    { id: 4, nombre: 'Cancha de Barrio', tipo: 'Básquet', precioHora: 15000, capacidad: 10, imagenUrl: 'https://i.imgur.com/3qP9k2c.png', descripcion: 'Cancha exterior con buena iluminación.' },
];