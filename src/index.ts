import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';
import {uuid} from 'uuidv4';
import { GameManager } from './gameManager/gameManager';

const server = http.createServer(function(request:any,response:any){
    console.log((new Date()) + "Recieved Request for "+ request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({server});

let users=[];
let gameManager:GameManager | null = null;

wss.on('connection',function connection(socket){
    if(users.length==2){
        socket.send("Sorry, the game is full");
        socket.close();
        return;
    }
    socket.on('error',console.error);

    socket.on('message', function message(data, binary) {
        try {
            const jsonString = data.toString();
            const jsonData = JSON.parse(jsonString);
            gameManager?.move(jsonData.userID, jsonData.move);
            gameManager?.getDetails();
        } catch (error) {
            console.error("Error parsing JSON: ", error);
        }
    });
    

    users.push(uuid());
    
    console.log("Users connected ",users.length);

    if(users.length==2){
        let i=0;
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send("Game is ready to start"+users[i]);
                i++;
            }
        });

        gameManager = new GameManager(users[0], users[1]);
        gameManager.getDetails();
    }

    socket.send("Hello from the server");
});

server.listen(8080,()=>{
    console.log((new Date()) + ' Server is listening on port 8080');
});