const API_URL = "http://localhost:3000/productos";

const form = document.getElementById("formproductos");
const tabla = document.querySelector("#tablaproductos tbody");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const categoriaInput = document.getElementById("categoria");

// ====== Cargar productos ======
async function cargarproductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  tabla.innerHTML = "";

  productos.forEach(u => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.precio}</td>
      <td>${u.categoria}</td>
      <td>
        <button class="btn btn-warning btn-sm btn-editar"
                data-id="${u.id}"
                data-nombre="${u.nombre}"
                data-precio="${u.precio}"
                data-categoria="${u.categoria}">
          Editar
        </button>
        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${u.id}">
          Eliminar
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// ====== Delegación de eventos para editar/eliminar ======
tabla.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.classList.contains("btn-editar")) {
    editarProducto(
      btn.dataset.id,
      btn.dataset.nombre,
      btn.dataset.precio,
      btn.dataset.categoria
    );
  }

  if (btn.classList.contains("btn-eliminar")) {
    eliminarProducto(btn.dataset.id);
  }
});

// ====== Crear o Actualizar Producto ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = idInput.value;
  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);
  const categoria = categoriaInput.value.trim();

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!nombre || isNaN(precio) || !categoria) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (!soloLetras.test(nombre)) {
    alert("El nombre solo debe contener letras y espacios.");
    return;
  }

  const datos = { nombre, precio, categoria };
  const opciones = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  };

  const url = id ? `${API_URL}/${id}` : API_URL;
  await fetch(url, opciones);

  form.reset();
  idInput.value = "";
  btnCancelar.style.display = "none";
  btnGuardar.textContent = "Guardar";
  cargarproductos();
});

// ====== Editar Producto ======
function editarProducto(id, nombre, precio, categoria) {
  idInput.value = id;
  nombreInput.value = nombre;
  precioInput.value = precio;
  categoriaInput.value = categoria;
  btnGuardar.textContent = "Actualizar";
  btnCancelar.style.display = "inline-block";
}

// ====== Cancelar edición ======
btnCancelar.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
  btnGuardar.textContent = "Guardar";
  btnCancelar.style.display = "none";
});

// ====== Eliminar Producto ======
async function eliminarProducto(id) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarproductos();
  }
}

// ====== Inicializar ======
cargarproductos();