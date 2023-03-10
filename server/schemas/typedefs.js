const { gql } = require('apollo-server-express');

const typeDefs = gql`
# define types === refer to the models
# one type == one model
    type Book {
        _id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        savedBooks: [Book]
    }

    type Auth {
        user: User
        token: String
    }

# initialize queries
    type Query {
        # pass in an 'id' for this query to get back the user
        # user can bring back ==> _id, username, email, savedBooks
        me(id: String, username: String): User
    }

    type Mutation {
        # from user controllers
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: String!, bookData: BookInput!): User
        removeBook(userId: String!, bookId: String!): User
    }
`;

module.exports = typeDefs;
