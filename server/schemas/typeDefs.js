const { gql } = require('apollo-server-express');

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
	}
`;

module.exports = typeDefs;
