var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rps = require('./rps.js');

var clients = [];
var game = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log(socket.id);
  if (clients.length < 2){
    clients.push(socket);
    io.emit('alert', 'Players: ' + clients.length);

    if(clients.length == 2){
      io.emit('rps', {'gameReady' : true});
    }

  }
  else{
    io.to(socket.id).emit('alert', 'Game is full');
    socket.disconnect();
  }

  socket.on('disconnect', function(){
    clients.splice(clients.indexOf(socket), 1);
    console.log(clients.length + ' clients');
  });
});

io.on('connection', function(socket){
  socket.on('game', function(data){
    console.log(data.weapon);

    if (game.length == 1 && game[0].socketId == socket.id){
      game[0].weapon = data.weapon;
    }
    else{
      game.push({'weapon' : data.weapon, 'socketId' : socket.id, 'name' : data.name});
    }

    if (game.length == 2){
      var result = rps.rps(game[0].weapon, game[1].weapon, game[0].name, game[1].name);
      var msg = "";
      if(result){
        msg = result.winner + " wins!";
      }
      else{
        msg = "It's a draw!";
      }
      io.emit('rps', {'gameEnd' : true, "msg": msg, 'result' : result});
      game = [];
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
