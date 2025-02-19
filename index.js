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

// Secciones
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categorias");
const $contenidoOPeraciones = $("#contenidoOperaciones");

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
const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));
const addOperacion = (operacion) => {
  setOperaciones([...getOperaciones(), operacion]);
};
// funcion para actualizar las nuevas categorias al selec
const mostrarCategoriasEnSelect = () => {
  const categorias = getCategorias();
  const selectCategoria = $("[name='categoria']"); 
  
  selectCategoria.innerHTML = '';

  categorias.forEach(categoria => {
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
    const nuevoNombre = prompt("Ingresa el nuevo nombre de la categoría:", categoria.nombre);
    if (nuevoNombre) {
      categoria.nombre = nuevoNombre;
      setCategorias(categorias);
      mostrarCategorias();

    }
  }
}

const mostrarOperaciones = () => {
  const operaciones = getOperaciones();
  const categorias = getCategorias(); // Obtenemos todas las categorías

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
    const categoria = categorias.find(categoriaParametro => categoriaParametro.id === operacion.categoria);
    const nombreCategoria = categoria ? categoria.nombre : "Categoría no encontrada";

    contenidoHTML += `
      <tr class="text-sm">
        <td class="text-left px-4 py-3">${operacion.descripcion}</td>
        <td class="text-left px-4 py-3">${nombreCategoria}</td> <!-- Mostramos el nombre de la categoría -->
        <td class="hidden md:block text-left px-4 py-3">${operacion.tipo}</td>
        <td class="text-right px-4 py-3 font-semibold">${operacion.monto}</td>
        <td class="text-left px-4 py-3">${operacion.fecha}</td>
        <td class="text-left px-4 py-3">
          <button onclick="modificarOperacion(${operacion.id})" class="">Modificar</button>
        </td>
      </tr>`;
  }

  contenidoHTML += `</tbody>`;
  $contenidoOPeraciones.innerHTML = contenidoHTML;
};

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
});

// Eventos de Categorías
$botonAñadirCategoria.addEventListener("click", () => {
  const categoria = $añadirCategoria.value;
  $añadirCategoria.value = "";
  addCategoria(categoria);
  mostrarCategorias();
  serNuevaCategoria();

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
