// server.js
const WebSocket = require('ws');
const express = require('express');
const SocketServer = WebSocket.Server;


// uuid
const uuid = require('uuid');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

//Color Set
const userSockets = [];
const colors = ["red", "blue", "green", "purple"];
wss.on('connection', (ws) => {
    //Regular expression
    const regex = /(https?:\/\/.*\.(?:png|jpg|gif))/gi
    //Count how many users are connected
    const userCount = wss.clients.size;
    // Broadcast to all.
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
        });
    };
  console.log('Client connected');

  //Recieve message from the client 
    ws.on("message", data => {
        const info = JSON.parse(data);
        const dataType = info.type;

        switch(dataType){
            case "postMessage":
            const allMessageContent = info.content;
            const imageUrl = allMessageContent.match(regex);
            const messageContent = allMessageContent.replace(imageUrl, '');
            
            const messageSendBack = {
                type: "incomingMessage",
                id : uuid(),
                username: info.username,
                content: messageContent,
                color: info.color,
                image : imageUrl
            }
            
            wss.broadcast(JSON.stringify(messageSendBack));
            break;

            case "postNotification": 
            const notificationSendBack = {
                type: "incomingNotification",
                id : uuid(),
                content: info.content,
            }
            // Broadcast to all connected users and send back Message with id
            wss.broadcast(JSON.stringify(notificationSendBack));
            break;

            case "UserCount":
            const count = {
                type: "incomingUserCount",
                content: userCount,
            }
            wss.broadcast(JSON.stringify(count));
            break;

            case "Color":
                if(!userSockets.length){
                    info.color = colors[Math.floor(Math.random()*colors.length)];
                }
                else {
                    for(let i =0;i < userSockets.length; i++){
                        //if user does not exist in array userSockets
                        if(userSockets[i].id !== ws._socket._handle.fd){
                            info.color = colors[Math.floor(Math.random()*colors.length)];
                           break;
                        }
                        else {
                            info.color = userSockets[i].color;
                        }
                    }
                }
                //Colorchange sent back to client
                const colorChange = {
                    type:"colorChange",
                    username: info.username,
                    color: info.color
                }
                ws.send(JSON.stringify(colorChange));
                //Color and id history
                const clientID = ws._socket._handle.fd;
                const userColor = {
                    id: clientID,
                    color: info.color
                }
                userSockets.push(userColor);
                break;
           
            default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + dataType);
        }
    });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});