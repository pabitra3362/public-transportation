import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
    io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);


        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit("message", message);
    } else {
        console.error("Socket not initialized. Please call initializeSocket first.");
    }
}
