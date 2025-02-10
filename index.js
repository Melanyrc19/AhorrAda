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
 const $selectCategorias = $("#categorias");



  $buttonOperaciones.addEventListener("click", () =>{
  $modal.style.display = "block";
  $selectBalance.style.display= "none";
  $selectFiltros.style.display = "none";
  $selectOperaciones.style.display = "none";
  $selectCategorias.style.display = "none";
  })

  $buttonBalance.addEventListener("click", () =>{
    $selectBalance.style.display= "block";
    $selectFiltros.style.display = "block";
    $selectOperaciones.style.display = "block";
    $selectCategorias.style.display = "none";
    $modal.style.display = "none";
  });

  $buttonCategorias.addEventListener("click", () =>{
    $selectBalance.style.display= "none";
    $selectFiltros.style.display = "none";
    $selectOperaciones.style.display = "none";
    $selectCategorias.style.display = "block";
    $modal.style.display = "none";
  })





