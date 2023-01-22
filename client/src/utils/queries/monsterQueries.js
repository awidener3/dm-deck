import { gql } from '@apollo/client';

// Gets all monsters with basic data
export const GET_MONSTERS_BASIC = gql`
	query Monsters {
		monsters {
			_id
			name
			challenge_rating
			size
			type
			subtype
		}
	}
`;

export const GET_MONSTERS_DETAILED = gql`
	query Monsters {
		monsters {
			_id
			name
			size
			type
			subtype
			alignment
			armor_class
			hit_points
			hit_dice
			speed
			strength
			dexterity
			constitution
			intelligence
			wisdom
			charisma
			strength_save
			dexterity_save
			constitution_save
			intelligence_save
			wisdom_save
			charisma_save
			acrobatics
			animal_handling
			arcana
			athletics
			deception
			history
			insight
			intimidation
			investigation
			medicine
			nature
			perception
			performance
			persuasion
			religion
			sleight_of_hand
			stealth
			survival
			damage_vulnerabilities
			damage_resistances
			damage_immunities
			condition_immunities
			senses
			languages
			challenge_rating
			actions {
				name
				desc
				attack_bonus
				damage_dice
				damage_bonus
			}
			reactions {
				name
				desc
				attack_bonus
			}
			legendary_actions {
				name
				desc
				attack_bonus
			}
			special_abilities {
				name
				desc
				attack_bonus
				damage_dice
				damage_bonus
			}
		}
	}
`;
