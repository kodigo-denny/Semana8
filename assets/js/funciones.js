const filasLibros = document.querySelector('#filasLibros');
const btnGuardar = document.querySelector("#btnGuardar");
const txtId = document.querySelector("#txtId")
const txtTitulo = document.querySelector("#txtTitulo")
const txtAutor = document.querySelector("#txtAutor")
const txtCategoria = document.querySelector("#txtCategoria")
const txtAñoPublicacion = document.querySelector("#txtAñoPublicacion")
const txtISBN = document.querySelector("#txtISBN")
const txtCantidad = document.querySelector("#txtCantidad")

const form = document.querySelector('#formularioLibro')
const modalLibro = document.querySelector("#modalLibro");

const menuLibros = document.querySelector('#menuLibros');
const menuPersonas = document.querySelector('#menuPersonas');
const menuPrestamos = document.querySelector('#menuPrestamos');

const crudLibro = document.querySelector('#crudLibro');
const crudPersona = document.querySelector('#crudPersona');
const crudPrestamo = document.querySelector('#crudPrestamo');

const cbPersona = document.querySelector('#cbPersona');

let libro;
let nuevo = true;

menuLibros.addEventListener('click', (e) => {
    crudLibro.classList = "";
    crudPersona.classList = "invisible";
    crudPrestamo.classList = "invisible";
})

menuPersonas.addEventListener('click', (e) =>{
    crudLibro.classList = "invisible";
    crudPersona.classList = "";
    crudPrestamo.classList = "invisible";
})

menuPrestamos.addEventListener('click', (e) =>{
    crudLibro.classList = "invisible";
    crudPersona.classList = "invisible";
    crudPrestamo.classList = "";    
})

modalLibro.addEventListener('hidden.bs.modal', (e) => {
    vaciar();
})

btnGuardar.addEventListener('click', (e) => {
    if(validar() == true){
        // Guardado o edicción
        if(nuevo == true){
            // nuevo registro
            libro = new Libro(txtTitulo.value, txtAutor.value, txtCategoria.value, txtAñoPublicacion.value, txtISBN.value, txtCantidad.value);
            
            let resultado = Libro.agregar(libro);
            if(resultado == true){
                actualizarTablaLibro();
                $("#modalLibro").modal('hide');
                vaciar();
            }
        }
        else{
            //Editar un libro
            libro.titulo = txtTitulo.value;
            libro.autor = txtAutor.value;
            libro.categoria = txtCategoria.value;
            libro.añoPublicacion = txtAñoPublicacion.value;
            libro.ISBN = txtISBN.value;
            libro.cantidad = txtCantidad.value;
            actualizarTablaLibro();
            vaciar();
            $("#modalLibro").modal('hide');
        }
    }
})

function vaciar(){
    txtTitulo.value = "";
    txtAutor.value = "";
    txtCategoria.value = "";
    txtAñoPublicacion.value = "";
    txtISBN.value = "";
    txtCantidad.value = "";

    nuevo = true;
}

function validar(){
    let resultado = form.checkValidity()

    if (!resultado) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
    return resultado;
}

function editar(id){
    nuevo = false;

    libro = Libro.buscar(id);

    txtId.value = libro.id
    txtTitulo.value = libro.titulo;
    txtAutor.value = libro.autor;
    txtCategoria.value = libro.categoria;
    txtAñoPublicacion.value = libro.añoPublicacion;
    txtISBN.value = libro.ISBN;
    txtCantidad.value = libro.cantidad;
}

function eliminar(id){
    let resultado = Libro.eliminar(id);

    if(resultado == true)
        actualizarTablaLibro();
}

function actualizarTablaLibro(){

    let tablaLibro = "";
    
    for(let i = 0; i < Libro.libros.length; i++){
        let editar = `<button class='btn btn-secondary' onclick="editar(${Libro.libros[i].id})" data-bs-toggle="modal" data-bs-target="#modalLibro">Editar</button>`;
        let eliminar = `<button class='btn btn-danger' onclick="eliminar(${Libro.libros[i].id})">Eliminar</button>`;
        let prestar = `<button class='btn btn-success' onclick="prestar(${Libro.libros[i].id})" data-bs-toggle="modal" data-bs-target="#modalPrestar">Prestar</button>`
        tablaLibro += `<tr><td>${editar} ${eliminar} ${prestar}</td> <td>${Libro.libros[i].id}</td> <td>${Libro.libros[i].titulo}</td> <td>${Libro.libros[i].autor}</td> <td>${Libro.libros[i].categoria}</td> <td>${Libro.libros[i].añoPublicacion}</td> <td>${Libro.libros[i].ISBN}</td> <td>${Libro.libros[i].cantidad}</td> <td>${Libro.libros[i].prestado}</td> <td>${Libro.libros[i].disponibles}</td></tr>`;
    }

    filasLibros.innerHTML = tablaLibro;
}

function prestar(id){
    let libroPrestar = Libro.buscar(id);

    let elementosSelect = "";
    for(let i = 0; i < Persona.personas.length; i++){
        elementosSelect += `<option value='${Persona.personas[i].dui}'>${Persona.personas[i].nombre} ${Persona.personas[i].apellido}</option>`;
    }
    
    cbPersona.innerHTML = elementosSelect;
}

actualizarTablaLibro();