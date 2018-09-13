const fs = require('fs');
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        console.log(`this.hoy ${this.hoy} === data.hoy ${data.hoy}`);
        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    reiniciarConteo() {
        console.log('se reinicializa el conteo');
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        // fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket: ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket: ${this.ultimo}`;
    }
    getUltimos4() {
        // console.log('ultimos4',this.ultimos4);
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return {
                err: true,
                mensaje: 'No hay tickets para atender'
            };
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.grabarArchivo();
        return {
            err: false,
            mensaje: atenderTicket
        };
    }

    grabarArchivo() {
        let jsonData = {
            hoy: this.hoy,
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}

module.exports = {
    TicketControl
}