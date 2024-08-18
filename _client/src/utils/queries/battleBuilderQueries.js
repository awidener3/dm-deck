import { gql } from '@apollo/client';

/**
 * Queries for Battle Builder-specific data
 *
 * Contains:
 * GET_BATTLE_BUILDER_DATA
 */
export const GET_BATTLE_BUILDER_DATA = gql`
	query BattleBuilderData {
		monsters {
			_id
			name
			source
			challenge_rating
			size
			type
			subtype
		}
		userCharacters {
			_id
			character_name
			player_name
			race
			class
			level
		}
	}
`;
