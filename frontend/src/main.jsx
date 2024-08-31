import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Cssbaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Cssbaseline />
		<App />
	</StrictMode>
);
