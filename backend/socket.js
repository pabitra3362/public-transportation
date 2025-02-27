import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (update this for security)
            methods: ["GET", "POST"]
        }
    });

    

    io.on("connection", (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        socket.on("message", (message) => {
            console.log(`📩 Received message: ${message}`);
            socket.send(`✅ Server received: ${message}`);
        });

        socket.on("disconnect", () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, message) {
    if (io) {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
            socket.send(message);
        } else {
            console.error(`⚠️ Socket with ID ${socketId} not found.`);
        }
    } else {
        console.error("❌ Socket.io server is not initialized.");
    }
}
