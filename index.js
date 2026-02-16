import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import "dotenv/config";
import connectDB from "./utils/db.js";
import registerSockets from "./sockets/index.js";

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_CLIENT,
    credentials: true,
  },
});
app.set("io", io);

registerSockets(io);

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
