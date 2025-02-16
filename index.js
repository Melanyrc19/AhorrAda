function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}
//variables
const $menuHamburguesa = $("#menuHamburguesa")
const $botonesMenu = $("#botonesMenu")


const $buttonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");
const $formOperacion = $("#formOperacion");
const $botonOPeracion = $("#btnOperacion");
const $botonCancelarOperacion = $("#botonCancelarOperacion")

const $formAñadirCategoria = $("#añadirCategoria")
const $botonAñadirCategoria = $("botonAñadirCategoria")
const $botonCategorias = $("#botonCategorias");
const $inputListadosDeCategorias = $("#listadoDeCategorias")

//section 
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categorias")
const $contenidoOPeraciones = $("#contenidoOperaciones")


//Evento 
$buttonBalance.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
  $sectionOperacion.classList.add("hidden")
  $sectionCategoria.classList.add("hidden")
});
$botonAgregar.addEventListener ("click",() =>{
  $sectionOperacion.classList.remove("hidden") 
  $sectionBalance.classList.add("hidden")
  $sectionCategoria.classList.add("hidden")
})

$botonOPeracion.addEventListener('click',()=>{
  $sectionOperacion.classList.add("hidden")
  $sectionBalance.classList.remove("hidden");
  $sectionCategoria.classList.add("hidden")
})
$botonCategorias.addEventListener('click',()=>{
  $sectionOperacion.classList.add("hidden")
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.remove("hidden");
})
$botonCancelarOperacion .addEventListener ('click',()=>{
  $sectionOperacion.classList.add("hidden")
  $sectionBalance.classList.remove("hidden");
  $sectionCategoria.classList.add("hidden");
})

// $menuHamburguesa.addEventListener('click',()=>{       hay que agregar que funcione el menu de hamburgesas en mobile y table
//   $botonesMenu.classList.add = "block";
//   $botonesMenu.classList.add = "flex";
// })



//Operaciones
const getOperaciones = () => JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = operaciones => localStorage.setItem("operaciones",JSON.stringify(operaciones));
const addOperacion = operacion =>{
  setOperaciones([...getOperaciones(),operacion])
}



// funciones para  guardar datos de operacion:
$formOperacion.addEventListener('submit',(event)=>{
  event.preventDefault();
  const operacion = {
    descripcion: event.target.querySelector("[name='descripcion']").value,
    monto:  event.target.querySelector("[name='monto']").value,
    tipo:  event.target.querySelector("[name='tipo']").value,
    categoria:  event.target.querySelector("[name='categoria']").value,
    fecha:  event.target.querySelector("[name='fecha']").value,
  }
  console.log(operacion);
 
  addOperacion(operacion)
  
  mostrarOperaciones(); 
})
//funcion para que se pinte:

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

//// Funciones para manejar las categorías en localStorage
const getCategorias = () => JSON.parse(localStorage.getItem("categorias")) || [];
const setCategorias = (categorias) => localStorage.setItem("categorias", JSON.stringify(categorias));
const addCategoria = (categoria) => {
  const categorias = getCategorias();
  categorias.push(categoria);
  setCategorias(categorias);
};



// tabla
// cancelar funcione
// que se pueda eliminar y editar
// resetear formulario





// // Función para actualizar el select de categorías
 const actualizarSelectCategorias = () => {
   const categorias = getCategorias();
   const selectCategorias = document.querySelector("#listadoDeCategorias");

//   // Limpiar el select antes de agregar las opciones
   selectCategorias.innerHTML = '';

//   // Agregar las opciones al select
   categorias.forEach(categoria => {
     const option = document.createElement("option");
     option.value = categoria;
     option.textContent = categoria;
     selectCategorias.appendChild(option);
   });
 };

// // Manejo del formulario para agregar nuevas categorías
 document.querySelector("#añadirCategoria").addEventListener('submit', (event) => {
   event.preventDefault();

//   // Obtener el valor del input
   const nuevaCategoria = event.target.querySelector("input[type='text']").value.trim();
  
   if (nuevaCategoria !== "") {
     addCategoria(nuevaCategoria); // Agregar nueva categoría a localStorage
     actualizarSelectCategorias(); // Actualizar el select
     event.target.querySelector("input[type='text']").value = ""; // Limpiar el campo de entrada
   }
 });

// // Inicializar las categorías y actualizar el select
 document.addEventListener("DOMContentLoaded", () => {
   actualizarSelectCategorias();
 });


// // const actualizarCategorias = ( ) => {

// //   const categorias = getCategorias ();
// //   const $contenedorDeCategorias = $("#listadoDeCategorias");

// //     // Añadir cada categoría al contenedor
// //     console.log(actualizarCategorias);
// //     console.log(cetegorias);
    
  
// // };
// init
mostrarOperaciones();



