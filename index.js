const app = require('express')();
const http = require('http').Server(app);
const path = require('path'); 
const io = require('socket.io')(http);

 app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
 })  

 io.on('connection', (socket) => {
    console.log('A user connected', socket.id); 

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    })
 })

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
