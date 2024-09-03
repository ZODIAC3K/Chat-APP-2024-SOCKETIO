import io from "socket.io-client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./components/ui/accordion";

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

	return (
		<>
			<div className="h-screen flex flex-col justify-center items-center text-white">
				<Card className="w-[80vw] h-full flex flex-col items-center justify-center mx-auto mt-10 p-4">
					<CardHeader className="w-full">
						<CardTitle>Welcome to Socket.io</CardTitle>
					</CardHeader>
					<CardContent className="w-full">
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
								size="lg"
								type="submit"
							>
								Send
							</Button>
						</form>
					</CardContent>
				</Card>
				<Accordion
					type="single"
					collapsible
					className="w-96 mx-auto mt-10 mb-10 bg-white text-gray-600 p-4 rounded-xl"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>
							Yes. It comes with default styles that matches the
							other components&apos; aesthetic.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							Yes. It's animated by default, but you can disable
							it if you prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};

export default App;
