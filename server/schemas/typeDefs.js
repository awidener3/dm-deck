const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Types
  type User {
    _id: ID
    username: String
    email: String
    password: String
    characters: [Character]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Character {
    _id: ID
    type: String
    character_name: String
    player_name: String
    level: Int
    race: String
    class: String
    armor_class: Int
    hit_points: Int
  }

  # Queries
  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  # Mutations
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    removeUser(userId: ID!): User

    updateUser(email: String!, password: String!): User

    login(email: String!, password: String!): Auth

    addCharacter(
      character_name: String!
      player_name: String
      level: Int
      race: String
      class: String
      armor_class: Int
      hit_points: Int
    ): Character
  }
`;

module.exports = typeDefs;
