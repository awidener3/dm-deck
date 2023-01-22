import { gql } from '@apollo/client';

// * Update JWT in Apollo Global Headers
// * 'Authorization' 'Bearer <token>'

/**
 * Queries for "User"
 *
 * Contains:
 * QUERY_ME, QUERY_USER_CHARACTERS, QUERY_USER_BATTLES, QUERY_USER_COLLECTIONS
 */

// Gets logged in user
export const QUERY_ME = gql`
	query Me {
		me {
			_id
			username
			email
		}
	}
`;

// * not in use
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

// * not in use
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

// Gets all characters associated with a user
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

// Gets all battles associated with a user
export const QUERY_USER_BATTLES = gql`
	query UserBattles {
		userBattles {
			_id
			name
			heroes {
				character_name
				player_name
				class
				level
			}
			monsters {
				name
				challenge_rating
			}
		}
	}
`;

// Gets all collections associated with a user
export const QUERY_USER_COLLECTIONS = gql`
	query UserCollections {
		userCollections {
			_id
			name
			background_img
			battles {
				_id
				name
			}
		}
	}
`;
