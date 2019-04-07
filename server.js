var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
      //ws.send('something');
      console.log("connection open");
      setInterval(function() {
              sendRnd10();      
      }, 5000);
      ws.on('open', function open() {
          ws.send('something');
      });

      ws.on('message', function message(m) {
        console.log(m.data);
        client.send(m.data);
      });
        
      ws.on('close', function close() {
        console.log("closed");
      });
  
})
