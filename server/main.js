'use strict';
/* eslint-disable global-require */


// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.

var startDb = require('./db');

// Create a node server instance! cOoL!

var server = require('http').createServer();


var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log('Server started on port', PORT);
    });

};
let redPieces = [], bluePieces = [];
let redName = '', blueName = '';
var startIo = function () {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        //let clientStore = null, setRed = null, setBlue = null;

        console.log('hello: ', socket.id);
        socket.emit('server event', { foo: 'bar' });
        if (redPieces.length || bluePieces.length) {
            socket.emit('startPos', redPieces, bluePieces);
        }
        socket.on('client event', function (data) {
            console.log(data);
        });
        // socket.on('clientBoardChange', function (board) {
        //     socket.broadcast.emit('serverBoardChange', board);
        //     console.log('changed board!');
        // });
        socket.on('clientMove', function (s1x, s1y, s2x, s2y, callback) {
            callback('in clientMove');
            socket.broadcast.emit('serverMove', s1y, s1x, s2y, s2x);
            console.log('moving!', socket.id);
        });
        socket.on('redComplete', function (red, name) {
            redPieces = red;
            redName = name;
            socket.broadcast.emit('serverRed', red, name);
            console.log('red!', socket.id);
        });
        socket.on('blueComplete', function (blue, name) {
            bluePieces = blue;
            blueName = name;
            socket.broadcast.emit('serverBlue', blue, name);
            console.log('blue!', socket.id);
        });
        socket.on('needRed', function () {
            socket.emit('serverRed', redPieces, redName);
        });
        socket.on('needBlue', function () {
            socket.emit('serverBlue', bluePieces, blueName);
        });
    });
}




createApplication();
startServer();
startIo();





// startDb
// .then(createApplication)
// .then(startServer)
// .then(startIo)
// .catch(function (err) {
//     console.error(err.stack);
//     process.exit(1);
// });
