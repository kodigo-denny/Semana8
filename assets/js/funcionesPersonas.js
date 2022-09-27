const txtDui = document.querySelector("#txtDui");
const txtNombre = document.querySelector("#txtNombre");
const txtApellido = document.querySelector("#txtApellido");
const txtDireccion = document.querySelector("#txtDireccion");
const txtTelefono = document.querySelector("#txtTelefono");
const txtCorreo = document.querySelector("#txtCorreo");

const formPersona = document.querySelector("#formularioPersona");
const modalPersona = document.querySelector("#modalPersona");

const btnGuardarPersona = document.querySelector("#btnGuardarPersona");

const filasPersonas = document.querySelector("#filasPersonas");
const btnNuevaPersona = document.querySelector("#btnNuevaPersona");

let persona;
let nuevaPersona = true;

modalPersona.addEventListener('hidden.bs.modal', (e) =>{
    vaciarPersona();
})

btnNuevaPersona.addEventListener('click', (e) =>{

    //txtDui.attributes.disabled = "disabled";
})

btnGuardarPersona.addEventListener('click', (e) => {
    if(validarPersona()){
        if(nuevaPersona == true){
            persona = new Persona(txtDui.value, txtNombre.value, txtApellido.value, txtDireccion.value, txtTelefono.value, txtCorreo.value);

            let resultado = Persona.agregar(persona); 

            if(resultado){
                actualizarTablaPersona();
                $("#modalPersona").modal('hide');
                vaciarPersona();
            }
        }
        else{
            // Editar
            persona.dui = txtDui.value;
            persona.nombre = txtNombre.value;
            persona.apellido = txtApellido.value;
            persona.direccion = txtDireccion.value;
            persona.telefono = txtTelefono.value;
            persona.correo = txtCorreo.value;
            actualizarTablaPersona();
            vaciarPersona();
            $("#modalPersona").modal('hide');
        }
    }
})

function editarPersona(dui){
    nuevaPersona = false;

    persona = Persona.buscar(dui);

    txtDui.value = persona.dui;
    txtNombre.value = persona.nombre;
    txtApellido.value = persona.apellido;
    txtDireccion.value = persona.direccion;
    txtTelefono.value = persona.telefono;
    txtCorreo.value = persona.correo;
}


function eliminarPersona(dui){
    let resultado = Persona.eliminar(dui);

    
    if(resultado)
        actualizarTablaPersona();
}

function actualizarTablaPersona(){
    let tablaPersona = "";

    for(let i = 0; i < Persona.personas.length; i++){
        let editar = `<button class='btn btn-secondary' onclick="editarPersona(${Persona.personas[i].dui})" data-bs-toggle="modal" data-bs-target="#modalPersona">Editar</button>`;
        let eliminar = `<button class='btn btn-danger' onclick="eliminarPersona(${Persona.personas[i].dui})">Eliminar</button>`;
        tablaPersona += `<tr><td>${editar} ${eliminar}</td> <td>${Persona.personas[i].dui}</td> <td>${Persona.personas[i].nombre}</td> <td>${Persona.personas[i].apellido}</td> <td>${Persona.personas[i].direccion}</td> <td>${Persona.personas[i].telefono}</td> <td>${Persona.personas[i].correo}</td> </tr>`
    }

    filasPersonas.innerHTML = tablaPersona;
}

function validarPersona(){
    let resultado = formPersona.checkValidity();

    if(!resultado){
        event.preventDefault();
        event.stopPropagation();
    }

    formPersona.classList.add('was-validated')
    return resultado;
}

function vaciarPersona(){
    txtDui.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtDireccion.value = "";
    txtTelefono.value = "";
    txtCorreo.value = "";
    nuevaPersona = true;
}