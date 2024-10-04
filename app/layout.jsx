// app/layout.js

import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// Metadata including favicon
export const metadata = {
	title: "PromptCraft",
	description: "Discover and Share AI Prompts",
	icons: {
		icon: "/favicon.ico", // Path to your favicon located in the public folder
	},
};

// Root layout component
const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<head />
			<body>
				<Provider>
					{/* Main layout structure */}
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{/* Render child components */}
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
