import express from "express"; // import express
import { createServer } from "http"; // import http
import { Server } from "socket.io"; // import socket.io
// we will manage routes from express and socket connection using socket.io but since socket io needs a http server we pass the express app to the http server and then pass the http server to the socket io server

const Port = 5001; // define a port number

const app = express(); // create an express app
const server = createServer(app); // create a http server using the express app
const io = new Server(server, {
	cors: {
		origin: "*",
	}, // this will allow all origins to connect to the socket io server
}); // create a socket io server using the http server which was created using the express app

app.get("/", (req, res) => {
	res.send("Server is running.");
});

io.on("connection", (socket) => {
	// listen for connection event on the socket io server which is triggered when a client connects to the socket io server. we can even define a custom event name instead of connection but it spicifically have to trigger this from the client side using the same event name.

	console.log("User Connected and Socket ID: ", socket.id);

	socket.on("msg", (msg) => {
		// gettting the message from the client side
		console.log("User ID: ", socket.id);
		console.log("Message: ", msg);
		// sending the message to all the clients except the one who sent the message
		socket.broadcast.emit("msg-2", msg);
	});

	// listen for the 'disconnect' event which is triggered when the client disconnects from the socket io server
	socket.on("disconnect", () => {
		console.log("User Disconnected and Socket ID: ", socket.id);
	});
});

server.listen(Port, () => {
	console.log("Server is running on port:", Port);
});
