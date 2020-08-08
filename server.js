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
var allSockets = {}; //We keep this to store all the socket IDs. UserID is the Key. SocketID is the value.

function getSocket(userID){ //We use user ID as the unique socket ID
    return allSockets['chatter-'+userID];
}

function setSocket(userID, data){
    allSockets['chatter-'+userID] = data;
}

function deleteSocket(userID){
    delete allSockets['chatter-'+userID];
}

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('userOnline', (userID) => {
        console.log('userOnline-'+userID);
        setSocket(userID, socket);
    });

    socket.on('userTyping', (toUserID) => {
        if(getSocket(toUserID)){
            getSocket(toUserID).emit('userTyping'); 
        }
    });

    socket.on('userChat', (toUserID) => {
        if(getSocket(toUserID)){
            getSocket(toUserID).emit('userChat'); 
        }
    });

});