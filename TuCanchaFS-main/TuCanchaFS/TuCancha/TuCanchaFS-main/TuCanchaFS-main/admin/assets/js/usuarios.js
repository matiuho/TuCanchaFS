// Datos de prueba de usuarios
const usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Admin" },
    { id: 2, nombre: "María López", email: "maria@example.com", rol: "Editor" },
    { id: 3, nombre: "Carlos Díaz", email: "carlos@example.com", rol: "Usuario" },
    { id: 4, nombre: "Ana Torres", email: "ana@example.com", rol: "Usuario" },
    { id: 5, nombre: "Luis Fernández", email: "luis@example.com", rol: "Editor" }
];

// Mostrar usuarios en la tabla
const tbody = document.querySelector("#tablaUsuarios tbody");

usuarios.forEach(u =>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${u.id}</td>
    <td>${u.nombre}</td>
    <td>${u.email}</td>
    <td>${u.rol}</td>
    <td>
      <a href="usuario-editar.html" class="btn">✏️ Editar</a>
      <a href="usuario-eliminar.html" class="btn">🗑️ Eliminar</a>
    </td>
  `;
    tbody.appendChild(tr);
});
