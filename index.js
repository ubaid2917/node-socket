const app = require('express')();
const http = require('http').Server(app);
const path = require('path'); 
const io = require('socket.io')(http);

 app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
 })  

 io.on('connection', (socket) => {
    console.log('a user connected', socket.id);  
     
    // send message to client after 3 seconds
     setTimeout(() => {
          socket.emit('message', 'Hello from server after 3 seconds');
     }, 3000);
      

     // listen client side event
     socket.on('customMessageFromClient', (data) => {
            console.log( data);
     })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
 })

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
