const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => { 
    console.log('A user connected');

    socket.on('set username', (username) => {
        socket.username = username;
        console.log(`${username} joined the chat`);
    });

    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.port || 3000; 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
