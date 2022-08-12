// Selectors
const eanInput = document.querySelector(".input-ean");
const nombreProductoInput = document.querySelector(".input-producto");
const fechaInput = document.querySelector(".input-fecha");

const productoLista = document.querySelector(".lista-producto");

const buttomEnviar = document.querySelector("#enviar");


//Event Listeners
document.addEventListener('DOMContentLoaded', actualizarProductosEnLocalStorage);
buttomEnviar.addEventListener('click', agregarProducto);
productoLista.addEventListener('click', eliminarProducto);


//Functions
function agregarProducto(event){
    event.preventDefault();

    // Producto TR
    const productoTr = document.createElement("tr");
    
    //Crear Ena
    const nuevoEan = document.createElement("td");
    nuevoEan.innerText = eanInput.value;
    
    // Crear nombre del producto
    const nuevoProductoNombre = document.createElement("td");
    nuevoProductoNombre.innerText = nombreProductoInput.value;

    // Crear feche de vencimiento
    const nuevoFecha = document.createElement("td");
    nuevoFecha.innerText = fechaInput.value;

    // Crear la cantidad de dias faltantes
    const diasFaltantes = document.createElement("td");
    const cantidadDiasFaltantes = calcularDias(fechaInput.value)
    diasFaltantes.innerText = cantidadDiasFaltantes;

    //Agregar un producto a la tabla
    productoTr.appendChild(nuevoEan);
    productoTr.appendChild(nuevoProductoNombre);
    productoTr.appendChild(nuevoFecha);
    productoTr.appendChild(diasFaltantes);

    //Local Storege
    guardarProdunctosEnLocalStorage(eanInput.value, nombreProductoInput.value, fechaInput.value, cantidadDiasFaltantes);

    //Crear boton eliminar
    const eliminarButton = document.createElement("button");
    eliminarButton.innerHTML = '<i class= "fas fa-trash"></i>';
    eliminarButton.classList = "btn-trash"
    productoTr.appendChild(eliminarButton)
    
    // agregar a la lista
    productoLista.appendChild(productoTr);
    
    //limpiar INPUT VALUE
    eanInput.value = "";
    nombreProductoInput.value = "";
    fechaInput.value = "";


}

function eliminarProducto(e){

    const item = e.target;

    if(item.classList[0] === 'btn-trash'){
        
        const producto = item.parentElement;
        eliminarProductoEnLocalStorage(producto)
        producto.remove();
    }
}

function calcularDias (inputFechaVencimiento) {
    const fechaDeVencimiento = new Date(inputFechaVencimiento);
    const fechaActual = new Date();
    const unDiaEnMs = 86400000;

    const diferenciasEntreMs = fechaDeVencimiento.getTime() - fechaActual.getTime();
    const cantidadDeDias = parseInt(diferenciasEntreMs/unDiaEnMs) + 1;
    

    return cantidadDeDias;
}

function guardarProdunctosEnLocalStorage (valorEan, valorNombreProducto, valorFechaVencimiento, valorCantidadDias) {

    let ean, nombreProducto, fechaVencimiento, cantidadDias;

    if(localStorage.getItem('ean') === null && localStorage.getItem('nombreProducto') === null && localStorage.getItem('fechaVencimiento') === null && localStorage.getItem('cantidadDias') === null){
        
        ean = [];
        nombreProducto = [];
        fechaVencimiento = [];
        cantidadDias = [];

    } else {
        ean = JSON.parse(localStorage.getItem("ean"));
        nombreProducto = JSON.parse(localStorage.getItem("nombreProducto"));
        fechaVencimiento = JSON.parse(localStorage.getItem("fechaVencimiento"));
        cantidadDias = JSON.parse(localStorage.getItem("cantidadDias"));
    }

    ean.push(valorEan);
    nombreProducto.push(valorNombreProducto);
    fechaVencimiento.push(valorFechaVencimiento);
    cantidadDias.push(valorCantidadDias);

    localStorage.setItem("ean", JSON.stringify(ean));
    localStorage.setItem("nombreProducto", JSON.stringify(nombreProducto));
    localStorage.setItem("fechaVencimiento", JSON.stringify(fechaVencimiento));
    localStorage.setItem("cantidadDias", JSON.stringify(cantidadDias));

}

