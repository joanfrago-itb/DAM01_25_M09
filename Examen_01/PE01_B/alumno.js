// Datos iniciales de la flota espacial
const datosIniciales = `[
    { "id": "NAV-0001", "modelo": "Carguero Titan", "capacidadCarga": 5000, "estado": "En ruta", "capitan": "Laura Martín" },
    { "id": "NAV-0002", "modelo": "Explorador Nova", "capacidadCarga": 1200, "estado": "Disponible" },
    { "id": "NAV3", "modelo": "Transportador Orion", "capacidadCarga": 8000, "estado": "Mantenimiento", "capitan": "Carlos Ruiz" },
    { "id": "NAV-0004", "modelo": "Fragata Estelar", "capacidadCarga": 3500, "estado": "En ruta", "capitan": "Ana García" },
    { "id": "NAV-0005", "modelo": "Crucero Quantum", "capacidadCarga": 12000, "estado": "Disponible", "capitan": "Miguel Torres" },
    { "id": "NAV-0006", "modelo": "Carguero Pegasus", "capacidadCarga": 6200, "estado": "En ruta" },
    { "id": "NAV-0007", "modelo": "Explorador Helios", "capacidadCarga": 900, "estado": "Mantenimiento", "capitan": "Sofia Hernández" },
    { "id": "NAV-0008", "modelo": "Transportador Atlas", "capacidadCarga": 15000, "estado": "Disponible", "capitan": "Pedro Jiménez" },
    { "id": "NAV-0009", "modelo": "Nave Médica Phoenix", "capacidadCarga": 2500, "estado": "En ruta", "capitan": "Elena Navarro" },
    { "id": "NAV-0010", "modelo": "Minero Asteroid", "capacidadCarga": 10000, "estado": "Mantenimiento" },
    { "id": "NAV-0011", "modelo": "Interceptor Velocity", "capacidadCarga": 800, "estado": "Disponible", "capitan": "Javier Moreno" },
    { "id": "NAV-0012", "modelo": "Carguero Mammoth", "capacidadCarga": 18000, "estado": "En ruta", "capitan": "Isabel Romero" },
    { "id": "NAV0013", "modelo": "Explorador Frontier", "capacidadCarga": 1500, "estado": "Disponible" },
    { "id": "NAV-0014", "modelo": "Transportador Galaxy", "capacidadCarga": 7500, "estado": "Mantenimiento", "capitan": "Roberto Sánchez" },
    { "id": "NAV-0015", "modelo": "Crucero Neptune", "capacidadCarga": 9500, "estado": "En ruta", "capitan": "Carmen López" }
]`;

// 1. MODELADO DE DATOS (2 puntos)
class NaveEspacial {
    id;
    modelo;
    capacidadCarga;
    estado;
    capitan;
    
    #_estadosValidos = ["En ruta", "Mantenimiento", "Disponible"];

    constructor(id, modelo, capacidadCarga, estado, capitan){
        this.id = id;
        this.modelo = modelo;
        this.capacidadCarga = capacidadCarga;
        this.estado = estado;
        this.capitan = capitan;
    }

    validarRegistro(){
        // validar id
        if(this.id.length != 8){
            return false;
        }

        let nav = this.id.substring(0,4);
        if(nav == "NAV-"){
            let idNum = this.id.substring(4,8);
            for(let n of idNum){
                if(n >= 0 && n < 9){
                    continue;
                } else {
                    return false;
                }
            }
        }

        // validar estado
        let estadoValido = false;

        this.#_estadosValidos.forEach(e => {
            if(this.estado == e) estadoValido = true;
        });

        return estadoValido;
    }
}

// test
let nave = new NaveEspacial("NAV-0042","Carguero Titan",5000,"En ruta","Ana Gómez");
console.log(nave.validarRegistro());

let flotaEspacial = new Map;

// 2. CARGA INICIAL Y GESTIÓN DE LA FLOTA (3,5 puntos)
// Función para cargar la flota desde el JSON
function cargarFlota() {
    const datos = JSON.parse(datosIniciales);

    datos.forEach((_nave) => {
        // hay algunas naves sin capitan
        if(_nave.capitan == undefined){
            _nave.capitan = "Sin Capitán";
        }

        let nave = new NaveEspacial(_nave.id, _nave.modelo, _nave.capacidadCarga, _nave.estado, _nave.capitan);
        if(nave.validarRegistro()){
            flotaEspacial.set(nave.id, nave);
        }
    });

    console.log(flotaEspacial);
}

// 3. VISUALIZACIÓN EN TABLA (1.5 puntos)
function renderizarTabla(flota) {
    let tabla = document.getElementById("datosTabla");
    tabla.innerHTML = "";

    flotaEspacial.forEach((nave) => {
        let classEstado = nave.estado == "Mantenimiento" ? "nave-alerta" : "";

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nave.id}</td>
            <td>${nave.modelo}</td>
            <td>${nave.capacidadCarga}</td>
            <td class="${classEstado}">${nave.estado}</td>
            <td>${nave.capitan}</td>
        `;

        tabla.appendChild(fila);
    });
}

// 4. SIMULACIÓN EN TIEMPO REAL (2 puntos)
function encenderSimulacion() {
    let id = "NAV-0008";

    let nave = flotaEspacial.get(id);
    if(nave.estado == "En ruta") nave.estado = "Disponible";
    else if(nave.estado == "Disponible") nave.estado = "En ruta";
    
    renderizarTabla(flotaEspacial);
}
function apagarSimulacion(intId) {
    clearInterval(intId);
}

// 5. BUSCADOR POR CAPACIDAD (1 punto)
function buscarPorCapacidad() {
    let capacidad = document.getElementById("inputCapacidad");
    capacidad = parseInt(capacidad);

    let navesFiltradas = new Map;
    flotaEspacial.forEach((key, nave) => {
        if(nave.capacidadCarga >= capacidad){
            navesFiltradas.set(key, nave);
        }
    });

    renderizarTabla(navesFiltradas);
}
function mostrarTodas() {
    renderizarTabla(flotaEspacial);
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar la flota
    cargarFlota();
    
    // Renderizar tabla inicial
    renderizarTabla(flotaEspacial);
    
    // Configurar eventos de botones
    let intId;

    let btnEncenderSimulacion = document.getElementById("btnEncender");
    btnEncenderSimulacion.addEventListener("click", () => {
        console.log("Simulacion iniciada");
        intId = setInterval(encenderSimulacion, 5000);
    });

    let btnApagarSimulacion = document.getElementById("btnApagar");
    btnApagarSimulacion.addEventListener("click", () => {
        console.log("Simulacion apagada");
        apagarSimulacion(intId);
    });

    let btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", buscarPorCapacidad);


    let btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", mostrarTodas);
});
