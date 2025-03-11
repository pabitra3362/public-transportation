import { Server } from "socket.io";
import User from "./models/user.model.js";
import Captain from "./models/captain.model.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
          status: active
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await Captain.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });


    socket.on("disconnect", async (data) => {
      console.log(`Client disconnected: ${socket.id}`);
      if(data){
        const { userType, userId } = data;
        if(userType === 'captain'){
          await Captain.findByIdAndUpdate( userId, {
            status: inactive
          })
        }
      }else{
        return;
      }
    });
  });
}

export function sendMessageToSocketId(socketId, messageObject) {

  console.log(`sending message to ${socketId}`, messageObject)
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error(
      "Socket not initialized. Please call initializeSocket first."
    );
  }
}
