// /server/data.js

// Lista de canchas (la información estática de las canchas)
let canchas = [
  { 
    id: 1, 
    nombre: "Cancha 1 - Fútbol 5", 
    tipo: "Fútbol", 
    superficie: "Pasto Sintético",
    precioPorHora: 25000 
  },
  { 
    id: 2, 
    nombre: "Cancha 2 - Tenis", 
    tipo: "Tenis", 
    superficie: "Arcilla",
    precioPorHora: 15000 
  },
  { 
    id: 3, 
    nombre: "Cancha 3 - Pádel", 
    tipo: "Pádel", 
    superficie: "Pasto Sintético",
    precioPorHora: 20000 
  }
];

// Lista de reservas (los arriendos que se van creando)
let reservas = [
  {
    id: 101,
    canchaId: 1, // Corresponde a la Cancha 1
    cliente: "Ignacio Pérez",
    fecha: "2025-11-04", // Formato AAAA-MM-DD
    horaInicio: "19:00",
    horaFin: "20:00",
    totalPagado: 25000
  },
  {
    id: 102,
    canchaId: 3, // Corresponde a la Cancha 3
    cliente: "María González",
    fecha: "2025-11-05",
    horaInicio: "20:00",
    horaFin: "21:30",
    totalPagado: 30000 // (1.5 horas)
  }
];

// Exportamos ambos conjuntos de datos
module.exports = {
  canchas,
  reservas
};