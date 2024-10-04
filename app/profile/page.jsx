"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(`/api/users/${session?.user.id}/posts`);
				console.log(response, "Thsi is all posts of the user");
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();
				setMyPosts(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (postId) => {
		router.push(`/update-prompt?id=${postId}`);
	};

	const handleDelete = async (postId) => {
		const hasConfirmed = confirm("Are you sure you want to delete this post?");
		if (hasConfirmed) {
			try {
				await fetch(`/api/posts/${postId}`, {
					method: "DELETE",
				});
				setMyPosts(myPosts.filter((post) => post._id !== postId));
			} catch (error) {
				console.error("Failed to delete post:", error);
			}
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
