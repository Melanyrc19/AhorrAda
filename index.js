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
const $tipoFilterBalance = $("#tipoFilterBalance");
const $categoriaFilterBalance = $("#categoriaFilterBalance");
const $fechaFilterBalance = $("#fechaFilterBalance");
const $ordenFilterBalance = $("#ordenFilterBalance");

const btnOcultarFiltro = $("#btnOcultarFiltro");
const $botonReportes = $("#botonReportes");
const $botonCerrarMenu = $("#botonCerrarMenu");

const $btnBalanceMenuHamburguesa = $("#botonBalanceMenuHamburguesa");
const $btnReportesMenuHamburguesa = $("#botonReportesMenuHamburguesa");
const $btnCategoriaMenuHamburguesa = $("#botonCategoriasMenuHamburguesa");

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
const $seccionFiltro = $("#seccionFiltro");
const $contenidoSeccionFiltro = $("#contenidoSeccionFiltro");
const $menuDesplegadoHamburguesa = $("#menuDesplegadoHamburguesa");
const $sectionReporte = $("#sectionReporte");
const $operacionesVacia = $("#operacionesVacia");

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

const getCategoria = (id) =>
  getCategorias().find((categoria) => categoria.id == id);
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

const getOperacionFiltradas = () => {
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
};
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
const mostrarCategoriasEnSelect = (selectCategoria, optionTodos = false) => {
  const categorias = getCategorias();
  selectCategoria.innerHTML = optionTodos ? `<option>Todos</option>` : "";

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
  const categorias = getCategorias();
  const operaciones = getOperacionFiltradas();

  if (!operaciones.length) {
    console.log("No operaciones");

    $contenidoOperaciones.innerHTML = ` <div id="operacionesVacia" class="h-[500px] m-auto flex flex-col justify-center items-center text-center">
                <img src="" alt="">
      
                <h3 class=" text-2xl py-6 font-bold text-gray-700">Sin resultados</h3>
                <p class="text-gray-700 "> Cambia los filtros o agrega operaciones</p>
      
              </div>`;
    return;
  }

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
  mostrarCategoriasEnSelect($("#listadoDeCategorias"));
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

$botonOperacion.addEventListener("click", () => {
  mostrarBalance();
});

$botonCategorias.addEventListener("click", () => {
  ocultarTodoMenos("categorias");
});
$btnCategoriaMenuHamburguesa.addEventListener("click", () => {
  $sectionOperacion.classList.add("hidden");
  $sectionBalance.classList.add("hidden");
  $sectionCategoria.classList.remove("hidden");
  $inputEditarCategorias.classList.add("hidden");
  $sectionReporte.classList.add("hidden");
});

// $botonReportes.addEventListener("click", () => {
//   ocultarTodoMenos("reportes");
// });
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
  $contenidoSeccionFiltro.classList.toggle("hidden");
});

const totalPorCategoria = (operaciones) => {
  const categoriasMonto = {};

  for (const operacion of operaciones) {
    if (!categoriasMonto[operacion.categoria]) {
      categoriasMonto[operacion.categoria] = Number(operacion.monto);
    } else {
      categoriasMonto[operacion.categoria] += Number(operacion.monto);
    }
  }
  return categoriasMonto;
};

const mayorCategoria = (categoriasMonto) => {
  let mayor = -Infinity;
  let categoriaMayor = "";

  for (const categoria in categoriasMonto) {
    const monto = categoriasMonto[categoria];
    if (monto >= mayor) {
      mayor = monto;
      categoriaMayor = categoria;
    }
  }

  return { monto: mayor, categoria: categoriaMayor };
};

const totalPorMes = (operaciones) => {
  const mesMonto = {};

  for (const operacion of operaciones) {
    if (!mesMonto[operacion.fecha]) {
      mesMonto[operacion.fecha] = Number(operacion.monto);
    } else {
      mesMonto[operacion.fecha] += Number(operacion.monto);
    }
  }
  return mesMonto;
};
const mayorFecha = (mesMonto) => {
  let mMayor = -Infinity;
  let mesMayor = "";
  for (const fecha in mesMonto) {
    const montoMes = mesMonto[fecha];
    if (montoMes >= mMayor) {
      mMayor = montoMes;
      mesMayor = fecha;
    }
  }
  return { monto: mMayor, fecha: mesMayor };
};

