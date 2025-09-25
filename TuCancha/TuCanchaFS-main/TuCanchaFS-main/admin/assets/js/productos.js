HEAD
// Datos de prueba de productos
const productos = [
    { id: 1, nombre: "Cancha 1 - Plaza Norte", precio: 10000, categoria: "Arriendo" },
    { id: 2, nombre: "Cancha 2 - Vitacura", precio: 15000, categoria: "Arriendo" },
    { id: 3, nombre: "Cancha 3 - Mall Sport", precio: 15000, categoria: "Arriendo" },
    { id: 4, nombre: "Cancha 4 . Las Condes", precio: 15000, categoria: "Arriendo" },
    { id: 5, nombre: "Cancha 5 - Adidas", precio: 20000, categoria: "Arriendo" },
    { id: 6, nombre: "Cancha 6 . MultiCancha Sport", precio: 20000, categoria: "Arriendo"}
];

// Mostrar productos en la tabla
const tbody = document.querySelector("#tablaProductos tbody");

productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${p.id}</td>
    <td>${p.nombre}</td>
    <td>$${p.precio}</td>
    <td>${p.categoria}</td>
    <td>
      <a href="producto-editar.html" class="btn">✏️ Editar</a>
      <a href="producto-eliminar.html" class="btn">🗑️ Eliminar</a>
    </td>
  `;
    tbody.appendChild(tr);
});

// Datos de prueba de productos
const productos = [
    { id: 1, nombre: "Cancha 1 - Plaza Norte", precio: 10000, categoria: "Arriendo" },
    { id: 2, nombre: "Cancha 2 - Vitacura", precio: 15000, categoria: "Arriendo" },
    { id: 3, nombre: "Cancha 3 - Mall Sport", precio: 15000, categoria: "Arriendo" },
    { id: 4, nombre: "Cancha 4 . Las Condes", precio: 15000, categoria: "Arriendo" },
    { id: 5, nombre: "Cancha 5 - Adidas", precio: 20000, categoria: "Arriendo" },
    { id: 6, nombre: "Cancha 6 . MultiCancha Sport", precio: 20000, categoria: "Arriendo"}
];

// Mostrar productos en la tabla
const tbody = document.querySelector("#tablaProductos tbody");

productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${p.id}</td>
    <td>${p.nombre}</td>
    <td>$${p.precio}</td>
    <td>${p.categoria}</td>
    <td>
      <a href="producto-editar.html" class="btn">✏️ Editar</a>
      <a href="producto-eliminar.html" class="btn">🗑️ Eliminar</a>
    </td>
  `;
    tbody.appendChild(tr);
});

