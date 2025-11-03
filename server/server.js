// /server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Importamos los datos (ahora es un objeto con .canchas y .reservas)
let data = require('./data.js');
let canchas = data.canchas;
let reservas = data.reservas;

// Middlewares
app.use(cors());
app.use(express.json());

// ----------------------------------------
// --- RUTAS API PARA "CANCHAS" ---
// ----------------------------------------

// GET (Leer todas las canchas)
app.get('/api/canchas', (req, res) => {
  res.json(canchas);
});

// GET (Leer UNA cancha por ID)
app.get('/api/canchas/:id', (req, res) => {
  const cancha = canchas.find(c => c.id === parseInt(req.params.id));
  if (!cancha) {
    return res.status(404).send('Cancha no encontrada.');
  }
  res.json(cancha);
});

// (Podrías añadir POST, PUT, DELETE para canchas si tuvieras un panel de admin)

// ----------------------------------------
// --- RUTAS API PARA "RESERVAS" ---
// ----------------------------------------

// GET (Leer todas las reservas)
app.get('/api/reservas', (req, res) => {
  // Opcional: filtrar por fecha, ej: /api/reservas?fecha=2025-11-04
  if (req.query.fecha) {
    const reservasPorFecha = reservas.filter(r => r.fecha === req.query.fecha);
    return res.json(reservasPorFecha);
  }
  res.json(reservas);
});

// GET (Leer UNA reserva por ID)
app.get('/api/reservas/:id', (req, res) => {
  const reserva = reservas.find(r => r.id === parseInt(req.params.id));
  if (!reserva) {
    return res.status(404).send('Reserva no encontrada.');
  }
  res.json(reserva);
});

// POST (Crear una nueva reserva)
app.post('/api/reservas', (req, res) => {
  // Simulación de ID automático
  const newId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 101;
  
  const newReserva = {
    id: newId,
    canchaId: req.body.canchaId,
    cliente: req.body.cliente,
    fecha: req.body.fecha,
    horaInicio: req.body.horaInicio,
    horaFin: req.body.horaFin,
    totalPagado: req.body.totalPagado 
  };
  
  // (Aquí iría la lógica para validar que la hora no esté tomada)
  
  reservas.push(newReserva);
  res.status(201).json(newReserva);
});

// DELETE (Cancelar una reserva)
app.delete('/api/reservas/:id', (req, res) => {
  const reservaIndex = reservas.findIndex(r => r.id === parseInt(req.params.id));
  if (reservaIndex === -1) {
    return res.status(404).send('Reserva no encontrada.');
  }
  
  const deletedReserva = reservas.splice(reservaIndex, 1);
  res.json(deletedReserva[0]);
});

// --- Iniciar el servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor de Arriendo de Canchas corriendo en http://localhost:${PORT}`);
});