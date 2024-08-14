"use client";
import { ADD_NOTE } from '@/graphql/mutation';
import { GET_NOTES } from '@/graphql/queries';
import { INotes } from '@/typings';
import { useQuery, useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { Note } from './Note';

export const Notes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, loading, error } = useQuery(GET_NOTES);
  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title, body },
    refetchQueries: [{ query: GET_NOTES }],
  });

  const notes: INotes[] = data?.notes || [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || body === "") return alert("Enter fields");

    addNote({ variables: { title, body } });
    setTitle("");
    setBody("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );
  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <div className="mt-5 p-5 lg:ml-[33%]">
      <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col my-5 lg:space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter your title note"
          className="bg-slate-700 border text-white p-2 rounded-lg"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Enter your note"
          className="bg-slate-700 border text-white p-2 rounded-lg mt-5 mb-5 lg:mb-0 lg:mt-0"
        />
        <button className="bg-yellow-500 p-2 rounded-lg">
          Add Note
        </button>
      </form>
      <div>
        {notes.length === 0 ? (
          <p className="text-slate-700 lg:ml-40">Tidak ada catatan</p>
        ) : (
          notes.map((note) => (
            <Note key={note.id} notes={note} />
          ))
        )}
      </div>
    </div>
  );
};
