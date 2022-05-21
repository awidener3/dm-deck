const { AuthenticationError } = require('apollo-server-express');
const { User, Character, Monster } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		// Get all users
		users: async () => {
			return User.find({});
		},

		// Get single user
		user: async (parent, { userId }) => {
			const user = User.findOne({ _id: userId });
			return user;
		},

		// Get logged in user
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},

	Mutation: {
		// Add new user
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		// update user
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}

			throw new AuthenticationError('Not logged in');
		},
		// Remove user
		removeUser: async (parent, { userId }) => {
			return User.findOneAndDelete({ _id: userId });
		},
		// Login
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user with this email found!');
			}

			// method on user model to compare passwords
			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect password!');
			}

			// sends token to be signed by jsonwebtoken package
			const token = signToken(user);
			return { token, user };
		},
		addCharacter: async (parent, args, context) => {
			if (context.user) {
				const character = await Character.create(args);
				await User.findByIdAndUpdate(context.user._id, {
					$push: { characters: character },
				});

				return character;
			}

			throw new AuthenticationError('Not logged in');
		},
		addMonster: async (parent, args, context) => {
			if (context.user) {
				const monster = await Monster.create(args);
				await User.findByIdAndUpdate(context.user._id, {
					$push: { monsters: monster },
				});

				return monster;
			}

			throw new AuthenticationError('Not logged in');
		},
	},
};

module.exports = resolvers;
