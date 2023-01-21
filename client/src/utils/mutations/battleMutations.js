import { gql } from '@apollo/client';

export const ADD_BATTLE = gql`
	mutation AddBattle(
		$name: String!
		$userId: ID!
		$heroes: [ID]
		$monster_slugs: [String]
	) {
		addBattle(
			name: $name
			userId: $userId
			heroes: $heroes
			monster_slugs: $monster_slugs
		) {
			_id
			name
			userId {
				_id
			}
			heroes {
				_id
			}
			monster_slugs
		}
	}
`;

export const UPDATE_BATTLE = gql`
	mutation updateBattle(
		$battleId: ID!
		$name: String!
		$userId: ID!
		$heroes: [ID]
		$monster_slugs: [String]
	) {
		updateBattle(
			battleId: $battleId
			name: $name
			userId: $userId
			heroes: $heroes
			monster_slugs: $monster_slugs
		) {
			_id
			name
			userId {
				_id
			}
			heroes {
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

export const DELETE_COLLECTION = gql`
	mutation DeleteCollection($collectionId: ID!) {
		deleteCollection(collectionId: $collectionId) {
			name
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
