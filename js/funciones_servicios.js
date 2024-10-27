const guardarServiciosLS = (servicios) => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
}


const cargarServiciosLS =() => {
    return JSON.parse(localStorage.getItem("servicios")) || [];
}

const guardarIdServicio = (id) =>{
    localStorage.setItem("idServicio", JSON.stringify(id));
}

const cargarIdServicio = () =>{
    return JSON.parse(localStorage.getItem("idServicio"));
}


const guardarCarritoLS =(servicios) => {

    localStorage.setItem("carrito", JSON.stringify(carrito));
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
const buscarServicio = (id) => {
    const carrito = cargarCarritoLS();

    return carrito.some(item => item.id == id);
}


const agregarServicio = (id) => {
    const servicios = cargarServiciosLS();
    const carrito = cargarCarritoLS();
    let servicio;
    
    if (buscarServicio(id)) {      
        servicio = carrito.find(item => item.id == id); 
        servicios.cantidad += 1;
        console.log(servicio);
    } else {
        servicio = servicios.find(item => item.id == id);
        servicios.cantidad = 1;
        carrito.push(servicio);  
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();
    mostrarMensaje("El servicio se agregó correctamente!");
}
const totalServiciosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acum, item) => acum += item.cantidad, 0);
}
const sumaTotalServiciosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acum, item) => acum += item.cantidad * item.precio, 0);
}

const renderBotonCarrito = () => {
    let contenidoHTML = `<button type="button" class="btn btn-warning position-relative">
    <i class="bi bi-cart"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${totalServiciosCarrito()} </span>
  </button>`;
  
  document.getElementById("botonCarrito").innerHTML = contenidoHTML;
}

const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}
const eliminarServicioCarrito = (id) => {
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
    let mensaje = `El total a pagar es $${sumaTotalServiciosCarrito()}`;
    mostrarMensaje(mensaje);
    limpiarCarrito();
    mostrarMensajeConBoton(mensaje, irPaginaPrincipal);
}

const renderServicios = () => {
    const servicios = cargarServiciosLS();

    for (const item of servicios) { 
        contenidoHTML += `<div class="col-md-4">
          <div class="card h-100 border-0 mb-3 text-center">
           <a href="servicios.html" class="text-dark text-decoration-none" onclick="guardarIdServicio(${item.id})">
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

const renderServicio = () => {
const idServicio = cargarIdServicio(); 
const servicios = cargarServiciosLS();
const servicio = servicios.find(item => item.id == idServicio);
let contenidoHTML = `<div class="col-md-4 offset-md-2">
    <img src="${servicios.imagen}" class="img-fluid" alt="${servicios.nombre}" />
    
</div>

<div class="col-md-4">
    <h1>${servicios.nombre}</h1>
    <p>${servicios.descripcion}</p>
    <p>${servicios.precio}</p>
    <p><button class="btn btn-warning" onclick = "agregarServicio(${servicios.id});">Agregar (+)</button></p>
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
    <td class="text-center"><b>$${sumaTotalServiciosCarrito()}</b></td>
    <td class="text-end"><button class="btn btn-warning" onclick="finalizarCompra();">Finalizar Compra</button></td>
    </tr>
    </table>`;
} else {
    contenidoHTML = `<div class="alert alert-warning p-5 text-center" role="alert">No se encontraron Servicios en el Carrito!</div>`;
}

document.getElementById("contenido").innerHTML = contenidoHTML;
}
