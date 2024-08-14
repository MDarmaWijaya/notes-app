import { Context } from "@/pages/api/graphql";

export const resolvers = {
    Query: {
        notes: async (parent: any, args: any, context: Context) => {
            const notes = await context.prisma.notes.findMany();
            return notes.map(note => ({
                ...note,
                createdAt: note.createdAt.toISOString(), 
            }));
        },
        note: async (parent: any, args: any, context: Context) => {
            const note = await context.prisma.notes.findUnique({
                where: {
                    id: args.id
                }
            });
            return note ? {
                ...note,
                createdAt: note.createdAt.toISOString(), 
            } : null;
        }
    },
    Mutation: {
        addNote: async (parent: any, args: any, context: Context) => {
            return await context.prisma.notes.create({
                data: {
                    title: args.title,
                    body: args.body
                }
            });
        },
        updateNote: async (parent: any, args: any, context: Context) => {
            return await context.prisma.notes.update({
                where: {
                    id: args.id
                },
                data: {
                    title: args.title,
                    body: args.body,
                }
            });
        },
        deleteNote: async (parent: any, args: any, context: Context) => {
            return await context.prisma.notes.delete({
                where: {
                    id: args.id
                }
            });
        }
    }
};
