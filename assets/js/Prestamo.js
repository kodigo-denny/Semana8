class Prestamo{
    Libro
    Persona
    fechaPrestamo
    fechaDevolucion

    constructor(Libro, Persona){
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

    devolver() {
        if(this.fechaDevolucion == null){
            this.fechaDevolucion = new Date();
            this.Libro.prestado = this.Libro.prestado - 1;
        }
    }
    
}