// Variables globales
let equipos = [];
let servicios = [];

// Función para cargar los equipos desde la API o localStorage
const inicializarEquipos = async () => {
    try {
        // Primero intentamos cargar desde localStorage
        const equiposLS = cargarEquiposLS();
        
        if (equiposLS.length > 0) {
            // Si hay datos en localStorage, los usamos
            equipos = equiposLS;
            console.log("Equipos cargados desde localStorage");
        } else {
            // Si no hay datos en localStorage, cargamos desde la API
            const response = await fetch('./data/equipos.json');
            if (!response.ok) {
                throw new Error('No se pudo cargar los equipos');
            }
            const data = await response.json();
            equipos = data.equipos;
            
            // Guardamos en localStorage para futuros accesos
            guardarEquiposLS(equipos);
            console.log("Equipos cargados desde API y guardados en localStorage");
        }
    } catch (error) {
        console.error("Error al cargar los equipos:", error);
        equipos = []; // Inicializamos con array vacío en caso de error
        mostrarMensaje("No hay equipos disponibles en este momento");
    }
};

// Función para cargar los servicios desde la API o localStorage
/* const inicializarServicios = async () => {
    try {
        // Primero intentamos cargar desde localStorage
        const serviciosLS = cargarServiciosLS();
        
        if (serviciosLS.length > 0) {
            // Si hay datos en localStorage, los usamos
            servicios = serviciosLS;
            console.log("Servicios cargados desde localStorage");
        } else {
            // Si no hay datos en localStorage, cargamos desde la API
            const response = await fetch('./data/servicios.json');
            if (!response.ok) {
                throw new Error('No se pudo cargar los servicios');
            }
            const data = await response.json();
            servicios = data.servicios;
            
            // Guardamos en localStorage para futuros accesos
            guardarServiciosLS(servicios);
            console.log("Servicios cargados desde API y guardados en localStorage");
        }
    } catch (error) {
        console.error("Error al cargar los servicios:", error);
        servicios = []; // Inicializamos con array vacío en caso de error
        mostrarMensaje("No hay servicios disponibles en este momento");
    }
}; */

// Función para inicializar toda la aplicación
const inicializarApp = async () => {
    try {
        // Cargamos tanto equipos como servicios
        await Promise.all([
            inicializarEquipos(),
            //inicializarServicios()
        ]);

        // Una vez que tenemos los datos, renderizamos todo
        renderEquipos();
        //renderServicios();
        renderBotonCarrito();
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
        mostrarMensaje("Hubo un error al cargar la aplicación");
    }
};

// Cuando el documento está listo, iniciamos la aplicación
document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

// El resto de tus funciones existentes permanecen igual...