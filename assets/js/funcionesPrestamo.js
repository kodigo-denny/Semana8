const filasPrestamos = document.querySelector('#filasPrestamos');

function actualizarTablaPrestamo(){
    let tablaPrestamo = "";

    for(let i = 0; i < Prestamo.prestamos.length; i++){
        let devolver = "";
        if(Prestamo.prestamos[i].fechaDevolucion == null)
            devolver = `<button class='btn btn-success' onclick='devolverLibro(${Prestamo.prestamos[i].id})'>Devolver</button>`;
        tablaPrestamo += `<tr><td>${devolver}</td> <td>${Prestamo.prestamos[i].Libro.titulo}</td> <td>${Prestamo.prestamos[i].Persona.nombreCompleto}</td> <td>${Prestamo.prestamos[i].fechaPrestamo}</td> <td>${Prestamo.prestamos[i].fechaDevolucion}</td> <td>${Prestamo.prestamos[i].estado}</td></tr>`;
    }

    filasPrestamos.innerHTML = tablaPrestamo;
}

function devolverLibro(id){
    let prestamo = Prestamo.buscar(id);

    prestamo.devolver();

    actualizarTablaLibro();
    actualizarTablaPrestamo();
}


actualizarTablaPrestamo();