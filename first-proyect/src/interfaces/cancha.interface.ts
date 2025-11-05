// ===================================
// src/interfaces/cancha.interface.ts
// ===================================
// Define las PROPIEDADES (requisito de la presentación)
export interface CanchaProps {
    id: number;
    nombre: string;
    tipo: 'Fútbol' | 'Tenis' | 'Básquet';
    precioHora: number;
    capacidad: number;
    imagenUrl: string;
    descripcion: string;
}