import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query users {
		users {
			_id
			username
			email
			password
		}
	}
`;

export const QUERY_USER = gql`
	query User($username: String!) {
		user(username: $username) {
			_id
			username
			email
			password
		}
	}
`;

export const QUERY_ME = gql`
	# Update JWT in 'Headers'
	# Authorization - Bearer <token here>

	query Me {
		me {
			_id
			username
			email
			characters {
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
				_id
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
				}
				spell_list
				img_main
				document__slug
				document__title
				document__license_url
			}
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
					_id
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
					}
					spell_list
					img_main
					document__slug
					document__title
					document__license_url
				}
			}
		}
	}
`;
