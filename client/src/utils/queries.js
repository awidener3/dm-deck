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

export const QUERY_USER_CHARACTERS = gql`
	query UserCharacters {
		userCharacters {
			_id
			type
			character_name
			player_name
			level
			race
			class
			armor_class
			hit_points
		}
	}
`;

export const QUERY_ME = gql`
	# Update JWT in 'Headers'
	# Authorization - Bearer <token here>

	query Me {
		me {
			_id
			username
			email
		}
	}
`;
