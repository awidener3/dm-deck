import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query users {
		users {
			_id
			username
			email
			password
		}
	}
`;

export const QUERY_USER = gql`
	query User($username: String!) {
		user(username: $username) {
			_id
			username
			email
			password
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			username
			email
		}
	}
`;
