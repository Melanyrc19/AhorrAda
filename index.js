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
const $botonBalance = $("#botonBalance");
const $botonAgregar = $("#botonAgregar");
const $formOperacion = $("#formOperacion");
const $botonOperacion = $("#botonOperacion");
const $montoGanancia = $("#montoGanancia");
const $montoGasto = $("#montoGasto");
const $montoTotal = $("#montoTotal");
const $botonReportes = $("#botonReportes");
const $tipoFilterBalance = $("#tipoFilterBalance");
const $categoriaFilterBalance = $("#categoriaFilterBalance"); 
const $fechaFilterBalance = $("#fechaFilterBalance");
const $ordenFilterBalance = $ ("#ordenFilterBalance");


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
const $seccionReportes = $("#reportes");

// Funciones para localStorage
// Funciones de Categorías    aca hay un problema al borrar todos los datos en la consola:
const getCategorias = () => {
  const categorias = JSON.parse(localStorage.getItem("categorias"));

  if (categorias) {
    return categorias;
  }
  const categoriasDefault = [
    { id: crypto.randomUUID(), nombre: "Comida" },
    { id: crypto.randomUUID(), nombre: "Servicio" },
    { id: crypto.randomUUID(), nombre: "Salud" },
    { id: crypto.randomUUID(), nombre: "Educacion" },
    { id: crypto.randomUUID(), nombre: "Trabajo" },
    { id: crypto.randomUUID(), nombre: "Transporte" },
  ];
  setCategorias(categoriasDefault);
  return categoriasDefault;
};

const setCategorias = (categorias) =>
  localStorage.setItem("categorias", JSON.stringify(categorias));
const addCategoria = (categoriaNombre) => {
  const nuevaCategoria = { id: crypto.randomUUID(), nombre: categoriaNombre };
  setCategorias([...getCategorias(), nuevaCategoria]);
};

// Funciones de Operaciones
// const clearOp = () =>{
//   localStorage.removeItem("operaciones")
// }
const getOperaciones = () =>
  JSON.parse(localStorage.getItem("operaciones")) || [];

const getOperacion = (id) =>
  getOperaciones().find((operacion) => operacion.id == id);

const getOperacionFiltradas = ()=>{
  const filter = getFilter();
  let operacionesFiltradas = getOperaciones();

  if (filter.tipo) {
    operacionesFiltradas = operacionesFiltradas.filter(
      (op) => op.tipo === filter.tipo
    );
  }

  if (filter.categoria) {
    operacionesFiltradas = operacionesFiltradas.filter(
      (op) => op.categoria === filter.categoria
    );
  }

  if (filter.fecha) {
    const fecha = new Date(filter.fecha);
    operacionesFiltradas = operacionesFiltradas.filter(
      (op) => new Date(op.fecha) >= fecha
    );
  }

  if (filter.orden) {
    const ordenaciones = {
      masAntiguo: (a, b) => new Date(b.fecha) - new Date(a.fecha),
      masReciente: (a, b) => new Date(a.fecha) - new Date(b.fecha),
      mayorMonto: (a, b) => b.monto - a.monto,
      menorMonto: (a, b) => a.monto - b.monto,
      AZ: (a, b) => a.descripcion.localeCompare(b.descripcion),
      ZA: (a, b) => b.descripcion.localeCompare(a.descripcion),
    };
  
    const ordenarPor = ordenaciones[filter.orden];
    
    operacionesFiltradas.sort(ordenarPor);
  }
  return operacionesFiltradas;
}
const setOperaciones = (operaciones) =>
  localStorage.setItem("operaciones", JSON.stringify(operaciones));

const addOperacion = (operacion) => {
  operacion.id = crypto.randomUUID();
  setOperaciones([...getOperaciones(), operacion]);
};

const deleteOperacion = (id) => {
  setOperaciones(getOperaciones().filter((op) => op.id != id));
};

const updateOperacion = (updatedOperacion) => {
  const operaciones = getOperaciones();
  const index = operaciones.findIndex(
    (operacion) => operacion.id == updatedOperacion.id
  );

  operaciones[index] = updatedOperacion;
  setOperaciones(operaciones);
};

