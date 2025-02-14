function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}
//variables
const $buttonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");

//section 
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#sectionOperacion");
const $form = $("#form");

//Evento 
$buttonBalance.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
});
$buttonOperaciones.addEventListener ("click",() =>{
  $sectionOperacion.classList.remove("hidden") 
})

$botonAgregar.addEventListener('click',()=>{
  $sectionOperacion.classList.remove("hidden")
})
