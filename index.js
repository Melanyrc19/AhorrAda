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
const btnGuardarEdit = $("#btnGuardarEdit")
const btnOcultarFiltro = $("#btnOcultarFiltro")
const $botonReportes = $("#botonReportes");
const $botonCerrarMenu =$("#botonCerrarMenu");



const $btnBalanceMenuHamburguesa = $("#botonBalanceMenuHamburguesa");
const $btnReportesMenuHamburguesa = $("#botonReportesMenuHamburguesa");
const $btnCategoriaMenuHamburguesa = $("#botonCategoriasMenuHamburguesa")



// Categorías
const $añadirCategoria = $("#añadirCategoria");
const $botonAñadirCategoria = $("#botonAñadirCategoria");
const $botonCategorias = $("#botonCategorias");
const $inputListadosDeCategorias = $("#listadoDeCategorias");
const $listadoDeCategoriasVista = $("#listadoDeCategoriasVista");
const $inputEditarCategorias = $("#inputEditarCategorias");

// Secciones
const $sectionBalance = $("#balance");
const $sectionOperacion = $("#operacion");
const $sectionCategoria = $("#categorias");
const $contenidoOperaciones = $("#contenidoOperaciones");
const $seccionEditarOperacion = $("#seccionEditarOperacion");
const $seccionFiltro = $("#seccionFiltro");
const $contenidoSeccionFiltro = $("#contenidoSeccionFiltro");
const $menuDesplegadoHamburguesa = $("#menuDesplegadoHamburguesa");
const $sectionReporte = $("#sectionReporte");
const $operacionesVacia = $("#operacionesVacia");

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
const clearOp = () =>{
  localStorage.removeItem("operaciones")
}
const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];

const getOperacion = (id) =>
  getOperaciones().find(operacion => operacion.id == id);

const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));

