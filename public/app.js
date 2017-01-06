const socket = io();

socket.on('connect', function () {
  console.log('client connected');
});

socket.on('server event', function (data) {
  console.log(data);
  socket.emit('client event', { socket: 'io' });
});