function actualizarProductosEnLocalStorage () {

    let  ean, nombreProducto, fechaVencimiento, cantidadDias;

    if(localStorage.getItem('ean') === null && localStorage.getItem('nombreProducto') === null && localStorage.getItem('fechaVencimiento') === null && localStorage.getItem('cantidadDias') === null){
        
        ean = [];
        nombreProducto = [];
        fechaVencimiento = [];
        cantidadDias = [];

    } else {
        ean = JSON.parse(localStorage.getItem("ean"));
        nombreProducto = JSON.parse(localStorage.getItem("nombreProducto"));
        fechaVencimiento = JSON.parse(localStorage.getItem("fechaVencimiento"));
        cantidadDias = JSON.parse(localStorage.getItem("cantidadDias"));
    }

    for(let i = 0; i < ean.length; i++){
        // Producto TR
        const productoTr = document.createElement("tr");
    
        //Crear Ena
        const nuevoEan = document.createElement("td");
        nuevoEan.innerText = ean[i];
        // Crear nombre del producto
        const nuevoNombreProducto = document.createElement("td");
        nuevoNombreProducto.innerText = nombreProducto[i];

        // Crear feche de vencimiento
        const nuevoFecha = document.createElement("td");
        nuevoFecha.innerText = fechaVencimiento[i];

        // Crear la cantidad de dias faltantes
        const diasFaltantes = document.createElement("td");
        diasFaltantes.innerText = calcularDias(fechaVencimiento[i]);

        //Agregar un producto a la tabla
        productoTr.appendChild(nuevoEan);
        productoTr.appendChild(nuevoNombreProducto);
        productoTr.appendChild(nuevoFecha);
        productoTr.appendChild(diasFaltantes);

        //Crear boton eliminar
        const eliminarButton = document.createElement("button");
        eliminarButton.innerHTML = '<i class= "fas fa-trash"></i>';
        eliminarButton.classList = "btn-trash"
        productoTr.appendChild(eliminarButton)
        
        // agregar a la lista
        productoLista.appendChild(productoTr);
    }
    
}

function eliminarProductoEnLocalStorage (valorProducto){

    let ean, nombreProducto, fechaVencimiento, cantidadDias;

   if(localStorage.getItem('ean') === null && localStorage.getItem('nombreProducto') === null && localStorage.getItem('fechaVencimiento') === null && localStorage.getItem('cantidadDias') === null){
        
        ean = [];
        nombreProducto = [];
        fechaVencimiento = [];
        cantidadDias = [];

    } else {
        ean = JSON.parse(localStorage.getItem("ean"));
        nombreProducto = JSON.parse(localStorage.getItem("nombreProducto"));
        fechaVencimiento = JSON.parse(localStorage.getItem("fechaVencimiento"));
        cantidadDias = JSON.parse(localStorage.getItem("cantidadDias"));
    }

    const productoIndex = valorProducto.children[0].innerText;

    ean.splice(ean.indexOf(productoIndex), 1);
    nombreProducto.splice(nombreProducto.indexOf(productoIndex), 1);
    fechaVencimiento.splice(fechaVencimiento.indexOf(productoIndex), 1);
    cantidadDias.splice(cantidadDias.indexOf(productoIndex), 1);

    localStorage.setItem("ean", JSON.stringify(ean));
    localStorage.setItem("nombreProducto", JSON.stringify(nombreProducto));
    localStorage.setItem("fechaVencimiento", JSON.stringify(fechaVencimiento));
    localStorage.setItem("cantidadDias", JSON.stringify(cantidadDias));



}