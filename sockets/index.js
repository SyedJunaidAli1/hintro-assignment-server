import jwt from "jsonwebtoken";

export default function registerSockets(io) {
  io.use((socket, next) => {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) return next(new Error("Unauthorized"));

    const token = cookie.split("token=")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    socket.on("joinBoard", (boardId) => {
      socket.join(boardId);
    });

    socket.on("taskMoved", ({ boardId, task }) => {
      socket.to(boardId).emit("taskMoved", task);
    });
  });
}
