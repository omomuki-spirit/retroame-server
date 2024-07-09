import { Server } from 'ws';


const server = new Server({ port: 3001 });

server.on("connection", (client) => {
  console.log("Client has connected");

  client.on('message', (message) => {
    console.log(message);
  });
});
