import { gql } from '@apollo/client';

/**
 * General queries for "Battles" and "Collections"
 *
 * Contains:
 * QUERY_BATTLE, QUERY_COLLECTION,
 */

export const QUERY_BATTLE = gql`
	query Battle($battleId: ID!) {
		battle(battleId: $battleId) {
			name
			heroes {
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
			npcs {
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
			monsters {
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
	}
`;

export const QUERY_COLLECTION = gql`
	query Collection($collectionId: ID!) {
		collection(collectionId: $collectionId) {
			_id
			name
			background_img
			battles {
				_id
				name
				heroes {
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
				npcs {
					name
					size
					type
					subtype
					challenge_rating
				}
				monsters {
					name
					size
					type
					subtype
					challenge_rating
				}
			}
		}
	}
`;
