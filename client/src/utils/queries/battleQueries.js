import { gql } from '@apollo/client';

export const QUERY_BATTLE = gql`
	query battle($battleId: ID!) {
		battle(battleId: $battleId) {
			name
			heroes {
				character_name
				player_name
				level
				race
				class
				armor_class
				hit_points
			}
			monsters
			userId {
				_id
				username
			}
		}
	}
`;
