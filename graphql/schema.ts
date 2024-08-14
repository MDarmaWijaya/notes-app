export const typeDefs = `#graphql
    type Notes {
        id: ID!
        title: String
        body: String
        createdAt: String
    }

    type Query {
        note(id: ID!): Notes
        notes: [Notes]
    }

    type Mutation {
        addNote(title: String, body: String): Notes
        updateNote(id: String, title: String, body: String): Notes
        deleteNote(id: ID!): Notes
    }
`;
