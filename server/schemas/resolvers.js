const { Thought } = require('../models');

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
        addThought: async (parent, { thoughtText, thoughtAuthor }) => {
            return Thought.create({ thoughtText, thoughtAuthor });
        },
        addComment: async (parent, { thoughtId, commentText }) => {
            return Thought.findOneAndUpdate(
                { _id: thoughtId },
                {
                    $addToSet: { comments: { commentText } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeThought: async (parent, { thoughtId }) => {
            return Thought.findOneAndDelete({ _id: thoughtId });
        },
        removeComment: async (parent, { thoughtId, commentId }) => {
            return Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
