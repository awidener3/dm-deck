import { gql } from '@apollo/client';

export const QUERY_BATTLE = gql`
	query Battle($battleId: ID!) {
		battle(battleId: $battleId) {
			userId {
				username
			}
			name
			heroes {
				type
				character_name
				player_name
			}
			monsters {
				name
				size
				type
				subtype
				group
				alignment
				armor_class
				armor_desc
				hit_points
				hit_dice
				speed {
					walk
					swim
				}
				actions {
					name
					desc
					attack_bonus
					damage_dice
					damage_bonus
				}
			}
			monster_slugs
		}
	}
`;
