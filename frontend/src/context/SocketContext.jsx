import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create a context to hold the socket connection and online users
const SocketContext = createContext();

// Custom hook to access the SocketContext
export const useSocketContext = () => {
    return useContext(SocketContext);
};

// Component responsible for managing the WebSocket connection
export const SocketContextProvider = ({ children }) => {
    // State to hold the socket connection
    const [socket, setSocket] = useState(null);

    // State to hold the list of online users
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Get the authenticated user from the AuthContext
    const { authUser } = useAuthContext();

    useEffect(() => {
        // Only establish the WebSocket connection if there's an authenticated user
        if (authUser) {
            // Connect to the WebSocket server
            const newSocket = io("http://localhost:8000", {
                query: {
                    userId: authUser._id,
                },
            });

            // Set the socket connection in the state using a callback function
            setSocket((prevSocket) => {
                if (prevSocket) {
                    prevSocket.close(); // Close the previous socket if it exists
                }
                return newSocket;
            });

            // Listen for "getOnlineUsers" event to update the list of online users
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup function to close the socket connection when the component unmounts
            return () => {
                newSocket.close();
            };
        } else {
            // If there's no authenticated user, close the socket connection if it exists
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Re-run effect when the authenticated user changes

    // Provide the socket connection and online users to the child components via context
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
