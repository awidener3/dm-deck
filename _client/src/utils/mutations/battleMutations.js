import { gql } from '@apollo/client';

/**
 * Mutations for "Battles" and "Collections"
 *
 * Contains CRUD operations:
 * ADD_BATTLE, UPDATE_BATTLE, DELETE_BATTLE, ADD_COLLECTION, DELETE_COLLECTION, ADD_BATTLE_TO_COLLECTION, REMOVE_BATTLE_FROM_COLLECTION
 */

/**
 * BATTLES
 */
export const ADD_BATTLE = gql`
	mutation AddBattle(
		$name: String!
		$userId: ID!
		$heroes: [ID]
		$npcs: [ID]
		$monsters: [ID]
	) {
		addBattle(
			name: $name
			userId: $userId
			heroes: $heroes
			npcs: $npcs
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
			npcs {
				_id
			}
			monsters {
				_id
			}
		}
	}
`;

export const UPDATE_BATTLE = gql`
	mutation updateBattle(
		$battleId: ID!
		$name: String!
		$userId: ID!
		$heroes: [ID]
		$npcs: [ID]
		$monsters: [ID]
	) {
		updateBattle(
			battleId: $battleId
			name: $name
			userId: $userId
			heroes: $heroes
			npcs: $npcs
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
			monsters {
				_id
			}
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

/**
 * COLLECTIONS
 */

export const ADD_COLLECTION = gql`
	mutation AddCollection(
		$name: String!
		$userId: ID!
		$backgroundImg: String
	) {
		addCollection(
			name: $name
			userId: $userId
			background_img: $backgroundImg
		) {
			name
			background_img
		}
	}
`;

export const DELETE_COLLECTION = gql`
	mutation DeleteCollection($collectionId: ID!) {
		deleteCollection(collectionId: $collectionId) {
			name
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

export const REMOVE_BATTLE_FROM_COLLECTION = gql`
	mutation RemoveBattleFromCollection($battleId: ID!, $collectionId: ID!) {
		removeBattleFromCollection(
			battleId: $battleId
			collectionId: $collectionId
		) {
			name
		}
	}
`;
