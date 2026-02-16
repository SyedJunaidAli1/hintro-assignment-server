import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import "dotenv/config";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

import registerSockets from "./sockets/index.js";
registerSockets(io);

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
