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

//section 
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categoria")

//Evento 
$buttonBalance.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
  $sectionOperacion.classList.add("hidden")
});
$botonAgregar.addEventListener ("click",() =>{
  $sectionOperacion.classList.remove("hidden") 
  $sectionBalance.classList.add("hidden")
})

$botonAgregar.addEventListener('click',()=>{
  $sectionOperacion.classList.remove("hidden")
})

//Operaciones
const getOperaciones = () => JSON.parse(localStorage.getItem("operaciones")) || [];
const setOperaciones = operaciones => localStorage.setItem("operaciones",JSON.stringify(operaciones));
const addOperacion = operacion =>{
  setOperaciones([...getOperaciones(),operacion])
}




$formOperacion.addEventListener('submit',(event)=>{
  event.preventDefault();
  const operacion = {
    descripcion: event.target.querySelector("[name='descripcion']").value
  }
 
  addOperacion(operacion)
})
//objeto//
const formOperacion ={
  Descripcion:""
  
}
