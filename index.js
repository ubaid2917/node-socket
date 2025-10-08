const app = require('express')();
const http = require('http').Server(app);
const path = require('path'); 
const io = require('socket.io')(http);

 app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
 })    


 let users = 0; 

 io.on('connection', (socket) => {
    console.log('a user connected', socket.id);  
      
    users++;
    socket.emit('newUserConnected', {message:  'Hi Welcome to the chat'});

    socket.broadcast.emit('newUserConnected', { message: `${users}  user connected`})
     
    socket.on('disconnect', () => {

      users--;
      socket.broadcast.emit('newUserConnected', { message: `${users}  user connected`})
        console.log('user disconnected', socket.id);
    })
 })

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
