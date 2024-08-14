"use client";

import { UPDATE_NOTE } from "@/graphql/mutation";
import { GET_NOTE } from "@/graphql/queries";
import { INotes } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const Index = () => {
	const router = useRouter();
	const { id } = router.query;

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const { data, loading, error } = useQuery(GET_NOTE, {
		variables: { id },
		skip: !id,
	});

	const [updateNote] = useMutation(UPDATE_NOTE, {
		variables: { id, title, body },
		refetchQueries: [{ query: GET_NOTE, variables: { id } }],
	});

	const notes: INotes = data?.note;

	const handleUpdateNote = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title === "" || body === "") return alert("Please enter fields");

		updateNote({
			variables: { id, title, body }
		});
		setTitle("");
		setBody("");
	};

	const handleBack = () => {
		router.back(); // Navigates to the previous page
	};

	if (loading)
		return (
			<p className="text-slate-700 flex items-center justify-center">
				Loading ....
			</p>
		);
	if (error)
		return (
			<p className="text-slate-700 flex items-center justify-center">
				Oops! Something went wrong ....
			</p>
		);

	return (
		<>
			<form onSubmit={handleUpdateNote} className="flex lg:flex-row flex-col my-5 lg:space-x-3 gap-2 lg:ml-[33%] mt-10">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					placeholder="Enter new title"
					className="bg-slate-700 border text-white p-2 rounded-lg"
				/>
				<input
					value={body}
					onChange={(e) => setBody(e.target.value)}
					type="text"
					placeholder="Enter new body"
					className="bg-slate-700 border text-white p-2 rounded-lg"
				/>
				<button className="bg-yellow-500 rounded-lg p-2">Update</button>
			</form>
			<article className="lg:w-[500px] lg:ml-[33%] flex flex-col p-4 mt-5 bg-slate-700 hover:scale-110 shadow-sm hover:shadow-md hover:bg-slate-900 transition duration-300 ease-out text-white">
				<h1 className="font-bold text-xl my-2">{notes.title}</h1>
				<p className="text-xs my-2 line-clamp-3">
					{notes.body}
				</p>
			<button
				onClick={handleBack}
				className="bg-yellow-500 p-2 rounded-lg mt-5 text-white"
			>
				Back
			</button>
			</article>
		</>
	);
};

export default Index;
