const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es obligatorio'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });
        callback(atenderTicket);
        // client.broadcast.emit('estadoActual', {
        //     actual: ticketControl.getUltimoTicket()
        // });
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let numero = ticketControl.siguiente();
        // client.broadcast.emit('estadoActual', {
        //     actual: ticketControl.getUltimoTicket()
        // });
        callback(numero);
    });

});