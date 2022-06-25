import { gql } from '@apollo/client';

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
				monsters {
					name
					size
					type
					subtype
					group
					challenge_rating
				}
			}
		}
	}
`;

export const QUERY_BATTLE = gql`
	query Battle($battleId: ID!) {
		battle(battleId: $battleId) {
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
			monsters {
				slug
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
					climb
					fly
					burrow
				}
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
				perception
				skills {
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
				}
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
				reactions
				legendary_desc
				legendary_actions
				special_abilities {
					name
					desc
					damage_dice
					attack_bonus
				}
				spell_list
				img_main
				document__slug
				document__title
				document__license_url
			}
		}
	}
`;
