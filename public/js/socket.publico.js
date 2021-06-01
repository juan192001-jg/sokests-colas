/** Sockets */
var socket = io(), // Como la hemos definido en el BackEnd debemos invocarla en el FrontEnd. En nuestro caso 'io'
    labelTicket1 = $('#lblTicket1'),
    labelTicket2 = $('#lblTicket2'),
    labelTicket3 = $('#lblTicket3'),
    labelTicket4 = $('#lblTicket4'),
    labelDesktop1 = $('#lblEscritorio1'),
    labelDesktop2 = $('#lblEscritorio2'),
    labelDesktop3 = $('#lblEscritorio3'),
    labelDesktop4 = $('#lblEscritorio4'),

    labelTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4],
    labelDesktops = [labelDesktop1, labelDesktop2, labelDesktop3, labelDesktop4];

/** Escucha el estado actual del Ticket */
socket.on('currentStatus', (data) => {
    sound(); // TO DO: Reproducir sonido
    console.log('Servidor', data);
    updateDOM(data.lastFourTickets);
});

let sound = () => {
    var audio = new Audio('audio/new-ticket.mp3');

    var playPromise = audio.play();

    if (playPromise !== undefined) {

        playPromise.then(_ => {
                console.log('Bim, bin!');
                // Automatic playback started!
                // Show playing UI.
                playPromise; // Solo suena en (Chrome/Firefox). Sin embargo, no funciona todo el tiempo.
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }
}

let updateDOM = (lastFourTickets) => {
    for (i = 0; i <= lastFourTickets.length - 1; i++) {
        labelTickets[i].text(`Ticket ${ lastFourTickets[ i ] .number }`);
        labelDesktops[i].text(` ${ lastFourTickets[ i ] .desktop }`);
    }
}