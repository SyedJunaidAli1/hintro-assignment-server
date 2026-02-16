import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTkyZTM4YzI5YTNjMWNlNTRkZTg1M2IiLCJpYXQiOjE3NzEyNDI3NDIsImV4cCI6MTc3MjUzODc0Mn0.640m9lC5nHjueHCFtis8UYRFRb7zd37UBkajF48bJkw",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  // join board room
  socket.emit("joinBoard", "6992e4c429a3c1ce54de853e");
});

socket.on("connected", (data) => {
  console.log("Server says:", data);
});

socket.on("taskMoved", (task) => {
  console.log("🔥 Task moved:", task.title);
});

socket.on("taskCreated", (task) => {
  console.log("🟢 Task created:", task.title);
});
