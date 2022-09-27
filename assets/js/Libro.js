class Libro{
    id
    titulo
    autor
    categoria
    añoPublicacion
    ISBN
    cantidad
    prestado

    static libros = []
    static ultimoId = 1

    constructor(titulo, autor, categoria, añoPublicacion, ISBN, cantidad){
        this.id = 0;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.añoPublicacion = añoPublicacion;
        this.ISBN = ISBN;
        this.cantidad = cantidad;
        this.prestado = 0;
    }

    get disponibles(){
        return this.cantidad - this.prestado;
    }

    // libro: es el objeto a recibir
    static agregar(libro){
        libro.id = Libro.ultimoId;
        Libro.libros.push(libro);
        Libro.ultimoId++;
        return true;
    }

    static buscar(id){
        return Libro.libros.find(b => b.id == id);
    }

    static eliminar(id){
        let index = Libro.libros.findIndex(b => b.id == id);

        if(index == -1)
            return false;
        else{
            Libro.libros.splice(index, 1);
            return true;
        }
    }
}