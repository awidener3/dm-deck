import { gql } from '@apollo/client';

export const GET_BATTLE_BUILDER_DATA = gql`
	query BattleBuilderData {
		monsters {
			_id
			name
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
