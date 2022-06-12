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

export const UPDATE_USER = gql`
	mutation UpdateUser($email: String!, $password: String!) {
		updateUser(email: $email, password: $password) {
			_id
			username
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

export const ADD_CHARACTER = gql`
	mutation addCharacter(
		$character_name: String!
		$player_name: String!
		$level: Int!
		$race: String!
		$class: String!
		$armor_class: Int!
		$hit_points: Int!
	) {
		addCharacter(
			character_name: $character_name
			player_name: $player_name
			level: $level
			race: $race
			class: $class
			armor_class: $armor_class
			hit_points: $hit_points
		) {
			_id
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

export const ADD_BATTLE = gql`
	mutation AddBattle(
		$name: String!
		$userId: ID!
		$heroes: [ID]
		$monsters: [String]
	) {
		addBattle(
			name: $name
			userId: $userId
			heroes: $heroes
			monsters: $monsters
		) {
			_id
			name
			userId {
				_id
			}
			heroes {
				_id
			}
			monsters
		}
	}
`;

export const DELETE_BATTLE = gql`
	mutation DeleteBattle($battleId: ID!) {
		deleteBattle(battleId: $battleId) {
			_id
			name
		}
	}
`;

export const ADD_COLLECTION = gql`
	mutation addCollection($name: String, $backgroundImg: String) {
		addCollection(name: $name, background_img: $backgroundImg) {
			_id
			name
			background_img
		}
	}
`;

export const ADD_BATTLE_TO_COLLECTION = gql`
	mutation AddBattleToCollection($battleId: ID!, $collectionId: ID!) {
		addBattleToCollection(
			battleId: $battleId
			collectionId: $collectionId
		) {
			_id
			name
			battles {
				_id
			}
		}
	}
`;
