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
const getCategorias = () =>
  JSON.parse(localStorage.getItem("categorias")) || ["Comida","Servicio","Salud","Educacion","Trabajo","Transporte"];
const setCategorias = (categorias) =>
  localStorage.setItem("categorias", JSON.stringify(categorias));

const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));

// Funciones de Categorías
const addCategoria = (categoria) => {
  setCategorias([...getCategorias(), categoria]);
};

const mostrarCategorias = () => {
  const categorias = getCategorias();
  let aux = "";
  for (const categoria of categorias) {
    aux += ` 
      <div class="flex flex-row pr-4 pl-4 m-auto ">
        <span>${categoria}</span>
        <div class="flex justify-center w-full gap-4 mx-auto sm:justify-end">
          <button class="text-sky-600">Editar</button>
          <button class="text-sky-600">Eliminar</button>
        </div>
      </div>`;
  }
  $listadoDeCategoriasVista.innerHTML = aux;
};

// Funciones de Operaciones
const addOperacion = (operacion) => {
  setOperaciones([...getOperaciones(), operacion]);
};

const mostrarOperaciones = () => {
  const operaciones = getOperaciones();

  // Primero, agregamos los títulos de las columnas (solo una vez)
  let contenidoHTML = `
  
      <thead>
        <tr class="hidden">
          <th class="">Descripción</th>
          <th class="">Categoria</th>
          <th class="hidden md:block ">Tipo</th>
          <th class="">Monto</th>
          <th class="">Fecha</th>
          <th class="">Acción</th>
        </tr>
      </thead>
      <tbody>`;

  // Luego, iteramos sobre las operaciones y agregamos sus valores
  for (const operacion of operaciones) {
    contenidoHTML += `
      <tr class="flex flex-wrap w-2/3">
        <td class=" text-start m-1">${operacion.descripcion}</td>
        <td class=" text-start mt-1">${operacion.Categoria}</td>
        <td class="hidden md:block  text-start m-1">${operacion.tipo}</td>
        <td class=" text-start m-1">${operacion.monto}</td>
        <td class=" hidden  text-start">${operacion.fecha}</td>
        <td class="hidden md:block  text-start">
          <button onclick="modificarOperacion(${operacion.id})">Modificar</button>
        </td>
      </tr>`;
  }
// desccripcion monto y categoria en sm
  contenidoHTML += `
    </tbody>`;

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