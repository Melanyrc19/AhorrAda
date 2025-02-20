// Funciones utilitarias
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Variables
// Menu
const $menuHamburguesa = $("#menuHamburguesa");
const $botonesMenu = $("#botonesMenu");

// Balance y Operación
const $buttonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");
const $formOperacion = $("#formOperacion");
const $botonOPeracion = $("#btnOperacion");

// Categorías
const $añadirCategoria = $("#añadirCategoria");
const $botonAñadirCategoria = $("#botonAñadirCategoria");
const $botonCategorias = $("#botonCategorias");
const $inputListadosDeCategorias = $("#listadoDeCategorias");
const $listadoDeCategoriasVista = $("#listadoDeCategoriasVista");
const $inputEditarCategorias = $("#inputEditarCategorias");

// Secciones
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categorias");
const $contenidoOperaciones = $("#contenidoOperaciones");
const $seccionEditarOperacion = $("#seccionEditarOperacion");

// Funciones para localStorage
// Funciones de Categorías    aca hay un problema al borrar todos los datos en la consola:
const getCategorias = () =>
  JSON.parse(localStorage.getItem("categorias")) || [
    { id: crypto.randomUUID(), nombre: "Comida" },
    { id: crypto.randomUUID(), nombre: "Servicio" },
    { id: crypto.randomUUID(), nombre: "Salud" },
    { id: crypto.randomUUID(), nombre: "Educacion" },
    { id: crypto.randomUUID(), nombre: "Trabajo" },
    { id: crypto.randomUUID(), nombre: "Transporte" },
  ];

const setCategorias = (categorias) =>
  localStorage.setItem("categorias", JSON.stringify(categorias));
const addCategoria = (categoriaNombre) => {
  const nuevaCategoria = { id: crypto.randomUUID(), nombre: categoriaNombre };
  setCategorias([...getCategorias(), nuevaCategoria]);
};

// Funciones de Operaciones
const clearOp = () =>{
  localStorage.removeItem("operaciones")
}
const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];

const getOperacion = (id) =>
  getOperaciones().find(operacion => operacion.id == id);

const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));

const addOperacion = (operacion) => {
  operacion.id = crypto.randomUUID();
  setOperaciones([...getOperaciones(), operacion]);
};
// funcion para actualizar las nuevas categorias al selec
const mostrarCategoriasEnSelect = () => {
  const categorias = getCategorias();
  const selectCategoria = $("[name='categoria']");

  selectCategoria.innerHTML = "";

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nombre;
    selectCategoria.appendChild(option);
  });
};

const mostrarCategorias = () => {
  const categorias = getCategorias();
  mostrarCategoriasEnSelect(); //se actualiza categorias
  let aux = "";

  for (const categoria of categorias) {
    aux += ` 
     <div id="${categoria.id}" class="flex flex-row pr-4 pl-4 m-auto ">
      <span>${categoria.nombre}</span>
      <div class="flex justify-center w-full gap-4 mx-auto sm:justify-end">
        <button class="text-sky-600 botonEditar" data-id="${categoria.id}">Editar</button>
        <button class="text-sky-600 botonEliminar" data-id="${categoria.id}">Eliminar</button>
      </div>
    </div>`;
  }
  listadoDeCategoriasVista.innerHTML = aux;

  const arrayBotonEliminar = $$(".botonEliminar");
  const arrayBotonEditar = $$(".botonEditar");

  arrayBotonEliminar.forEach((button) => {
    button.addEventListener("click", (e) => {
      quitarCategoria(e.target.dataset.id);
    });
  });
  arrayBotonEditar.forEach((button) => {
    button.addEventListener("click", (e) => {
      editarCategoria(e.target.dataset.id);
      $inputEditarCategorias.classList.toglee = "hidden";
    });
  });
};

function quitarCategoria(id) {
  let categorias = getCategorias();
  categorias = categorias.filter((categoria) => categoria.id !== id);
  setCategorias(categorias);
  mostrarCategorias();
}
function editarCategoria(id) {
  let categorias = getCategorias();
  const categoria = categorias.find((categoria) => categoria.id === id);

  if (categoria) {
    const formEditar = $("#inputEditarCategorias");
    formEditar.classList.remove("hidden");
    $sectionCategoria.classList.add("hidden");

    const inputCategoriaNombre = $("#inputCategoriaNombre");
    inputCategoriaNombre.value = categoria.nombre;

    const botonEditarCategoria = $("#botonEditarCategoriaInput");

    botonEditarCategoria.addEventListener("click", () => {
      const nuevoNombre = inputCategoriaNombre.value;

      if (nuevoNombre) {
        categoria.nombre = nuevoNombre;
        setCategorias(categorias);
        mostrarCategorias();

        formEditar.classList.add("hidden");
        $sectionCategoria.classList.remove("hidden");
      }
    });
  }
}

