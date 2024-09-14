import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';

const server = http.createServer(function(request:any,response:any){
    console.log((new Date()) + "Recieved Request for "+ request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({server});

let userCount=0;

wss.on('connection',function connection(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data,binary){
        console.log("message recieved");
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary});
            }
        });
    });
    console.log("Users connected ",++userCount);
    ws.send("Hello from the server");
});

server.listen(8080,()=>{
    console.log((new Date()) + ' Server is listening on port 8080');
});