$botonReportes.addEventListener("click", () => {
  ocultarTodoMenos("sectionReporte");

  const operaciones = getOperaciones();
  let aux = "";

  const operacionGanancia = operaciones.filter(
    (operacion) => operacion.tipo === "Ganancias"
  );
  const operacionGasto = operaciones.filter(
    (operacion) => operacion.tipo === "Gastos"
  );

  const operacionBalance = operaciones.map((operacion) => ({
    ...operacion,
    monto: operacion.tipo === "Ganacias" ? monto : -1 * Number(operacion.monto),
  }));

  const categoriaGanancia = totalPorCategoria(operacionGanancia);
  const categoriaGastos = totalPorCategoria(operacionGasto);
  const categoriaBalance = totalPorCategoria(operacionBalance);
  const mayorGanancia = mayorCategoria(categoriaGanancia);
  const mayorGastos = mayorCategoria(totalPorCategoria(operacionGasto));
  const mayorBalance = mayorCategoria(categoriaBalance);

  const totalMesBalance = totalPorMes(operacionBalance);
  const totalMesGanancia = totalPorMes(operacionGanancia);
  const totalMesGastos = totalPorMes(operacionGasto);
  const mayorMesGanancia = mayorFecha(totalMesGanancia);
  const mayorMesGasto = mayorFecha(totalPorMes(operacionGasto));

  const categoriasSection = [];
  const categorias = getCategorias();

  for (const categoria of categorias) {
    categoriasSection.push({
      categoria: categoria.nombre,
      ganancia: categoriaGanancia[categoria.id]
        ? categoriaGanancia[categoria.id]
        : 0,
      gastos: categoriaGastos[categoria.id] ? categoriaGastos[categoria.id] : 0,
      balance: categoriaBalance[categoria.id]
        ? categoriaBalance[categoria.id]
        : 0,
    });
  }
  //  const mesSection = [];
  //   let mesMonto = totalPorMes();

  //   for (const mesMonto of fechas) {
  //     mesSection.push({
  //       Fechas: totalMesGanancia.fecha
  //       ganancias: totalMesGanancia[]
  //       gasto:
  //       balance:
  //     })

  //   }
  //  }
  //  mesMonto[operacion.fecha] +=Number(operacion.monto)

  const fechardas = [];

  for (const fecha in totalMesBalance) {

    const date = new Date(fecha);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const indiceFecha = `${month}/${year}`;

    const index = fechardas.findIndex(
      (fechardita) => fechardita.fecha == indiceFecha
    );
    if (index !== -1) {
      fechardas[index].ganancia += Number(totalMesGanancia[fecha]) || 0;
      fechardas[index].gastos += Number(totalMesGastos[fecha]) || 0;
      fechardas[index].balance += Number(totalMesBalance[fecha]) || 0;
    } else {
      fechardas.push({
        fecha: indiceFecha,
        ganancia: Number(totalMesGanancia[fecha]) || 0,
        gastos: Number(totalMesGastos[fecha]) || 0,
        balance: Number(totalMesBalance[fecha]) || 0,
      });
    }
  }
  console.log({ fechardas });

  $sectionReporte.innerHTML = ` <h2 class="text-2xl md:text-4xl font-semibold">Reportes</h2> 
                                <h3 class="py-8 text-xl md:text-2xl font-semibold">Resumen</h3>
                            <div id="categoriaMayorGanancia" class="md:flex md:justify-between py-6">
                            <p class="sm:w-[250px] text-gray-700 text-sm md:text-lg">Categoria con mayor ganancia</p>
                            <span class="text-sm">${
                              getCategoria(mayorGanancia.categoria).nombre
                            }</span>
                            <span class="text-green-500">+$${
                              mayorGanancia.monto
                            }</span>
                            </div>
                             <div class="px-4"> 
                              <div class="md:flex md:justify-between py-6">
                               <p class="md:w-[250px] text-gray-700 text-sm md:text-lg">Categoria con mayor gasto</p>
                               <span class="text-sm">${
                                 getCategoria(mayorGastos.categoria).nombre
                               }</span>
                               <span class="text-red-500">${
                                 mayorGastos.monto
                               }</span>
                              </div>
                               <div class="md:flex md:justify-between py-6">
                                 <p class="md:w-[250px] text-gray-700 text-sm md:text-lg">Categoria con mayor balance</p>
                                 <span class="text-sm">${
                                   getCategoria(mayorBalance.categoria).nombre
                                 }</span>
                                 <span>${mayorBalance.monto}</span>
                               </div>
                                 <div class="md:flex md:justify-between py-6">
                                   <p class="md:w-[250px] text-gray-700 text-sm md:text-lg">Mes con mayor ganancia</p>
                                   <span class="text-sm">${
                                     mayorMesGanancia.fecha
                                   }</span>
                                   <span class="text-green-500">${
                                     mayorMesGanancia.monto
                                   }</span>
                                  </div>
      
                                <div class="md:flex md:justify-between py-6">
                                  <p class="md:w-[250px] text-gray-700 text-sm md:text-lg">Mes con mayor gastos</p>
                                  <span class="text-sm">${
                                    mayorMesGasto.fecha
                                  }</span>
                                 <span class="text-red-500">${
                                   mayorMesGasto.monto
                                 }</span>
                                </div>
                               </div>
      
       
                              <div class="md:m-5">
                              <h2 class="text-lg md:text-2xl font-semibold">Totales por categorias</h2>
                              <div class="flex flex-wrap md:flex-row md:justify-between">
                             <div class=" flex flex-col my-6">
                               <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Categorias</h3>
                                ${categoriasSection
                                  .map((categoria) => {
                                    return `<p>${categoria.categoria}</p>`;
                                  })
                                  .join("")}
                              </div>
                             <div class="flex flex-col my-6">
                               <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Ganancias</h3>
                                ${categoriasSection
                                  .map((categoria) => {
                                    return ` <p class="text-green-500"> +${categoria.ganancia}</p>`;
                                  })
                                  .join("")}
                             </div>
                           <div class="flex flex-col my-6">
                               <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Gastos</h3>
                                 ${categoriasSection
                                   .map((categoria) => {
                                     return ` <p class="text-red-500"> +${categoria.gastos}</p>`;
                                   })
                                   .join("")}
                             </div>
                         <div class="flex flex-col my-6">
                           <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Balance</h3>
                            ${categoriasSection
                              .map((categoria) => {
                                return ` <p class="text-gray-500"> ${categoria.balance}</p>`;
                              })
                              .join("")}
                          </div>
                        </div>
                       </div>
      
        <!-- Totales por Mes -->
        <div class="md:m-5 py-[100px]">
          <h2 class="text-lg md:text-2xl font-semibold md:my-22">Totales por mes</h2>
          <div class="flex flex-wrap md:flex-row md:justify-between my-6">
            <div class="flex flex-col my-6">
              <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Mes</h3>
               ${Object.entries(fechardas)
                 .map((fechardita) => {
                   return ` <p class="text-gray-500"> ${fechardita[0]}</p>`;
                 })
                 .join("")}
            </div>
            <div class="flex flex-col my-6">
              <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Ganancias</h3>
              <p class="text-green-500">+$0000</p>
            </div>
            <div class="flex flex-col my-6">
              <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg">Gastos</h3>
              <p class="text-red-500">-$0000</p>
            </div>
            <div class="flex flex-col my-6">
              <h3 class="w-[100px] py-6 font-semibold text-sm md:text-lg ">Balance</h3>
              <p>$0000</p>
            </div>
          </div>
        </div>`;

  const $categoriaMayorGanancia = $("#categoriaMayorGanancia");
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
  mostrarFondos();
});

const mostrarBalance = () => {
  ocultarTodoMenos("balance");
  mostrarOperaciones();
  mostrarFondos();
  mostrarCategoriasEnSelect($("#categoriaFilterBalance"), true);
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
      id: "sectionReporte",
      dom: $sectionReporte,
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
});

$ordenFilterBalance.addEventListener("change", (e) => {
  const orden = e.target.value;
  updateFilter({ orden });

  mostrarOperaciones();
  mostrarFondos();
});

// Inicialización
localStorage.removeItem("filter");
mostrarBalance();