const mostrarOperaciones = () => {
  const operaciones = getOperaciones();
  const categorias = getCategorias();

  let contenidoHTML = `
    <thead>
      <tr>
        <th class="text-left font-bold text-sm py-3 px-4">Descripción</th>
        <th class="text-left font-bold text-sm py-3 px-4">Categoría</th>
        <th class="hidden md:block text-left font-bold text-sm py-3 px-4">Tipo</th>
        <th class="text-right font-bold text-sm py-3 px-4">Monto</th>
        <th class="text-left font-bold text-sm py-3 px-4">Fecha</th>
        <th class="text-left font-bold text-sm py-3 px-4">Acción</th>
      </tr>
    </thead>
    <tbody>`;

  // Iteramos sobre las operaciones
  for (const operacion of operaciones) {
    // Encontramos la categoría correspondiente a esta operación
    const categoria = categorias.find(
      (categoriaParametro) => categoriaParametro.id === operacion.categoria
    );
    const nombreCategoria = categoria
      ? categoria.nombre
      : "Categoría no encontrada";

    contenidoHTML += `
            <tr class="text-sm ">
        <td class="text-left px-4 py-3">${operacion.descripcion}</td>
        <td class="text-left px-4 py-3">${nombreCategoria}</td> 
        <td class="hidden md:block text-left px-4 py-3">${operacion.tipo}</td>
        <td class="text-right px-4 py-3 font-semibold">${operacion.monto}</td>
        <td class="text-left px-4 py-3">${operacion.fecha}</td>
        <td class="text-left px-4 py-3">
          <button class="text-sky-600 botonEditar" data-id="${operacion.id}">Editar</button>
          <button class="text-sky-600 botonEliminar" data-id="${operacion.id}">Eliminar</button
        </td>
      </tr>`;
  }

  contenidoHTML += `</tbody>`;
  $contenidoOperaciones.innerHTML = contenidoHTML;

  const botonesEditar = $$(".botonEditar");
  for (const botonEditar of botonesEditar) {
    botonEditar.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const operacion = getOperacion(id)
      $sectionBalance.classList.add("hidden")
      const categorias = getCategorias();
      let aux = "";
      for (const categoria of categorias) {
        aux += `<option value= "${categoria.id}" ${categoria.id ===operaciones.categoria ? "selected" : ""} > ${categoria.nombre} </option>`
      }
      
      let editarform = `<form class=" rounded-lg shadow-lg bg-white my-6 mx-8" id="formEditarOperacion">
                <div class="text-lg font-semibold px-4 py-2">Editar Operación</div>
                <div class="p-4">
                  <div class="mb-8">
                    <label class="block text-sm font-medium text-gray-700">Descripción</label>
                    <input id="editarDescripcion" value="${operacion.descripcion}" type="text" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Monto</label>
                    <input value="${operacion.monto}" id="editarMonto" type="number" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Tipo</label>
                    <select id="editarTipo" class="w-full mt-1 p-2 border rounded-md">
                      <option>Ganancias</option>
                      <option>Gastos</option>
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Categoría</label>
                    <select  "id="editarCategoria" class="w-full mt-1 p-2 border rounded-md">
                      ${aux}
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Fecha</label>
                    <input id="editarFecha" value="${operacion.fecha}" type="date" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="flex justify-center w-full gap-4 mx-auto sm:justify-end">
                    <button id="btnGuardarOperacion" type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
                      Guardar Cambios
                    </button>
                    <button id="btnCancelarEdicion" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>`
              $seccionEditarOperacion.innerHTML = editarform;
    });
    
  }
};

// function editarOperacion(id) {
//   // Buscar la operación en el localStorage por ID
//   const operaciones = getOperaciones();
//   const operacion = operaciones.find(operacion => operacion.id === id);

//   if (operacion) {
//     // Rellenar los campos con los valores actuales
//     $("#editarDescripcion").value = operacion.descripcion;
//     $("#editarMonto").value = operacion.monto;
//     $("#editarTipo").value = operacion.tipo;
//     $("#editarCategoria").value = operacion.categoria;
//     $("#editarFecha").value = operacion.fecha;

//     // Mostrar el formulario de edición y ocultar el formulario de operaciones
//     $sectionOperacion.classList.add("hidden");
//     $sectionBalance.classList.add("hidden");
//     $sectionCategoria.classList.add("hidden");
//     $("#editarOperacion").classList.remove("hidden");

//     // Actualizar la lista de categorías en el select de edición
//     mostrarCategoriasEnSelect(); // Asegúrate de que las categorías estén actualizadas en el select
//   }
// }

// Eventos de navegación
$buttonBalance.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
  $sectionOperacion.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
});

$botonAgregar.addEventListener("click", () => {
  $sectionOperacion.classList.remove("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
});

$botonOPeracion.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.remove("hidden");
  $sectionCategoria.classList.add("hidden");
});

$botonCategorias.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.remove("hidden");
  $inputEditarCategorias.classList.add("hidden");
});

// Eventos de Categorías
$botonAñadirCategoria.addEventListener("click", () => {
  const categoria = $añadirCategoria.value;
  $añadirCategoria.value = "";
  addCategoria(categoria);
  mostrarCategorias();
});

// Evento de Operación
$formOperacion.addEventListener("submit", (event) => {
  event.preventDefault();
  const operacion = {
    descripcion: event.target.querySelector("[name='descripcion']").value,
    monto: event.target.querySelector("[name='monto']").value,
    tipo: event.target.querySelector("[name='tipo']").value,
    categoria: event.target.querySelector("[name='categoria']").value,
    fecha: event.target.querySelector("[name='fecha']").value,
  };
  addOperacion(operacion);
  mostrarOperaciones();
});

// Inicialización
mostrarCategorias();
mostrarOperaciones();
