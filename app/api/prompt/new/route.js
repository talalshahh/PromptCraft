import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectToDB();
		// Create a new prompt instance
		const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
		// Return the created prompt as a response
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};
