const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Character } = require('../models/Character');
const { Monster } = require('../models/Monster');
const { Battle } = require('../models/Battle');
const { Collection } = require('../models/Collection');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		// Gets all users
		users: async () => {
			return User.find({});
		},
		// Gets a user by ID
		user: async (parent, { userId }) => {
			const user = User.findById({ _id: userId });
			return user;
		},
		// Gets logged in user
		me: async (parent, args, context) => {
			if (context.user) return User.findOne({ _id: context.user._id });
			throw new AuthenticationError('You need to be logged in!');
		},
		// Gets all battles
		battles: async (parent, args) => {
			return Battle.find({}).populate('userId');
		},
		// Gets a battle by ID + populates with open5e API calls
		battle: async (parent, { battleId }) => {
			const battle = await Battle.findById({ _id: battleId })
				.populate('userId')
				.populate('heroes')
				.populate('monsters');

			// Adds numbers after duplicate monsters (i.e. Goblin, Goblin 2, Goblin 3)
			if (battle.monsters.length > 1) {
				for (let i = 0; i < battle.monsters.length; i++) {
					let num = 1;
					let current = battle.monsters[i];

					for (let j = i + 1; j < battle.monsters.length; j++) {
						if (battle.monsters[j].name === current.name) {
							battle.monsters[j].name = `${
								battle.monsters[j].name
							} ${num + 1}`;
							num++;
						}
					}
					num = 1;
				}
			}
			return battle;
		},
		collections: async (parent, args) => {
			return Collection.find({}).populate('battles').populate('userId');
		},
		// Gets a collection by ID
		collection: async (parent, { collectionId }) => {
			const collection = await Collection.findOne({ _id: collectionId })
				.populate('userId')
				.populate({
					path: 'battles',
					populate: {
						path: 'heroes',
					},
				})
				.populate({
					path: 'battles',
					populate: {
						path: 'monsters',
					},
				});

			return collection;
		},
		// Gets all characters
		characters: async (parent, args) => {
			return Character.find().populate('userId');
		},
		monsters: async (parent, args) => {
			return Monster.find();
		},
		// Gets all battles by context user
		userBattles: async (parent, args, context) => {
			const battles = await Battle.find({ userId: context.user._id })
				.populate('userId')
				.populate('heroes')
				.populate('monsters');

			return battles;
		},
		// Gets all collections by context user
		userCollections: async (parent, args, context) => {
			return Collection.find({ userId: context.user._id }).populate(
				'battles'
			);
		},
		// Gets all collections by context user
		userCharacters: async (parent, args, context) => {
			return Character.find({ userId: context.user._id });
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
		// Adds a character
		addCharacter: async (parent, args, context) => {
			if (context.user) {
				const character = await Character.create(args);

				return character;
			}

			throw new AuthenticationError('Not logged in');
		},
		// Updates a character
		updateCharacter: async (parent, args, context) => {
			if (context.user) {
				const character = await Character.findByIdAndUpdate(
					args.characterId,
					{
						$set: {
							character_name: args.character_name,
							player_name: args.player_name,
							level: args.level,
							race: args.race,
							class: args.class,
							armor_class: args.armor_class,
							hit_points: args.hit_points,
						},
					},
					{ new: true }
				);

				return character;
			}
			throw new AuthenticationError('Not logged in');
		},
		// Delete a character
		deleteCharacter: async (parent, args, context) => {
			if (context.user) {
				return await Character.findByIdAndDelete(args.characterId);
			}
			throw new AuthenticationError('Not logged in');
		},
		// TODO: redo
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
		// Adds a battle
		addBattle: async (parent, args, context) => {
			if (context.user) {
				return await Battle.create(args);
			}
			throw new AuthenticationError('Not logged in');
		},
		// Updates a battle
		updateBattle: async (parent, args, context) => {
			return await Battle.findByIdAndUpdate(
				args.battleId,
				{
					$set: {
						name: args.name,
						heroes: args.heroes,
						monsters: args.monsters,
					},
				},
				{ new: true }
			).populate('userId');
		},
		// Deletes a battle
		deleteBattle: async (parent, { battleId }, context) => {
			if (context.user) {
				return await Battle.findByIdAndDelete(battleId);
			}
		},
		// Adds a collection
		addCollection: async (parent, args, context) => {
			if (context.user) {
				return await Collection.create(args);
			}
			throw new AuthenticationError('Not logged in');
		},
		// Adds a battle to a collection
		addBattleToCollection: async (parent, args, context) => {
			if (context.user) {
				return await Collection.findByIdAndUpdate(
					args.collectionId,
					{ $push: { battles: args.battleId } },
					{ new: true }
				);
			}
			throw new AuthenticationError('Not logged in');
		},
		// Removes a battle from collection
		removeBattleFromCollection: async (parent, args, context) => {
			if (context.user) {
				const collection = await Collection.findByIdAndUpdate(
					args.collectionId,
					{ $pull: { battles: args.battleId } },
					{ new: true }
				);
				return collection;
			}
		},
		// Updates a collection
		updateCollection: async (parent, args, context) => {
			if (context.user) {
				return await Collection.findByIdAndUpdate(
					args.collectionId,
					{
						$set: {
							name: args.name,
							background_img: args.background_img,
						},
					},
					{ new: true }
				);
			}
		},
		// Deletes a collection
		deleteCollection: async (parent, { collectionId }, context) => {
			if (context.user) {
				return await Collection.findByIdAndDelete(collectionId);
			}
			throw new AuthenticationError('Not logged in');
		},
	},
};

module.exports = resolvers;
