const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io');
io = io.listen(server);

//Globals
var num1;
var num2;

var names = [];

let conversion = 0.0174533;


app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', (client) => {
    console.log('Client connected: ');
    console.log(client.id)
    client.emit('acceptConnection', {message: 'Accepted'})
});

io.on('disconnect', (client) => {
    console.log('Client disconnected: ');
    console.log(client.id);
});

app.get('/api/getResponse', (req, res) => {
    result = num1 * num2;
    res.send({result: result});
});

app.post('/api/subtractNums', (req, res) => {
    console.log('Request to subtract numbers:')
    console.log(req.body);
    num1 = parseInt(req.body.num1);
    num2 = parseInt(req.body.num2);
    result = parseInt(req.body.num1) - parseInt(req.body.num2);
    res.send({result: result});
});

app.post('/api/sendName', (req, res) => {
    console.log('Request to add name: ');
    console.log(req.body);

    if(!req.body.includes(",")){
        res.send({error: 'String does not contain \',\''})
        return;
    }

    var strings = req.body.split(',');
    if(strings.length != 2){
        res.send({error: 'String split did not return 2 parts'})
        return;
    }
    var name = {
        firstname: strings[0],
        lastname: strings[1],
    }


    names.push(name);
    res.send({error: 'No error, added cleanly'});
    return;
});

app.get('/api/getNames', (req, res) => {
    console.log('Sending names...');
    res.send({names: names});
});

app.post('/api/getRadians', (req, res) => {
    console.log('Request to get degrees: ');
    console.log(req.body);    

    if(!req.body.degrees){
        res.send({error: '\'body.degrees\' was null'});
        return;
    }

    degrees = parseFloat(req.body.degrees);
    
    if(degrees == NaN){
        res.send({error: 'Conversion failed'});
        return;
    }

    var radians = degrees*conversion;

    res.send({radians: radians});

});

app.set('port', (process.env.PORT || 5000));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(app.get('port'), function() {
    console.log('App is listening on port: ' + app.get('port'));
});