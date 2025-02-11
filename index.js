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
 const $selectContenidoOperacion = $("#contenidoOperacion")

 const $form = $("#form")



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

  // function pintarDatos (arrayOPeraciones){
  //   $selectContenidoOperacion.innetHTML = "";

  //   for (const operacion of arrayOperaciones) {
      
  //     const divOperacion = document.createElement ("div");
  //     divOperacion.classList.add("operacion", "flex", "flex-row", "justify-between", "my-4", "p-2", "border-b");
    
      

  //   }


  // }
  let datosOperaciones = [];
  $form.addEventListener("submit", (e) => {
    e.preventDefault()

    const descripcion = e.target [0].value;
    const categoria= e.target [1].value;
    const fecha = e.target [2].value;
    const monto = e.target [3].value;
    const accion = e.target [4].value;

    datosOperaciones.push({
      descripcion: descripcion,
      categoria: categoria,
      fecha: fecha,
      monto: monto,
  })


  })



  window.onload = () => {
    datosOperaciones = JSON.parse (localStorage.getItem ("operacionese"))
    if(datosOperaciones) {
      pintarDatos (datosOperaciones)

    } else{
      datosOperaciones = [];
      pintarDatos (datosOperaciones)

    }
  }



