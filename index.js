var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    app.use(express.static(__dirname + '/frontend/docs'));
    res.sendFile(__dirname + '/frontend/docs/index.html');
});

app.get('/interface', function (req, res) {
    // res.send
    app.use(express.static(__dirname + '/interface/'));
    // app.use(express.static(__dirname + '/interface/'));
    res.sendFile(__dirname + '/interface/index.html');
});

io.on('connection', function (socket) {
    socket.on('send_message', function (msg) {
        io.emit('get_message', msg.message);
        console.log("MESSAGE FROM SERVER : " + msg);
    });

    socket.on('button', function (msg) {
        console.log(msg);
        if (msg == "mac") {
            io.emit('move', msg);
        }
    });

    socket.on("hello", function (msg) {
        console.log(msg);
    })
});

// io.emit('some event', { for: 'everyone' });


http.listen(3000, function () {
    console.log('listening on *:3000');
});