const addOperacion = (operacion) => {
  operacion.id = crypto.randomUUID();
  setOperaciones([...getOperaciones(), operacion]);
};
// funcion para actualizar las nuevas categorias al selec
const mostrarCategoriasEnSelect = () => {
  const categorias = getCategorias();
  const selectCategoria = $("[name='categoria']");

  selectCategoria.innerHTML = "";

  categorias.forEach((categoria) => {
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
      $inputEditarCategorias.classList.toggle = ("hidden");
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
    const formEditar = $("#inputEditarCategorias");
    formEditar.classList.remove("hidden");
    $sectionCategoria.classList.add("hidden");

    const inputCategoriaNombre = $("#inputCategoriaNombre");
    inputCategoriaNombre.value = categoria.nombre;

    const botonEditarCategoria = $("#botonEditarCategoriaInput");

    botonEditarCategoria.addEventListener("click", () => {
      const nuevoNomsectionOpbre = inputCategoriaNombre.value;

      if (nuevoNombre) {
        categoria.nombre = nuevoNombre;
        setCategorias(categorias);
        mostrarCategorias();

        formEditar.classList.add("hidden");
        $sectionCategoria.classList.remove("hidden");
      }
    });
  }
}

const mostrarOperaciones = () => {
  const operaciones = getOperaciones();
  const categorias = getCategorias();

  let contenidoHTML = `
  <div class="hidden lg:flex justify-between font-bold text-sm m-2">
    <div class="lg:w-1/6 text-left">Descripción</div>
    <div class="lg:w-1/6 text-left">Categoría</div>
    <div class="hidden lg:w-1/6  lg:flex flex-1 text-left">Tipo</div>
    <div class="lg:w-1/6 ">Monto</div>
    <div class="hidden lg:w-1/6 md:flex flex-1 text-left">Fecha</div>
    <div class="lg:w-1/6 text-left">Acción</div>
  </div>`;

  // Iteramos sobre las operaciones
  for (const operacion of operaciones) {
    // Encontramos la categoría correspondiente a esta operación
    const categoria = categorias.find(
      (categoriaParametro) => categoriaParametro.id === operacion.categoria
    );
    const nombreCategoria = categoria
      ? categoria.nombre
      : "Categoría no encontrada";

   

      contenidoHTML += `
      <div class="flex flex-wrap justify-between text-sm p-4 border-t">
        <div class="flex-1 lg:w-1/6  text-left">${operacion.descripcion}</div>
        <div class="sm:w-2/3 lg:w-1/6 lg:flex-1 text-left">${nombreCategoria}</div>
        <div class="hidden lg:w-1/6 lg:flex flex-1 text-left">${operacion.tipo}</div>
        <div class="sm:w-1/3 lg:w-1/6  lg:flex-1 text-left font-semibold">${operacion.monto}</div>
        <div class="hidden lg:w-1/6  lg:flex text-left">${operacion.fecha}</div>
        <div class="sm:w-2/3  lg:w-1/6  text-left">
          <button class="text-sky-600 botonEditar" data-id="${operacion.id}">Editar</button>
          <button class="text-sky-600 botonEliminar" data-id="${operacion.id}">Eliminar</button>
        </div>
      </div>`;
  }

contenidoHTML += ``;
$contenidoOperaciones.innerHTML = contenidoHTML;




  const botonesEditar = $$(".botonEditar");
  for (const botonEditar of botonesEditar) {
    botonEditar.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const operacion = getOperacion(id)
      $sectionBalance.classList.add("hidden")

      const categorias = getCategorias();
      let aux = "";
      for (const categoria of categorias) {
        aux += `<option value= "${categoria.id}" ${categoria.id ===operaciones.categoria ? "selected" : ""} > ${categoria.nombre} </option>`
      }

      // const actualizarOperacionEdit = () =>{
      //   const operacion = getOperacion ();

      // }

      btnGuardarEdit.addEventListener ("click",() =>{
        $seccionEditarOperacion.classList.add("hidden")
        $sectionBalance.classList.remove("hidden")
        addOperacion(editarForm);
        
       })
      
      let editarForm = `<form class=" rounded-lg shadow-lg bg-white my-6 mx-8" id="formEditarOperacion">
                <div class="text-lg font-semibold px-4 py-2">Editar Operación</div>
                <div class="p-4">
                  <div class="mb-8">
                    <label class="block text-sm font-medium text-gray-700">Descripción</label>
                    <input id="editarDescripcion" value="${operacion.descripcion}" type="text" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Monto</label>
                    <input value="${operacion.monto}" id="editarMonto" type="number" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Tipo</label>
                    <select id="editarTipo" class="w-full mt-1 p-2 border rounded-md">
                      <option value="Ganancias" ${operacion.tipo === "Ganancias" ? "selected":""}>Ganancias</option>
                      <option value="Gastos" ${operacion.tipo === "Gastos" ? "selected":""}>Gastos</option>
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Categoría</label>
                    <select  "id="editarCategoria" class="w-full mt-1 p-2 border rounded-md">
                      ${aux}
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Fecha</label>
                    <input id="editarFecha" value="${operacion.fecha}" type="date" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="flex justify-center w-full gap-4 mx-auto sm:justify-end">
                    <button id="btnGuardarEdit " type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
                      Guardar Cambios
                    </button>
                    <button id="btnCancelarEdicion" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>`
              $seccionEditarOperacion.innerHTML = editarForm;
              setOperacion();
    });
    
  }
};

// Eventos de navegación
$buttonBalance.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
  $sectionOperacion.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
});
$btnBalanceMenuHamburguesa.addEventListener("click", () => {
  $sectionBalance.classList.remove("hidden");
  $sectionOperacion.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
});
$botonCerrarMenu.addEventListener("click", () => {
  $menuDesplegadoHamburguesa.classList.add("hidden");
});

// const $btnReportesMenuHamburguesa = $("#botonReporteMenuHamburguesa");



$botonAgregar.addEventListener("click", () => {
  $sectionOperacion.classList.remove("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
  $operacionesVacia.classList.add("hidden");
  $contenidoOperaciones.classList.remove("hidden");
});

$botonOPeracion.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.remove("hidden");
  $sectionCategoria.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
});

$botonCategorias.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.remove("hidden");
  $inputEditarCategorias.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
});
$btnCategoriaMenuHamburguesa.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.remove("hidden");
  $inputEditarCategorias.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
});
$botonReportes.addEventListener("click", () => {
  $sectionReporte.classList.remove("hidden");
   $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
  $inputEditarCategorias.classList.add("hidden");
});
$btnReportesMenuHamburguesa.addEventListener("click", () => {
  $sectionReporte.classList.remove("hidden");
   $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.add("hidden");
  $inputEditarCategorias.classList.add("hidden");
});

btnOcultarFiltro.addEventListener("click", () => {
  $seccionFiltro.classList.toggle("h-[80px]");
  $seccionFiltro.classList.toggle("py-6");
  $contenidoSeccionFiltro.classList.toggle("hidden") 

});

$menuHamburguesa.addEventListener("click", () => {
  $menuDesplegadoHamburguesa.classList.toggle("hidden");
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


