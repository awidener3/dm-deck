const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Types
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Queries
  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  # Mutations
  type Mutation {
    addUser(
      first_name: String!
      last_name: String!
      username: String!
      email: String!
      password: String!
    ): Auth

    removeUser(userId: ID!): User

    updateUser(
      email: String!
      password: String!
      weight: Int
      height: Int
      age: Int
      gender: String
      exercise_goal: Int
      mindful_goal: Int
      water_goal: Int
      calorie_goal: Int
    ): User

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
