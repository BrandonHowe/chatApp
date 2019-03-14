var app = require('express')();
var cookie = require('cookie');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(function(req, res, next) {
    res.header('user', 'monkeyman82')
    next();
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket){
    console.log("we're connected 😘🤣😊");
    io.emit('chat message', 'A user has connected!')
    
    var cookief = socket.handshake.headers.cookief;

    var cookies = cookie.parse(socket.handshake.headers.cookie);

    console.log(cookies.user);

    socket.on('chat message', function(msg,id){
        console.log(id);
        console.log('message: ' + msg);
        io.emit('chat message', { msg : msg , user :  cookies.user });
    });

    socket.on('disconnect', function(){
        console.log("we're disconnected 😢😣😒")
    })
})

http.listen(300,function(){
    console.log('listening on *:300');
});