// ===================================
// src/interfaces/cancha.interface.ts
// ===================================
// Define las PROPIEDADES (requisito de la presentación)
export interface CanchaProps {
    id: number;
    nombre: string;
    tipo: string; // Cambiado para aceptar cualquier string del backend
    precioHora: number;
    enOferta?: boolean;
    precioOferta?: number;
    capacidad: number;
    imagenUrl: string;
    descripcion: string;
    ubicacion?: string;
    fotos?: string[]; // nuevas fotos adicionales opcionales
    createdAt?: string;
    updatedAt?: string;
}