var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio: ' + escritorio);

// socket.on('connect', function() {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', function() {
//     console.log('perdimos conexion con el servidor');
// });
// socket.on('estadoActual', function(data) {
//     label.text(data.actual);
// });

$('button').on('click', function() {
    // console.log('click')
    socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
        if (!data.err) {
            label.text(data.mensaje.numero);

        } else {
            label.text(data.mensaje);

        }
    });
});