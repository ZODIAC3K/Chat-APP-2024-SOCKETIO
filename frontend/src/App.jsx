import React from "react";
import io from "socket.io-client";

const App = () => {

    const socket = io("http://localhost:5000"); // create a socket connection to the server
    
	return (
		<>
			<div>Hello, World</div>
		</>
	);
};

export default App;
