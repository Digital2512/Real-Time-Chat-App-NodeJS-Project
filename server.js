
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const getUsernameByID = (id) => users.find(user => user.id === id)?.username;

let users = [];
let messages = {};
let groups = {};
let groupMessages = {};
let publicMessages = [];

app.use(express.static('public'));

io.on('connection', (socket) => { 
    console.log('A user connected');

    socket.on('set username', (username) => {
        socket.username = username;
        users.push({id:socket.id, username:socket.username});
        io.emit('users list', users);
        console.log(`${username} joined the chat`);
    });

    // socket.on('public message', (message) => {
    //     const publicMessage = {username: socket.username, message: message};
    //     publicMessages.push(publicMessage);
    //     io.emit('public message', publicMessage);
    // });

    socket.on('create group', (groupName) => {
        if (!groups[groupName]){
            groups[groupName] = [];
            groupMessages[groupName] = [];
            // io.emit('group created', groupName);
            groups[groupName].push(socket.id);
            socket.emit('group created', groupName);
            socket.emit('groups list', Object.keys(groups));
        }else{
            socket.emit('alert error', `Group ${groupName} has been created. Please try another groups name`);
        }
    });

    socket.on('join group', (groupName) => {
        if(groups[groupName]){
            if(!groups[groupName].includes(socket.id)){
                groups[groupName].push(socket.id);
                console.log(`User ${socket.username} joined group: ${groupName}`);
            }
            socket.emit('joined group', groupName);
            socket.emit('groups list', Object.keys(groups));

            if(groupMessages[groupName] && groupMessages[groupName].length > 0){
                socket.emit('group message history', groupMessages[groupName])
            }
        }else{
            socket.emit('alert error', `Group ${groupName} not found. Please try another groups name`);
        }
    });

    // socket.on('group message', ({groupName, message}) => {
    //     console.log(`Group Name: ${groupName}, Message: ${message}`);
    //     if(groups[groupName]){
    //         const groupMessage = {username: socket.username, message: message};
    //         groupMessages[groupName].push(groupMessage);

    //         groups[groupName].forEach(memberID => {
    //             io.to(memberID).emit('group message', groupMessage);
    //         });
    //     }else{
    //         socket.on('alert error', `Group ${groupName} has been created. Please try another group's name`);
    //     }
    // });

    socket.on('chat message', ({ message, recipient, user}) => {
        console.log(`Recipient: ${recipient}`);
    
        if (!recipient) {
            socket.emit('alert error', 'Recipient is not defined.');
            return;
        }
    
        if (recipient === 'public') {
            const publicMessage = { username: socket.username, message: message };
            publicMessages.push(publicMessage);
            io.emit('public message print', publicMessage);
        } else if (recipient.startsWith('group-')) {
            const groupName = recipient.slice(6);  // Extract the group name
            console.log(`Group Name: ${groupName}, Message: ${message}`);
            if (groups[groupName]) {
                const groupMessage = { username: socket.username, message: message, groupName: groupName };
                groupMessages[groupName].push(groupMessage);
    
                groups[groupName].forEach(memberID => {
                    io.to(memberID).emit('group message print', groupMessage);
                });
            } else {
                socket.emit('alert error', `Group ${groupName} does not exist.`);
            }
        } else if(user === recipient){
            const recipientKey = [socket.id, recipient].sort().join('-');
            if (!messages[recipientKey]) {
                messages[recipientKey] = [];
            }
            messages[recipientKey].push({ username: socket.username, message: message });
            socket.emit('self private message print', { username: socket.username, message: message, user: user});
        }else{
            const recipientKey = [socket.id, recipient].sort().join('-');
            if (!messages[recipientKey]) {
                messages[recipientKey] = [];
            }
            messages[recipientKey].push({ username: socket.username, message: message });
            socket.emit('private message print', { username: socket.username, message: message, recipient: user});
            io.to(recipient).emit('private message print', { username: socket.username, message: message, recipient: recipient});
        }
    });
    
    socket.on('alert error', (alertMessage)=>{
        socket.emit('alert error', alertMessage);
    });

    socket.on('get group messages', (groupName) => {
        if(groupMessages[groupName]){
            socket.emit('group message history', groupMessages[groupName]);
        }else{
            socket.emit('group message history', []);
        }
    });

    socket.on('get private messages', (recipient) => {
        const recipientKey = [socket.id, recipient].sort().join('-');
        if(messages[recipientKey]){
            const history = messages[recipientKey].map (message => ({
                username: (message.username === socket.username) ? 'You' : message.username,
                message: message.message
            }));
            socket.emit('private message history', history);
        }else{
            socket.emit('private message history', []);
        }
    });

    socket.on('get public messages', () => {
        socket.emit('public message history', publicMessages);
    });

    // socket.on('private message', ({recipient, message, isSelf}) => {
    //     const recipientKey = [socket.id, recipient].sort().join('-');
    //     if(!messages[recipientKey]){
    //         messages[recipientKey] = [];
    //     }
    //     messages[recipientKey].push({username: socket.username, message: message});

    //     if(isSelf){
    //         socket.emit('private message', {username: 'You', message: message});
    //     }else{
    //         io.to(recipient).emit('private message', {username:socket.username, message: message, recipient: recipient});
    //     }
    // });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        users = users.filter(user => user.id !== socket.id);
        io.emit('users list', users);
    });
});

const port = process.env.PORT || 3000; 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
