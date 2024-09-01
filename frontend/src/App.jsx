import React, { useEffect, useState } from "react";
import io from "socket.io-client";


const socket = io("http://localhost:5001"); // create a socket connection to the server

const App = () => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit("msg", message);
	};

	useEffect(() => {
		// listen for the 'connect' event which is triggered when the client connects to the server using the socket connection
		socket.on("connect", () => {
			console.log("User Connected: ", socket.id);

			// we send a 'welcome' event to the server.
			socket.emit("welcome", "Hello Server!");

			// once the client sends the 'welcome' event to the server, the server will respond with a 'msg' event (as defined in the backend) and the client will listen for this event

			socket.on("msg", (msg) => {
				console.log(
					"User ID: ",
					socket.id,
					"---",
					"Message-Server: ",
					msg
				);
			});
		});

		// Trigger the 'disconnect' event when the component unmounts on restart of the frontend
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
				<h1>
					Welcome to Socket.io
				</h1>
				<form
					className="flex flex-col m-2"
					onSubmit={handleSubmit}
				>
					<TextField
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						label="Enter Message"
						variant="outlined"
						id="outlined-basic"
						color="primary"
					></TextField>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Send
					</Button>
				</form>
		</>
	);
};

export default App;
