const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { Character } = require("../models/Character");
const { Monster } = require("../models/Monster");
const { Battle } = require("../models/Battle");
const { Collection } = require("../models/Collection");
const { signToken } = require("../utils/auth");

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
      throw new AuthenticationError("You need to be logged in!");
    },

    // Get battle by its ID
    battle: async (parent, args) => {
      const battle = Battle.findOne({ _id: args.battleId });
      return battle;
    },

    collection: async (parent, args) => {
      const collection = Collection.findOne({ _id: args.collectionId });
      return collection;
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

      throw new AuthenticationError("Not logged in");
    },
    // Remove user
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    // Login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      // method on user model to compare passwords
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
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

      throw new AuthenticationError("Not logged in");
    },

    addMonster: async (parent, args, context) => {
      if (context.user) {
        const monster = await Monster.create(args);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { monsters: monster },
        });

        return monster;
      }

      throw new AuthenticationError("Not logged in");
    },

    addBattle: async (parent, args, context) => {
      if (context.user) {
        const battle = await Battle.create(args);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { battles: battle },
        });

        return battle;
      }

      throw new AuthenticationError("Not logged in");
    },
    // Remove user
    deleteBattle: async (parent, { battleId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: battleId },
          { $pull: { battles: battleId } },
          { new: true }
        );
      }
    },

    addCollection: async (parent, args, context) => {
      if (context.user) {
        const collection = await Collection.create(args);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { collections: collection },
        });

        return collection;
      }

      throw new AuthenticationError("Not logged in");
    },

    addBattleToCollection: async (
      parent,
      { battleId, collectionId },
      context
    ) => {
      if (context.user) {
        try {
          const battle = await Battle.findById(battleId);
          const user = await User.findOneAndUpdate(
            { _id: context.user._id, "collections._id": collectionId },
            {
              $addToSet: {
                "collections.$.battles": battle,
              },
            },
            {
              new: true,
              upsert: true,
            }
          );

          return user;
        } catch (e) {
          return e;
        }
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
