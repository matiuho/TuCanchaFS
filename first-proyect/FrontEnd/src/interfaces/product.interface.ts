export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  descripcion?: string;
  categoria?: string;
  stock?: number;
}
