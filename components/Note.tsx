import { BASE_URL } from '@/config';
import { DELETE_NOTE } from '@/graphql/mutation';
import { GET_NOTES } from '@/graphql/queries';
import { INotes } from '@/typings';
import { useMutation } from "@apollo/client";
import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';

type Props = {
    notes: INotes;
};

export const Note = ({ notes }: Props) => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        refetchQueries: [{ query: GET_NOTES }]
    });

    let formattedDate;
    try {
 
        const date = typeof notes.createdAt === 'string' ? new Date(notes.createdAt) : notes.createdAt;

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }

        formattedDate = format(date, 'PPpp'); 
    } catch (error) {
        console.error('Date parsing error:', error);
        formattedDate = 'Invalid date';
    }

    return (
        <article className="lg:w-[500px] flex flex-col p-4 mt-5 bg-slate-700  hover:scale-110 shadow-sm hover:shadow-md hover:bg-slate-900 transition duration-300 ease-out text-white">
            <h1 className="font-bold text-xl my-2">{notes.title}</h1>
            <p className="text-xs my-2 line-clamp-3">
                {notes.body}
            </p>
            <p className="text-xs my-2">
                {formattedDate}
            </p>
            <Link href={`${BASE_URL}/notes/${notes.id}`} 
                className="bg-yellow-500 mt-5 p-2 rounded-lg text-center">
                Detail
            </Link>
            <button
                onClick={() => deleteNote({ variables: { id: notes.id } })}
                className="bg-red-500 mt-5 p-2 rounded-lg"
            >
                Delete
            </button>
        </article>
    );
};
