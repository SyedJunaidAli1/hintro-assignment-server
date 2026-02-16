import jwt from "jsonwebtoken";

export default function registerSockets(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.userId = decoded.userId;

      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // join board room
    socket.on("joinBoard", (boardId) => {
      if (!boardId) return;

      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    socket.emit("connected", {
      message: "Socket connected successfully",
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
