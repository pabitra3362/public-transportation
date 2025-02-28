import React, { createContext, useEffect } from "react";
import { io } from 'socket.io-client';
import config from '../config/config';


export const SocketContext = createContext();

const socket = io(`${config.baseUrl}`);

const SocketProvider = ({ children }) =>{
    useEffect(()=>{
        socket.on('connect', () => {
            console.log('Connected to server'); // Log connection message
        });

        socket.on('disconnect', ()=>{
            console.log('Disconnected from server');         
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error); // Log error on connection failure
        });

        
    }, []);


    const sendMessage = (eventName, message)=>{
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventName, callback) =>{
        socket.on(eventName, callback);
    }

    return(
        <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    )
}


export default SocketProvider;