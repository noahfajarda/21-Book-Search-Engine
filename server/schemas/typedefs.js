const { gql } = require('apollo-server-express');

// const bookSchema = new Schema({
//     authors: [
//       {
//         type: String,
//       },
//     ],
//     description: {
//       type: String,
//       required: true,
//     },
//     // saved book id from GoogleBooks
//     bookId: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//     },
//     link: {
//       type: String,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//   });

const typeDefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        thoughtAuthor: String
        createdAt: String
        comments: [Comment]!
    }

    type Comment {
        _id: ID
        commentText: String
        createdAt: String
    }

    type Query {
        thoughts: [Thought]!
        thought(thoughtId: ID!): Thought
    }

    type Mutation {
        addThought(thoughtText: String!, thoughtAuthor: String!): Thought
        addComment(thoughtId: ID!, commentText: String!): Thought
        removeThought(thoughtId: ID!): Thought
        removeComment(thoughtId: ID!, commentId: ID!): Thought
    }
`;

module.exports = typeDefs;
