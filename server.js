let WebSocketServer = require("ws").Server;
let wss = new WebSocketServer ({ port: 8080 });


wss.on('connection', function connection(ws) {
    
    //ws.send('something');
    
    ws.on('open', function open() {
        ws.send('something');
    });
      
    ws.onmessage = (m) => {
        console.log(m.data);
    };
    ws.onclose = () => {
        console.log("closed");
    };

    
    //ws.close(); // <- this closes the connection from the server
});