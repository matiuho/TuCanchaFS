// ===================================
// src/interfaces/cancha.interface.ts
// ===================================
// Define las PROPIEDADES (requisito de la presentación)
export interface CanchaProps {
    id: number;
    nombre: string;
    tipo: 'Fútbol' | 'Futsal';
    precioHora: number;
    enOferta?: boolean;
    precioOferta?: number;
    capacidad: number;
    imagenUrl: string;
    descripcion: string;
    fotos?: string[]; // nuevas fotos adicionales opcionales
}