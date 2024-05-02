import {Server} from 'socket.io' ;
import http from 'http' 
import express from 'express' ;

const app = express() ;

const server = http.createServer(app) ;
const io = new Server(server , {
	cors :{
		origin :["http://localhost:5173"],
		mthods : ["GET" , "POST"]
	}
}) ;

export const getReceiverSocketId = (receiverId) =>{
	return userSocketMap[receiverId] ;	
}

const userSocketMap = {}; // {userId:socketId}
io.on("connection", (socket)=>{
	console.log("a user Connected", socket.id);

	const userId = socket.handshake.query.userId
	if(userId!="undefined") userSocketMap[userId] = socket.id ;

	// io.emmit() is used to send events to all the connected Clients
	io.emmit("getOnlineUsers" , Object.keys(userSocketMap)) ;

// socket.on() is used to listened the events , can be used on both Client Side and Server Side
	socket.on("disconnect" , () =>{
		console.log("user disconnected", socket.id) ;
		// Once User Disconnected then the id of the user will get deleted 
		delete userSocketMap[userId];
		io.emmit("getOnlineUsers" , Object.keys(userSocketMap)) ;

	})
})

export {app , io , server} ;