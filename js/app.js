const carrito = document.getElementById('carrito');
const Platillos = document.getElementById('Lista-Platillos');
const ListaPlatillos = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = documnet.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    Platillos.addEventListener('click', comprarPlatillo);
    carrito.addEventListener('click', eliminarPlatillo);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentloaded', leerLocalStorage);
}
 
function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const Platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(Platillo);
    }
}

function leerDatosPlatillo(Platillo) {
    const infoPlatillo = {
        imagen: Platillo.querySelector('img').src,
        titulo: Platillo.querySelector('h4').textContent,
        Precio: Platillo.querySelector('Precio span').textContent,
        id: Platillo.querySelector('a').getAttribute('data-id')
    }

    insertarcarrito(infoPlatillo);
}

function insertarcarrito(Platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${Platillo.imagen}" width=100>
       </td>
       <td>${Platillo.titulo}</td>
       <td>${Platillo.Precio}</td>
       <td>
        <a href="#" class="Borrar-Platillo" data-id="${Platillo.id}">x</a>
       </td>
    `;
    ListaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(Platillo);
}

function eliminarPlatillo(e) {
    e.preventDefault();

    let Platillo,
        PlatilloId;

    if(e.target.classList.contains('borrar-Platillo')) {
        e.target.parentElement.parentElement.remove();
        Platillo = e.target.parentElement.parentElement;
        PlatilloId = Platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(PlatilloId)
}

function vaciarCarrito() {
    while (ListaPlatillos.firstChild) {
        ListaPlatillos.removeChild(ListaPlatillos);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(Platillo) {
    let Platillos;

    Platillos = obtenerPlatillosLocalStorage();
    Platillos.push(Platillo);

    localStorage.setItem('Platillos', JSON.stringify(Platillos));
}

function obtenerPlatillosLocalStorage() {
    let PlatilloslS;

    if(localStorage.getItem('Platillos') === null) {
        PlatilloslS = {};
    } else {
        PlatilloslS = JSON.parse(localStorage.getItem('Platillos'));
    }
    return PlatillosLS;
}

function leerLocalStorage() {
    let PlatilloslS;

    PlatilloslS = obtenerPlatillosLocalStorage();

    PlatilloslS.forEach(function (Platillo) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${Platillo.imagen}" width=100>
            </td>
            <td> ${Platillo.titulo}</td>
            <td>${Platillo.Precio}</td>
            <td>
                <a href="#" class="Borrar-Platillo" data-id"${Platillo.id}">x</a>
            </td>
        `;
        Lista-Platillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(Platillo) {
    let PlatillosLS;
    PlatillosLS = obtenerPlatillosLocalStorage();

    PlatillosLS.forEach(function (PlatilloLS, index) {
        if(PlatilloLS.id === Platillo) {
        PlatilloLS.splice(index, 1);
        }
    });

    localStorage.setItem('Platillos', JSON.stringify(PlatillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}




