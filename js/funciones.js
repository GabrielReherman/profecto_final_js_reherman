const guardarEquiposLS = (equipos) => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
}
const cargarEquiposLS =() => {
    return JSON.parse(localStorage.getItem("equipos")) || [];
}

const guardarIdEquipo = (id) =>{
    localStorage.setItem("idEquipo", JSON.stringify(id));
}

const cargarIdEquipo = () =>{
    return JSON.parse(localStorage.getItem("idEquipo"));
}


const guardarCarritoLS =(equipos) => {
    localStorage.setItem("carrito", JSON.stringify(equipos));
}

const cargarCarritoLS = () =>{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const mostrarMensaje = (texto) => {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: texto,
        showConfirmButton: false,
        timer: 2000
      });

}
const mostrarMensajeConBoton = (texto, funcion) => {
    Swal.fire({
        title: "Felicitaciones!",
        text: texto,
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Volver a la página de equipos!"
      }).then((result) => {
        funcion();
    });
}
const buscarEquipo = (id) => {
    const carrito = cargarCarritoLS();

    return carrito.some(item => item.id == id);
}


const agregarEquipo = (id) => {
    const equipos =cargarEquiposLS();
    const carrito = cargarCarritoLS();
    let equipo;
    
    if (buscarEquipo(id)) {      
        equipo = carrito.find(item => item.id == id); 
        equipo.cantidad += 1;
        console.log(equipo);
    } else {
        equipo = equipos.find(item => item.id == id);
        equipo.cantidad = 1;
        carrito.push(equipo);
    }
    
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    mostrarMensaje("El equipo se agrego correctamente!");
}
const totalEquiposCarrito = () => {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acum, item) => acum += item.cantidad, 0);
}
const sumaTotalEquiposCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acum, item) => acum += item.cantidad * item.precio, 0);
}

const renderBotonCarrito = () => {
    let contenidoHTML = `<button type="button" class="btn btn-warning position-relative">
    <i class="bi bi-cart"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${totalEquiposCarrito()} </span>
  </button>`;
  
  document.getElementById("botonCarrito").innerHTML = contenidoHTML;
}

const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}
const eliminarEquipoCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const pos = carrito.findIndex(item => item.id == id);
    carrito.splice(pos, 1);
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
    //mostrarMensaje("El equipo se eliminó correctamente!");
}
const irPaginaPrincipal = () => {
        location.href = "index.html";
    }  
const finalizarCompra = () => {
        let mensaje = `El total a pagar es $${sumaTotalEquiposCarrito()}`;
        mostrarMensaje(mensaje);
        limpiarCarrito();
        mostrarMensajeConBoton(mensaje, irPaginaPrincipal);
    }

const renderEquipos = () => {
    
    const equipos = cargarEquiposLS();
    let contenidoHTML = "";

    for (const item of equipos) { 
        contenidoHTML += `<div class="col-md-4">
          <div class="card h-100 border-0 mb-3 text-center">
            <a href="equipos.html" class="text-dark text-decoration-none" onclick="guardarIdEquipo(${item.id})">
              <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
              <div class="card-body">
                <p class="card-text">${item.nombre}<br><b>$${item.precio}</b></p>
              </div>
            </a>
          </div>
        </div>`;
    }
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const renderEquipo = () => {
    const idEquipo = cargarIdEquipo(); 
    const equipos = cargarEquiposLS();
    const equipo = equipos.find(item => item.id == idEquipo);
    let contenidoHTML = `<div class="col-md-4 offset-md-2">
        <img src="${equipo.imagen}" class="img-fluid" alt="${equipo.nombre}" />
    </div>
    <div class="col-md-4">
        <h1>${equipo.nombre}</h1>
        <p>${equipo.descripcion}</p>
        <p>$${equipo.precio}</p>
        <p><button class="btn btn-warning" onclick = "agregarEquipo(${equipo.id});">Agregar (+)</button></p>
    </div>`;

    document.getElementById("contenido").innerHTML = contenidoHTML;
}
    

    const renderCarrito = () =>{
        const carrito = cargarCarritoLS();
        let contenidoHTML;

        if (carrito.length > 0) {
            contenidoHTML= `<table class="table">
            <tr>
            <td colspan="5" class="text-end"><button class="btn btn-warning" onclick="limpiarCarrito();">Limpiar Carrito</button></td>
            </tr>`;

        for (const item of carrito) { 
            contenidoHTML += `<tr>
            <td><img src="${item.imagen}" class="img-fluid" alt="${item.nombre}" width="80"></td>
            <td class ="align-middle">${item.nombre}</td>
            <td class ="align-middle text-center">$${item.precio * item.cantidad}</td>
            <td class ="align-middle text-end"><i class="bi bi-trash" onclick="eliminarEquipoCarrito(${item.id});"></i></td>
            </tr>`;
        }
        contenidoHTML += `<tr>
        <td colspan="3"><b>Total a Pagar</b></td>
        <td class="text-center"><b>$${sumaTotalEquiposCarrito()}</b></td>
        <td class="text-end"><button class="btn btn-warning" onclick="finalizarCompra();">Finalizar Compra</button></td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-warning p-5 text-center" role="alert">No se encontraron Equipos en el Carrito!</div>`;
    }
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}
