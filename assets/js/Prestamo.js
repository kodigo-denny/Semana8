class Prestamo{
    id
    Libro
    Persona
    fechaPrestamo
    fechaDevolucion

    static prestamos = []
    static ultimoId = 1;

    constructor(Libro, Persona){
        this.id = 0;
        this.Libro = Libro;
        this.Persona = Persona
        this.fechaPrestamo = new Date();
        this.fechaDevolucion = null;

        this.Libro.prestado = this.Libro.prestado + 1;
    }

    get estado(){
        if(this.fechaDevolucion == null)
            return "Prestado";
        else
            return "Devuelto";
    }

    static buscar(id){
        return Prestamo.prestamos.find(b => b.id == id);
    }

    static agregar(prestamo){
        prestamo.id = Prestamo.ultimoId;
        Prestamo.prestamos.push(prestamo);
        Prestamo.ultimoId++;
        return true;
    }

    devolver() {
        if(this.fechaDevolucion == null){
            this.fechaDevolucion = new Date();
            this.Libro.prestado = this.Libro.prestado - 1;
        }
    }
    
}