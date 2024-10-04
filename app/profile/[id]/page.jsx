"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../page";

const UserPosts = ({ params }) => {
	const [UserPosts, setUserPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(`/api/users/${params.id}/posts`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error("failed to fetch the data");
				}
				setUserPosts(data);
			} catch (error) {
				console.log(error.message);
			}
		};
		if (params?.id) fetchPosts();
	}, [params?.id]);

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
			data={userPosts}
		/>
	);
};

export default UserPosts;
