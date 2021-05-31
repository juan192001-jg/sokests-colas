/** Sockets */
var socket = io(),      // Como la hemos definido en el BackEnd debemos invocarla en el FrontEnd. En nuestro caso 'io'
     label = $( '#lblNuevoTicket' );    // Obtiene el elemento que despliega el nuevo Ticket

/** Escucha el estado actual del Ticket */
socket .on( 'currentStatus', ( data ) => {
    console .log( 'Servidor', data );
    label .text( data .currentTicketNumber );	
})

$( 'button' ) .on( 'click', function() {
    console .log( 'Haz hecho click en un boton' );

    /** Emite un mensaje al Servidor 
     * De esta misma manera usando la consola del navegador puedo enviar datos al Servidor
     * sin olvidar usar el mismo nombre del evento programado, en nuestro caso 'userData' */
    socket .emit( 'nextTicket', null, function( newTicket ) {    // CallBack	  
        console .log( 'Servidor', newTicket );
        label .text( newTicket );	                
    });
});