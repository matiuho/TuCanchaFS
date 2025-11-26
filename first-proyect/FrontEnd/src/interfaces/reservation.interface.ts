export interface Reservation {
  id?: number;
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
  cancha: string;
  canchaId: number;
  cantidadHoras: number;
  precioTotal: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
}
