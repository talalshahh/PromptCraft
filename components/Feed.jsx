"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const handleTagClick = (tag) => {
		handleSearchChange(tag);
	};

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
			setFilteredPosts(data); // Initialize filteredPosts with all posts
		};
		fetchPost();
	}, []);

	const handleSearchChange = (value) => {
		setSearchText(value);
		const searchValue = value.toLowerCase();
		const searched = posts.filter((post) => {
			return (
				post.prompt.toLowerCase().includes(searchValue) ||
				post.tag.toLowerCase().includes(searchValue) ||
				post.creator.username.toLowerCase().includes(searchValue)
			);
		});
		setFilteredPosts(searched); // Update filteredPosts instead of posts
	};

	return (
		<section className="">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={(e) => handleSearchChange(e.target.value)}
					className="search_input peer"
				/>
			</form>
			<PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
		</section>
	);
};

export default Feed;