const getFilter = () =>
  JSON.parse(localStorage.getItem("filter")) || {
    tipo: null,
    categoria: null,
    fecha: null,
    orden: null,
  };

const updateFilter = (filter) =>
  localStorage.setItem("filter", JSON.stringify({ ...getFilter(), ...filter }));

const mostrarFondos = () => {
  const operaciones = getOperacionFiltradas();
  let ganancias = 0;
  let gastos = 0;

  for (const operacion of operaciones) {
    const monto = Number(operacion.monto);
    if (operacion.tipo === "Ganancias") {
      ganancias += monto;
    } else {
      gastos += monto;
    }
  }

  $montoGanancia.innerHTML = `+$${ganancias}`;
  $montoGasto.innerHTML = `-$${gastos}`;
  $montoTotal.innerHTML = `${ganancias - gastos}`;
};

// funcion para actualizar las nuevas categorias al selec
const mostrarCategoriasEnSelect = (selectCategoria,optionTodos =false) => {
  const categorias = getCategorias();
  selectCategoria.innerHTML = optionTodos?`<option>Todos</option>`:"";

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nombre;
    selectCategoria.appendChild(option);
  });
};

const mostrarCategorias = () => {
  const categorias = getCategorias();
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
      $inputEditarCategorias.classList.toggle = "hidden";
    });
  });
};

