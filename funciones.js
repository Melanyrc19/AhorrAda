// Funciones para localStorage

  
  const getOperaciones = () =>
    JSON.parse(localStorage.getItem("operaciones")) || [];
  const setOperaciones = (operaciones) =>
    localStorage.setItem("operaciones", JSON.stringify(operaciones));

  const addOperacion = (operacion) => {
    setOperaciones([...getOperaciones(), operacion]);
  };
  
  
  // Funciones de Categorías
  const getCategorias = () =>
    JSON.parse(localStorage.getItem("categorias")) || ["Comida","Servicio","Salud","Educacion","Trabajo","Transporte"];
  const setCategorias = (categorias) =>
    localStorage.setItem("categorias", JSON.stringify(categorias));

  const addCategoria = (categoriaNombre) => {
    const nuevaCategoria = { id: crypto.randomUUID(), nombre: categoriaNombre };
    setCategorias([...getCategorias(), nuevaCategoria]);
  };




  const getCategorias = () =>
    JSON.parse(localStorage.getItem("categorias")) || ["Comida","Servicio","Salud","Educacion","Trabajo","Transporte"];
  const setCategorias = (categorias) =>
    localStorage.setItem("categorias", JSON.stringify(categorias));
  
  const getOperaciones = () =>
    JSON.parse(localStorage.getItem("operaciones")) || [];
  const setOperaciones = (operaciones) =>
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  
  // Funciones de Categorías
  const addCategoria = (categoriaNombre) => {
    const nuevaCategoria = { id: crypto.randomUUID(), nombre: categoriaNombre };
    setCategorias([...getCategorias(), nuevaCategoria]);
  };
  
  const mostrarCategorias = () => {
    const categorias = getCategorias();
    let aux = "";
  
  
    for (const categoria of categorias) {
      const categoriaId = crypto.randomUUID();
      
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
      
      const nuevoNombre = prompt("Ingresa el nuevo nombre de la categoría:", categoria.nombre);
      if (nuevoNombre) {
        categoria.nombre = nuevoNombre;
        setCategorias(categorias);
        mostrarCategorias();
      }
    }
  }
  