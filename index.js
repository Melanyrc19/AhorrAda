function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}
//variables
const $menuHamburguesa = $("#menuHamburguesa");
const $botonesMenu = $("#botonesMenu");

const $buttonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");
const $formOperacion = $("#formOperacion");
const $botonOPeracion = $("#btnOperacion");

const $añadirCategoria = $("#añadirCategoria");
const $botonAñadirCategoria = $("#botonAñadirCategoria");
const $botonCategorias = $("#botonCategorias");
const $inputListadosDeCategorias = $("#listadoDeCategorias");



//section
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categorias");
const $contenidoOPeraciones = $("#contenidoOperaciones");

//Evento
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



//obtener elemento dom categoria
const selectCategorias = document.querySelector("#añadirCategoria");
//Agregar categoria
$botonAñadirCategoria.addEventListener("click", () => {
  const categoria = $añadirCategoria.value;
  $añadirCategoria.value = "";
  addCategoria(categoria);
  listadoDeCategorias.innerHTML=""
})

 // Agregar las opciones al select
//   categorias.forEach(categoria => {
//    const option = document.createElement("option");
//     option.value = categoria;
//     option.textContent = categoria;
//     selectCategorias.appendChild(option);
//   });
//  };






// $menuHamburguesa.addEventListener('click',()=>{       hay que agregar que funcione el menu de hamburgesas en mobile y table
//   $botonesMenu.classList.add = "block";
//   $botonesMenu.classList.add = "flex";
// })

//Operaciones
const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));
const addOperacion = (operacion) => {
  setOperaciones([...getOperaciones(), operacion]);
};

// funciones para  guardar datos de operacion:
$formOperacion.addEventListener("submit", (event) => {
  event.preventDefault();
  const operacion = {
    descripcion: event.target.querySelector("[name='descripcion']").value,
    monto: event.target.querySelector("[name='monto']").value,
    tipo: event.target.querySelector("[name='tipo']").value,
    categoria: event.target.querySelector("[name='categoria']").value,
    fecha: event.target.querySelector("[name='fecha']").value,
  };
  console.log(operacion);

  addOperacion(operacion);

  mostrarOperaciones();
});
//funcion para que se pinte:

const mostrarOperaciones = () => {
  const operaciones = getOperaciones();

  // Primero, agregamos los títulos de las columnas (solo una vez)
  let contenidoHTML = `
    <div class="flex justify-between text-xl conteint">
      <p class="py-6 px-4 font-bold">Descripción</p>
      <p class="py-6 px-4 font-bold">Monto</p>
      <p class="py-6 px-4 font-bold">Tipo</p>
      <p class="py-6 px-4 font-bold">Categoría</p>
      <p class="py-6 px-4 font-bold">Fecha</p>
    </div>
  `;

  // Luego, iteramos sobre las operaciones y agregamos sus valores
  for (let i = 0; i < operaciones.length; i++) {
    const op = operaciones[i];

    contenidoHTML += `
      <div class="flex justify-between text-xl conteint">
        <p class="py-6 ">${op.descripcion}</p>
        <p class="py-6">${op.monto}</p>
        <p class="py-6">${op.tipo}</p>
        <p class="py-6">${op.categoria}</p>
        <p class="py-6">${op.fecha}</p>
      </div>
    `;
  }

  // Finalmente, agregamos todo el contenido generado al contenedor
  $contenidoOPeraciones.innerHTML = contenidoHTML;
};

//// Funciones para manejar las categorías en localStorage
const getCategorias = () =>
  JSON.parse(localStorage.getItem("categorias")) || [];
const setCategorias = (categorias) =>
  localStorage.setItem("categorias", JSON.stringify(categorias));

// string -> cine, comida
// objeto -> {nombre:cine,id:1}
const addCategoria = (categoria) => {
  setCategorias([...getCategorias(),categoria]);
};

//

// // Función para actualizar el select de categorías
// const actualizarSelectCategorias = () => {
//   const categorias = getCategorias();
//   const selectCategorias = document.querySelector("#listadoDeCategorias");

//   // Limpiar el select antes de agregar las opciones
//   selectCategorias.innerHTML = '';

//   // Agregar las opciones al select
//   categorias.forEach(categoria => {
//     const option = document.createElement("option");
//     option.value = categoria;
//     option.textContent = categoria;
//     selectCategorias.appendChild(option);
//   });
// };

// // Manejo del formulario para agregar nuevas categorías
// document.querySelector("#añadirCategoria").addEventListener('submit', (event) => {
//   event.preventDefault();

//   // Obtener el valor del input
//   const nuevaCategoria = event.target.querySelector("input[type='text']").value.trim();

//   if (nuevaCategoria !== "") {
//     addCategoria(nuevaCategoria); // Agregar nueva categoría a localStorage
//     actualizarSelectCategorias(); // Actualizar el select
//     event.target.querySelector("input[type='text']").value = ""; // Limpiar el campo de entrada
//   }
// });

// // Inicializar las categorías y actualizar el select
// document.addEventListener("DOMContentLoaded", () => {
//   actualizarSelectCategorias();
// });

// // const actualizarCategorias = ( ) => {

// //   const categorias = getCategorias ();
// //   const $contenedorDeCategorias = $("#listadoDeCategorias");

// //     // Añadir cada categoría al contenedor
// //     console.log(actualizarCategorias);
// //     console.log(cetegorias);

// // };
