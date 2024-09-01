import io from "socket.io-client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import React, { useEffect, useState } from "react";

const socket = io("http://localhost:5001"); // create a socket connection to the server

const App = () => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!message) {
			alert("Please enter a message");
		} else {
			socket.emit("msg", message);
		}
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
		<Card className="w-96 mx-auto mt-10 p-4">
			<CardHeader>
				<CardTitle>Welcome to Socket.io</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col space-y-4"
					onSubmit={handleSubmit}
				>
					<Input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Enter Message"
						className="border border-gray-300 p-2 rounded"
					/>
					<Button
						variant="outline"
						size="lg"
						className="bg-black text-white"
						type="submit"
					>
						Send
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default App;
