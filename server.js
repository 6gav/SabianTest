const path = require('path');
const express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io');
io = io.listen(server);

app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (client) => {
    console.log('Client connected: ');
    console.log(client.id)
    client.emit('acceptConnection', {message: 'Accepted'})
});

io.on('disconnect', (client) => {
    console.log('Client disconnected: ');
    console.log(client.id);
});


app.set('port', (process.env.PORT || 5000));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(app.get('port'), function() {
    console.log('App is listening on port: ' + app.get('port'));
});