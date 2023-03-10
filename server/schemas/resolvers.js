const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
        me: async (parent, { id, username }) => {
            // find a user that matches the id
            const foundUser = await User.findOne({
                $or: [
                    { _id: id },
                    { username }
                ],
            });

            if (!foundUser) {
                // Throw an error if user is not found
            }

            return foundUser;
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' })
            }
            const token = signToken(user)

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new AuthenticationError("Incorrect Credentials")
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect Credentials")
            }
            const token = signToken(user);
            return { token, user };
        }
    },
};

module.exports = resolvers;
