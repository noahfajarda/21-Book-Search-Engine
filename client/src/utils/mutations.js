import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                username
                email
            }
            token
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            user {
                _id
                username
                email
                savedBooks {
                    authors
                    description
                    bookId
                }
            }
            token
        }
    }
`;