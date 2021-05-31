/** Sockets */
var socket = io(), // Como la hemos definido en el BackEnd debemos invocarla en el FrontEnd. En nuestro caso 'io'
    label = $('small'); // Obtiene el elemento que despliega # Ticket que se atiende.

/** Obtener los parametros de busqueda */
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

/** Valida si NO existe el parametro 'escritorio' en la URL */
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'; // Redirecccion a index.html
    throw new Error('El escritorio es necesario'); // En teoria es igual a usar un return. Sin embargo este ultimo se usa cuando la logica esta dentro de una funcion y en este caso no lo esta.
}
socket.on('nextTicket', numero => {
    $('h2').text(` ${numero }`);
})


var deskNumber = searchParams.get('escritorio'); // Obtiene el valor que tiene este parametro
console.log('Escritorio', deskNumber);

$('h1').text(` ${ deskNumber }`);



// /** Escucha el estado actual del Ticket */
// socket .on( 'currentStatus', ( data ) => {
//     console .log( 'Servidor', data );
//     label .text( data .currentTicketNumber );	
// })

$('button').on('click', () => {
    console.log('Haz hecho click en un boton');

    /** Emite un mensaje al Servidor 
     * De esta misma manera usando la consola del navegador puedo enviar datos al Servidor
     * sin olvidar usar el mismo nombre del evento programado, en nuestro caso 'userData' */
    socket.emit('attendTicket', { desktop: deskNumber }, (ticket) => { // CallBack	
        console.log('Servidor', ticket);

        /** No hay tickets */
        if (!ticket.success || ticket.number === undefined) {
            label.text(ticket.message);
            //alert( ticket .message );
            alert('No hay mas tickets');
            return;
        }

        label.text(`Ticket ${ ticket .number }`);
    });
});