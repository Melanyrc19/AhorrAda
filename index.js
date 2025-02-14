function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}
//variables
const $buttonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");
const $formOperacion = $("#formOperacion");
const $botonOPeracion = $("#btnOperacion");
const $formAñadirCategoria = $("#añadirCategoria")
const $botonAñadirCategoria = $("botonAñadirCategoria")
const $botonCategorias = $("#botonCategorias");
const inputListadosDeCategorias = $("#listadoDeCategorias")

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



//Operaciones
const getOperaciones = () => JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = operaciones => localStorage.setItem("operaciones",JSON.stringify(operaciones));
const addOperacion = operacion =>{
  setOperaciones([...getOperaciones(),operacion])
}



// funciones para pintar datos de operacion:
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
//objeto//

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


// funciones para sumar categoria.


const getCategorias = () => JSON.parse(localStorage.getItem("categorias")) || [];
const setCategorias = categorias => localStorage.setItem("categorias",JSON.stringify(categorias));
const addCategorias = categoria =>{
  setCategorias([...getCategorias(),categoria])
}

// const inputListadosDeCategorias = $("#opcionesDeCategorias")

// gguardar:

  $formAñadirCategoria.addEventListener('submit',(event)=>{
    event.preventDefault();
    const Nuevascategorias = {
      categoria: event.target.querySelector("[name='categoria']").value,
     
    }
    console.log(categoria);
   
    addCategorias(categoria)
    inputOpcionesDeCategorias.innerHTML = "categoria"
  })

//
  const AñadirNuevaCategoria = () =>


