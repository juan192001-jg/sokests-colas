const { io } = require( '../server' ),
      { TicketControl } = require( '../classes/ticket-control' ),
      ticket = new TicketControl();

/** Escucho en el evento de conexión del Cliente. */
io .on( 'connection', ( client ) => {
    console .log( 'Usuario conectado al Servidor!' );    // Registro en la consola la conexión del Socket al Servidor

    /** Emitir el ticket actual */
    client .emit( 'currentStatus', {
        currentTicketNumber: ticket .getLast(),
        lastFourTickets: ticket .getLastFourTickets()
    });

    /** Escucha evento de desconección del Cliente */
    client .on( 'disconnect', () => {
        console .log( 'Usuario desconectado del Servidor!' );
    });

    /** Escucha al Cliente & Recoge los datos Emitidos
     *  - Esta comunicación es 1&1 (Pruebe con varias pestañas en su navegador)
     *  - El Cliente se comunica con el Servidor, pero su mensaje no es visto por otros */
    client .on( 'nextTicket', ( data, callback ) => {     // 'userData' Nombre del evento esperado
        let numberTicket = ticket .next();

        console .log( 'Solicita', numberTicket );	
        callback( numberTicket );
    });

    /** Escucha al Cliente */
    client .on( 'attendTicket', ( data, callback ) => {
        /** Valida si el escritorio existe */
        if( ! data .desktop ) {
            return callback({
                success: false,
                error: {
                    message: 'El escritorio es necesario'
                }
            });
        }

        let attendTicket = ticket .attend( data .desktop );
        console .log( 'Atender Ticket', attendTicket .number );
        callback( attendTicket );
        
        client .broadcast .emit( 'currentStatus', {
            currentTicketNumber: ticket .getLast(),
            lastFourTickets: ticket .getLastFourTickets()
        });

    })

});