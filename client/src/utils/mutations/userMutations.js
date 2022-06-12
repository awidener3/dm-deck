import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($email: String!, $password: String!) {
		updateUser(email: $email, password: $password) {
			_id
			username
		}
	}
`;

export const REMOVE_USER = gql`
	mutation removeUser($userId: ID!) {
		removeUser(userId: $userId) {
			_id
			username
			email
			password
		}
	}
`;
