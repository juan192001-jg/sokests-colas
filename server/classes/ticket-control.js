/** Dependencias Nativas de Node */
const fs = require( 'fs' );

/** Clase - Model */
class Ticket {
    constructor( number, desktop ) {
        this .number = number;
        this .desktop = desktop;
    }
}

/** Clase */
class TicketControl {
    constructor() {
        this .last = 0;                         // Ultimo Ticket
        this .today = new Date() .getDate();    // Fecha actual 
        this .pendingTickets = [];              // Tickets sin atender
        this .lastFourTickets = [];             // Ultimos 4 Tiquetes
        this .validatePendings();               // Valida Tickets Pendientes 
    }

    validatePendings() {
        let data = require( '../data/data.json' );

        /** Valida si algun registro tiene la fecha actual */
        if( data .today === this .today ) {     // Aun hay tickets pendientes
            this .last = data .last;
            this .pendingTickets = data .tickets;   // Obtiene los tickets pendientes guardados y los carga al objeto
            this .lastFourTickets = data .lastFourTickets;   // Obtiene los tickets pendientes guardados y los carga al objeto
        } 
        else {                                  // Es un día nuevo, entonces reinicia el conteo
            this .resetCount();
        }

        console .log( 'dataFile', data );

    }

    resetCount() {
        this .last = 0;
        this .pendingTickets = [];
        this .lastFourTickets = [];
        console .log( 'Reinicia conteo, es un nuevo día' );
        this .saveData();
    }

    next() {
        this .last += 1;
        this .pendingTickets .push( new Ticket( this .last, null ) );
        this .saveData();

        return `Ticket ${ this .last }`;
    }

    getLast() {
        return `Ticket ${ this .last }`;
    }

    getLastFourTickets() {
        return this .lastFourTickets;
    }

    attend( desktop ) {
        /** Valida si hay Tickets pendientes */
        if( this .pendingTickets .length === 0 ) {
            
            return {
                success: false,
                message:'Nadie'
            } 
        } 

        let numberTicket = this .pendingTickets[ 0 ] .number;   // Obtiene el numero del Ticket en la cola de espera (Forma recomendada)
        this .pendingTickets .shift();                          // Elimina el primer elemento del Array

        let attendTicket = new Ticket( numberTicket, desktop ); // Crea Ticket y asigna escritorio que va a atenderlo
        
        attendTicket .success = true;   // Agrega nueva propiedad al ticket
        this .lastFourTickets .unshift( attendTicket );         // Agrega elemento al inicio del Array

        if( this .lastFourTickets .length > 4 ) {
            this .lastFourTickets .splice( -1, 1 );              // Elimina el ultimo elemento del Array
        }

        console .log( 'Ultimos 4 Tickets', this .lastFourTickets );
        this .saveData();
        
        return attendTicket;
    }

    saveData() {
        let jsonData = {        // Data in JSON
                today: this .today,
                last: this .last,
                tickets: this .pendingTickets,      // Guarda los tickets pendientes del objeto en el archivo
                lastFourTickets: this .lastFourTickets      // Guarda los ultimos 4 tickets del objeto en el archivo
            },
            data = JSON .stringify( jsonData );    // Data in String

        fs .writeFileSync( './server/data/data.json', data );   // Guarda datos en el archivo 'data.json'
        console .log( 'Guarda los datos' );   
    }

}

/** Exporta Clase */
module .exports = {
    TicketControl
}