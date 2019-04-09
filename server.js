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
//var client = null;
wss.on("connection", function(ws) {
   // client = ws;
      //ws.send('something');
      console.log("connection open");
     
      ws.on('open', function open() {
          ws.send('something');
      });

      ws.on('message', function message(m) {
        console.log(m);
        dataSent = m;
       // ws.send("recieved", m);
      });
      ws.on('close', function close() {
        console.log("closed");
      });
      
})

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ bottle: dataSent }));
})


app.post('/confirm', function (req, res) {
  wss.clients.forEach(function(client) {
    //if(client.readyState === WebSocket.OPEN) {
      client.send("CONFIRM");
    //}
  });

  //client.send("CONFIRM");
  res.end(JSON.stringify({ confirm: "success" }));
});

app.post('/dispense', function (req, res) {
  wss.clients.forEach(function(client) {
    //if(client.readyState === WebSocket.OPEN) {
      client.send("DISPENSE");
    //}
  });
  res.end(JSON.stringify({ confirm: "success" }));
});

