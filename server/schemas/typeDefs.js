const { gql } = require('apollo-server-express');

const typeDefs = gql`
	# Types
	type User {
		_id: ID
		username: String
		email: String
		password: String
		characters: [Character]
		monsters: [Monster]
		battles: [Battle]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Character {
		_id: ID
		type: String
		character_name: String
		player_name: String
		level: Int
		race: String
		class: String
		armor_class: Int
		hit_points: Int
	}

	type Speed {
		walk: Int
		swim: Int
		climb: Int
		fly: Int
	}

	type Skills {
		acrobatics: Int
		animal_handling: Int
		arcana: Int
		athletics: Int
		deception: Int
		history: Int
		insight: Int
		intimidation: Int
		investigation: Int
		medicine: Int
		nature: Int
		perception: Int
		performance: Int
		persuasion: Int
		religion: Int
		sleight_of_hand: Int
		stealth: Int
		survival: Int
	}

	type Actions {
		name: String
		desc: String
		attack_bonus: Int
		damage_dice: String
		damage_bonus: Int
	}

	type SpecialAbilities {
		name: String
		desc: String
	}

	type Monster {
		_id: ID
		slug: String
		name: String
		size: String
		type: String
		subtype: String
		group: String
		alignment: String
		armor_class: Int
		armor_desc: String
		hit_points: Int
		hit_dice: String
		speed: Speed
		strength: Int
		dexterity: Int
		constitution: Int
		intelligence: Int
		wisdom: Int
		charisma: Int
		strength_save: Int
		dexterity_save: Int
		constitution_save: Int
		intelligence_save: Int
		wisdom_save: Int
		charisma_save: Int
		perception: Int
		skills: Skills
		damage_vulnerabilities: String
		damage_resistances: String
		damage_immunities: String
		condition_immunities: String
		senses: String
		languages: String
		challenge_rating: String
		actions: [Actions]
		reactions: String
		legendary_desc: String
		legendary_actions: String
		special_abilities: [SpecialAbilities]
		spell_list: [String]
		img_main: String
		document__slug: String
		document__title: String
		document__license_url: String
	}

	type Battle {
		_id: ID
		name: String
		heroes: [Character]
		monsters: [Monster]
	}

	# Queries
	type Query {
		users: [User]
		user(username: String!): User
		me: User
		battle(battleId: ID): Battle
	}

	# Inputs
	input SpeedInput {
		walk: Int
		swim: Int
		climb: Int
		fly: Int
	}

	input SkillsInput {
		acrobatics: Int
		animal_handling: Int
		arcana: Int
		athletics: Int
		deception: Int
		history: Int
		insight: Int
		intimidation: Int
		investigation: Int
		medicine: Int
		nature: Int
		perception: Int
		performance: Int
		persuasion: Int
		religion: Int
		sleight_of_hand: Int
		stealth: Int
		survival: Int
	}

	input ActionsInput {
		name: String
		desc: String
		attack_bonus: Int
		damage_dice: String
		damage_bonus: Int
	}

	input SpecialAbilitiesInput {
		name: String
		desc: String
	}

	input HeroesInput {
		_id: ID
		type: String
		character_name: String!
		player_name: String
		level: Int
		race: String
		class: String
		armor_class: Int
		hit_points: Int
	}

	input MonstersInput {
		_id: ID
		slug: String
		name: String
		size: String
		type: String
		subtype: String
		group: String
		alignment: String
		armor_class: Int
		armor_desc: String
		hit_points: Int
		hit_dice: String
		speed: SpeedInput
		strength: Int
		dexterity: Int
		constitution: Int
		intelligence: Int
		wisdom: Int
		charisma: Int
		strength_save: Int
		dexterity_save: Int
		constitution_save: Int
		intelligence_save: Int
		wisdom_save: Int
		charisma_save: Int
		perception: Int
		skills: SkillsInput
		damage_vulnerabilities: String
		damage_resistances: String
		damage_immunities: String
		condition_immunities: String
		senses: String
		languages: String
		challenge_rating: String
		actions: [ActionsInput]
		reactions: String
		legendary_desc: String
		legendary_actions: String
		special_abilities: [SpecialAbilitiesInput]
		spell_list: [String]
		img_main: String
		document__slug: String
		document__title: String
		document__license_url: String
	}

	# Mutations
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth

		removeUser(userId: ID!): User

		updateUser(email: String!, password: String!): User

		login(email: String!, password: String!): Auth

		addCharacter(
			character_name: String!
			player_name: String
			level: Int
			race: String
			class: String
			armor_class: Int
			hit_points: Int
		): Character

		addMonster(
			_id: ID
			slug: String
			name: String
			size: String
			type: String
			subtype: String
			group: String
			alignment: String
			armor_class: Int
			armor_desc: String
			hit_points: Int
			hit_dice: String
			speed: SpeedInput
			strength: Int
			dexterity: Int
			constitution: Int
			intelligence: Int
			wisdom: Int
			charisma: Int
			strength_save: Int
			dexterity_save: Int
			constitution_save: Int
			intelligence_save: Int
			wisdom_save: Int
			charisma_save: Int
			perception: Int
			skills: SkillsInput
			damage_vulnerabilities: String
			damage_resistances: String
			damage_immunities: String
			condition_immunities: String
			senses: String
			languages: String
			challenge_rating: String
			actions: [ActionsInput]
			reactions: String
			legendary_desc: String
			legendary_actions: String
			special_abilities: [SpecialAbilitiesInput]
			spell_list: [String]
			img_main: String
			document__slug: String
			document__title: String
			document__license_url: String
		): Monster

		addBattle(
			_id: ID
			name: String
			heroes: [HeroesInput]
			monsters: [MonstersInput]
		): Battle
	}
`;

module.exports = typeDefs;
