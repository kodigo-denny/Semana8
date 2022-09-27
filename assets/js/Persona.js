class Persona{
    dui// ID
    nombre
    apellido
    direccion
    telefono
    correo

    static personas = []

    constructor(dui, nombre, apellido, direccion, telefono, correo){
        this.dui = dui;
        this.nombre = nombre,
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }

    static agregar(persona){
        Persona.personas.push(persona);
        return true;
    }

    static buscar(dui){
        return Persona.personas.find(b => b.dui==dui)
    }

    static eliminar(dui){
        let index = Persona.personas.findIndex(b => b.dui==dui);

        if(index == -1)
            return false;
        else{
            Persona.personas.splice(index, 1);
            return true;
        }
    }
}