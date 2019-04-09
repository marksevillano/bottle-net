var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)

var dataSent = 0;
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
      //ws.send('something');
      console.log("connection open");
     
      ws.on('open', function open() {
          ws.send('something');
      });

      ws.on('message', function message(m) {
        console.log(m);
        dataSent = m;
        //ws.send(m.data);
      });
        
      ws.on('close', function close() {
        console.log("closed");
      });
  
})

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ bottle: dataSent }));
})
