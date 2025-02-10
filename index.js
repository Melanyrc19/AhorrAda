function $(selector) {
    return document.querySelector(selector);
  }
  
  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  const $buttonBalance = $("#botonBalance");
  const $buttonCategorias = $("#botonCategorias");
  const $buttonReportes= $("#botonReportes");
  const $buttonOperaciones= $("#botonOperaciones");
  
  const $modal = $("#contein-modal");

 const $selectBalance = $("#balance");
 const $selectFiltros = $("#filtros");
 const $selectOperaciones= $("#operaciones");
 const $selectCategorias= $("#categorias");



 $buttonOperaciones.addEventListener("click", () =>{
    $modal.style.display = "block";
 })



