import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
});

export { wss }