function quitarCategoria(id) {
  let categorias = getCategorias();
  categorias = categorias.filter((categoria) => categoria.id !== id);
  setCategorias(categorias);
  mostrarCategorias();
  mostrarFondos();
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
      const nuevoNombre = inputCategoriaNombre.value;

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
  const operaciones = getOperacionFiltradas();

  const categorias = getCategorias();
  $seccionEditarOperacion.innerHTML = "";

  let contenidoHTML = `
    <thead>
      <tr>
        <th class="text-left font-bold text-sm py-3 px-4">Descripción</th>
        <th class="text-left font-bold text-sm py-3 px-4">Categoría</th>
        <th class="hidden md:block text-left font-bold text-sm py-3 px-4">Tipo</th>
        <th class="text-right font-bold text-sm py-3 px-4">Monto</th>
        <th class="text-left font-bold text-sm py-3 px-4">Fecha</th>
        <th class="text-left font-bold text-sm py-3 px-4">Acción</th>
      </tr>
    </thead>
    <tbody>`;

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
            <tr id="contenidOpe"class="text-sm ">
        <td class="text-left px-4 py-3">${operacion.descripcion}</td>
        <td class="text-left px-4 py-3">${nombreCategoria}</td> 
        <td class="hidden md:block text-left px-4 py-3">${operacion.tipo}</td>
        <td class="text-right px-4 py-3 font-semibold">${operacion.monto}</td>
        <td class="text-left px-4 py-3">${operacion.fecha}</td>
        <td class="text-left px-4 py-3">
          <button class="text-sky-600 botonEditar" data-id="${operacion.id}">Editar</button>
          <button class="text-sky-600 botonEliminar" data-id="${operacion.id}">Eliminar</button
        </td>
      </tr>`;
  }

  contenidoHTML += `</tbody>`;
  $contenidoOperaciones.innerHTML = contenidoHTML;

  const botonesEliminar = $$(".botonEliminar");
  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      deleteOperacion(id);
      mostrarOperaciones();
      mostrarFondos();
    });
  }

  const botonesEditar = $$(".botonEditar");
  for (const botonEditar of botonesEditar) {
    botonEditar.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const operacion = getOperacion(id);
      ocultarTodoMenos("seccionEditarOperacion");

      const categorias = getCategorias();
      let aux = "";

      for (const categoria of categorias) {
        aux += `<option value= "${categoria.id}" ${
          categoria.id === operacion.categoria ? "selected" : ""
        } > ${categoria.nombre} </option>`;
      }
      $seccionEditarOperacion.innerHTML = `<form class=" rounded-lg shadow-lg bg-white my-6 mx-8" id="formEditarOperacion">
                <div class="text-lg font-semibold px-4 py-2">Editar Operación</div>
                <input type="hidden" id="editarId" value=${operacion.id}>
                <div class="p-4">
                  <div class="mb-8">
                    <label class="block text-sm font-medium text-gray-700">Descripción</label>
                    <input id="editarDescripcion" value="${
                      operacion.descripcion
                    }" type="text" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Monto</label>
                    <input value="${
                      operacion.monto
                    }" id="editarMonto" type="number" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Tipo</label>
                    <select id="editarTipo" class="w-full mt-1 p-2 border rounded-md">
                      <option value="Ganancias" ${
                        operacion.tipo === "Ganancias" ? "selected" : ""
                      }>Ganancias</option>
                      <option value="Gastos" ${
                        operacion.tipo === "Gastos" ? "selected" : ""
                      }>Gastos</option>
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Categoría</label>
                    <select  id="editarCategoria" class="w-full mt-1 p-2 border rounded-md">
                      ${aux}
                    </select>
                  </div>
                  <div class="mb-3 mb-8">
                    <label class="block text-sm font-medium text-gray-700">Fecha</label>
                    <input id="editarFecha" value="${
                      operacion.fecha
                    }" type="date" class="w-full mt-1 p-2 border rounded-md" />
                  </div>
                  <div class="flex justify-center w-full gap-4 mx-auto sm:justify-end">
                    <button id="btnGuardarEdit" type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
                      Guardar Cambios
                    </button>
                    <button id="btnCancelarEdicion" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>`;

      $("#btnGuardarEdit").addEventListener("click", (event) => {
        event.preventDefault();
        const editOperacion = {
          id: $("#editarId").value,
          descripcion: $("#editarDescripcion").value,
          categoria: $("#editarCategoria").value,
          monto: $("#editarMonto").value,
          tipo: $("#editarTipo").value,
          fecha: $("#editarFecha").value,
        };

        updateOperacion(editOperacion);
        mostrarBalance();
        mostrarFondos();
      });
    });
  }
};

// Eventos de navegación
$botonBalance.addEventListener("click", () => {
  mostrarBalance();
});

$botonAgregar.addEventListener("click", () => {
  ocultarTodoMenos("operacion");
  mostrarCategoriasEnSelect($("#listadoDeCategorias"))
});

$botonOperacion.addEventListener("click", () => {
  mostrarBalance();
});

$botonCategorias.addEventListener("click", () => {
  ocultarTodoMenos("categorias");
});

$botonReportes.addEventListener("click", () => {
  ocultarTodoMenos("reportes");
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
  mostrarFondos();
});

const mostrarBalance = () => {
  ocultarTodoMenos("balance");
  mostrarOperaciones();
  mostrarFondos();
  mostrarCategoriasEnSelect($("#categoriaFilterBalance"),true);
};

const ocultarTodoMenos = (id) => {
  const sections = [
    {
      id: "balance",
      dom: $sectionBalance,
    },
    {
      id: "operacion",
      dom: $sectionOperacion,
    },
    {
      id: "categorias",
      dom: $sectionCategoria,
    },
    {
      id: "seccionEditarOperacion",
      dom: $seccionEditarOperacion,
    },
    {
      id: "inputEditarCategorias",
      dom: $inputEditarCategorias,
    },
    {
      id: "reportes",
      dom: $seccionReportes,
    },
  ];

  for (const section of sections) {
    if (section.id == id) {
      section.dom.classList.remove("hidden");
    } else {
      section.dom.classList.add("hidden");
    }
  }
};

$tipoFilterBalance.addEventListener("change", (e) => {
  const tipo = e.target.value;
  updateFilter({ tipo: tipo == "Todos" ? null : tipo });
  mostrarOperaciones();
  mostrarFondos();
});

$categoriaFilterBalance.addEventListener("change", (e) => {
  const categoria = e.target.value;
  updateFilter({ categoria: categoria == "Todos" ? null : categoria });
  mostrarOperaciones();
  mostrarFondos();
});
$fechaFilterBalance.addEventListener("change", (e) => {
  const fecha = e.target.value;
  updateFilter({ fecha: fecha == "Todos" ? null : fecha });
  mostrarOperaciones();
  mostrarFondos();

})

$ordenFilterBalance.addEventListener("change", (e) => {
  const orden = e.target.value;
  updateFilter({ orden });

  mostrarOperaciones();
  mostrarFondos();
})


  

// Inicialización
localStorage.removeItem("filter")
mostrarBalance();
