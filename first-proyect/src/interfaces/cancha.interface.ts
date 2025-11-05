// ===================================
// src/interfaces/cancha.interface.ts
// ===================================
// Define las propiedades que debe tener cada objeto de cancha
export interface CanchaProps {
    id: number;
    nombre: string;
    tipo: 'Fútbol' | 'Tenis' | 'Básquet';
    precioHora: number;
    capacidad: number;
    imagenUrl: string;
    descripcion: string;
}

// Interfaz para el objeto que devuelve la API (Lista)
export interface CanchaListResponse {
    ok: boolean;
    statusCode: number;
    canchas: CanchaProps[]; 
}