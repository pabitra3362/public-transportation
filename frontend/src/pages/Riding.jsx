import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

const Riding = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("message", (data) => {
            console.log("Received:", data);
            setMessages((prev) => [...prev, data]);
        });

        return ()=>socket.disconnect()

        
    }, []);

    const sendMessage = () => {
        socket.emit("message", "Hello from React!");
    };

    return (
        <div>
            <h1>Socket.IO Client</h1>
            <button onClick={sendMessage}>Send Message</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default Riding;
