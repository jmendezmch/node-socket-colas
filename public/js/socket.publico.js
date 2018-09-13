var socket = io();
var label = $('small');


// socket.on('connect', function() {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', function() {
//     console.log('perdimos conexion con el servidor');
// });
socket.on('estadoActual', function(data) {
    console.log(data);
    var ultimos4 = data.ultimos4;
    for (var i = 0; ultimos4.length > i; i++) {
        var posicion = i + 1;
        $('#lblTicket' + posicion).text('Ticket: ' + ultimos4[i].numero);
        $('#lblEscritorio' + posicion).text('Escritorio: ' + ultimos4[i].escritorio);
    }

    // label.text(data.actual);
});
socket.on('ultimos4', function(data) {
    console.log(data);
    var ultimos4 = data.ultimos4;
    for (var i = 0; ultimos4.length > i; i++) {
        var posicion = i + 1;
        $('#lblTicket' + posicion).text('Ticket: ' + ultimos4[i].numero);
        $('#lblEscritorio' + posicion).text('Escritorio: ' + ultimos4[i].escritorio);
    }
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    // label.text(data.actual);
});
// $('button').on('click', function() {
//     // console.log('click')
//     socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
//         if (!data.err) {
//             label.text(data.mensaje.numero);

//         } else {
//             label.text(data.mensaje);

//         }
//     });
// });