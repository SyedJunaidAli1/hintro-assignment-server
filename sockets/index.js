import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function registerSockets(io) {
  // 🔥 AUTH MIDDLEWARE FIRST
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      const token = cookies.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.userId = decoded.userId;

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  // 🔥 THEN CONNECTION
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("joinBoard", (boardId) => {
      socket.join(boardId);
      console.log(`Joined board ${boardId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
