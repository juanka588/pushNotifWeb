var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
        id: 1,
        text: "Hola soy un mensaje",
        author: "Carlos Azaustre"
    }];

app.use(express.static('public'));

app.get('/hello', function (req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function (client) {
    console.log('Alguien se ha conectado con Sockets');
    client.emit('messages', messages);
//    client.send(client.id);
    console.log("server sent id: " + client.id);
    client.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(9090, function () {
    console.log("Servidor corriendo en http://localhost:9090");
});