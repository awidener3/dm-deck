const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { Character } = require("../models/Character");
const { Monster } = require("../models/Monster");
const { Battle } = require("../models/Battle");
const { Collection } = require("../models/Collection");
const { signToken } = require("../utils/auth");

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
      throw new AuthenticationError("You need to be logged in!");
    },
    // Gets all battles
    battles: async (parent, args) => {
      return Battle.find({}).populate("userId");
    },
    // Gets a battle by ID
    battle: async (parent, { battleId }) => {
      return Battle.findById({ _id: battleId }).populate("userId");
    },
    collections: async (parent, args) => {
      return Collection.find({}).populate("battles").populate("userId");
    },
    // Gets a collection by ID
    collection: async (parent, { collectionId }) => {
      return Collection.findOne({ _id: collectionId })
        .populate("battles")
        .populate("userId");
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
    // TODO: redo
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
    // TODO: redo
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
    // Adds a battle
    addBattle: async (parent, { name, userId }, context) => {
      if (context.user) {
        return await Battle.create({ name, userId });
      }
      throw new AuthenticationError("Not logged in");
    },
    // Updates a battle
    updateBattle: async (parent, { battleId, name }, context) => {
      return await Battle.findByIdAndUpdate(
        battleId,
        { $set: { name } },
        { new: true }
      ).populate("userId");
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
      throw new AuthenticationError("Not logged in");
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
      throw new AuthenticationError("Not logged in");
    },
    // Updates a collection
    updateCollection: async (parent, args, context) => {
      if (context.user) {
        return await Collection.findByIdAndUpdate(
          args.collectionId,
          { $set: { name: args.name, background_img: args.background_img } },
          { new: true }
        );
      }
    },
    // Deletes a collection
    deleteCollection: async (parent, { collectionId }, context) => {
      if (context.user) {
        return await Collection.findByIdAndDelete(collectionId);
      }
      throw new AuthenticationError("Not logged in");
    },
    // TODO: redo
    // addBattleToCollection: async (
    //   parent,
    //   { battleId, collectionId },
    //   context
    // ) => {
    //   if (context.user) {
    //     try {
    //       const battle = await Battle.findById(battleId);
    //       const user = await User.findOneAndUpdate(
    //         {
    //           _id: context.user._id,
    //           "collections._id": collectionId,
    //         },
    //         {
    //           $addToSet: {
    //             "collections.$.battles": battle,
    //           },
    //         },
    //         {
    //           new: true,
    //           upsert: true,
    //         }
    //       );

    //       return user;
    //     } catch (e) {
    //       return e;
    //     }
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
  },
};

module.exports = resolvers;
