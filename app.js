const express = require('express');
const socket = require('socket.io');

// app setup
const app = express();

// static files
app.use(express.static('public'));

// server
var port = process.env.port || 3000;
var server = app.listen(port, function (err) {
    if (err) throw err;
    console.log('running on port ' + port);
});

// socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection ' + socket.id);
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});
