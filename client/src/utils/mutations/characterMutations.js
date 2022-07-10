import { gql } from '@apollo/client';

export const ADD_CHARACTER = gql`
	mutation addCharacter(
		$userId: ID!
		$character_name: String!
		$player_name: String!
		$level: Int!
		$race: String!
		$class: String!
		$armor_class: Int!
		$hit_points: Int!
	) {
		addCharacter(
			userId: $userId
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
		}
	}
`;

export const DELETE_CHARACTER = gql`
	mutation deleteCharacter($characterId: ID!) {
		deleteCharacter(characterId: $characterId) {
			character_name
		}
	}
`;
