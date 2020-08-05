const http = require('http');
const app = require('./app');
const io = require('socket.io')(http);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
io.listen(server);
server.listen(port);

/*
Socket IO
*/
var connectedClients = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('pingServer', (msg) => {
        console.log('pingServer');
    });

    
    connectedClients['fffff'] = socket;
    console.log(connectedClients[socket.nickname]);

    socket.on('chatMessage', (to, message) => {
        connectedClients['fffff'].emit('chatMessage', socket.nickname, message);
    });
});