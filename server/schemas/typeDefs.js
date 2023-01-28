const { gql } = require('apollo-server-express');

const typeDefs = gql`
	#########
	# Types #
	#########

	type User {
		_id: ID
		username: String
		email: String
		password: String
		characters: [Character]
		monsters: [Monster]
		battles: [Battle]
		collections: [Collection]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Character {
		_id: ID
		type: String
		userId: User
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
		burrow: Int
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
		attack_bonus: Int
		damage_dice: String
		damage_bonus: Int
	}

	type Reactions {
		name: String
		desc: String
		attack_bonus: Int
	}

	type LegendaryActions {
		name: String
		desc: String
		attack_bonus: Int
	}

	type Monster {
		_id: ID
		name: String
		source: String
		size: String
		type: String
		subtype: String
		alignment: String
		armor_class: Int
		hit_points: Int
		hit_dice: String
		speed: String
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
		damage_vulnerabilities: String
		damage_resistances: String
		damage_immunities: String
		condition_immunities: String
		senses: String
		languages: String
		challenge_rating: String
		actions: [Actions]
		reactions: [Reactions]
		legendary_actions: [LegendaryActions]
		special_abilities: [SpecialAbilities]
	}

	type Battle {
		_id: ID
		userId: User # ref User id
		name: String
		heroes: [Character] # ref Character id
		npcs: [Monster] # ref Monster id
		monsters: [Monster] # ref Monster id
		message: String
	}

	type Collection {
		_id: ID
		name: String
		userId: User
		battles: [Battle]
		background_img: String
	}

	###########
	# Queries #
	###########

	type Query {
		users: [User]
		user(userId: ID!): User
		me: User
		battles: [Battle]
		battle(battleId: ID!): Battle
		collections: [Collection]
		collection(collectionId: ID!): Collection
		characters: [Character]
		character(characterId: ID!): Character
		monsters: [Monster]
		# Following queries use context id
		userBattles: [Battle]
		userCollections: [Collection]
		userCharacters: [Character]
	}

	##########
	# Inputs #
	##########

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
		damage_dice: String
		attack_bonus: Int
	}

	input ReactionsInput {
		name: String
		desc: String
		attack_bonus: Int
	}

	input LegendaryActionsInput {
		name: String
		desc: String
		attack_bonus: Int
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
		name: String
		source: String
		size: String
		type: String
		subtype: String
		alignment: String
		armor_class: Int
		hit_points: Int
		hit_dice: String
		speed: String
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
		damage_vulnerabilities: String
		damage_resistances: String
		damage_immunities: String
		condition_immunities: String
		senses: String
		languages: String
		challenge_rating: String
		actions: [ActionsInput]
		reactions: [ReactionsInput]
		legendary_actions: [LegendaryActionsInput]
		special_abilities: [SpecialAbilitiesInput]
	}

	#############
	# Mutations #
	#############

	type Mutation {
		# USER mutations
		addUser(username: String!, email: String!, password: String!): Auth
		removeUser(userId: ID!): User
		updateUser(email: String!, password: String!): User
		login(email: String!, password: String!): Auth

		# CHARACTER/HERO mutations
		addCharacter(
			userId: ID!
			character_name: String!
			player_name: String
			level: Int!
			race: String
			class: String
			armor_class: Int!
			hit_points: Int!
		): Character

		updateCharacter(
			characterId: ID!
			character_name: String
			player_name: String
			level: Int
			race: String
			class: String
			armor_class: Int
			hit_points: Int
		): Character

		deleteCharacter(characterId: ID!): Character

		# MONSTER mutations
		addMonster(
			_id: ID
			name: String
			source: String
			size: String
			type: String
			subtype: String
			alignment: String
			armor_class: Int
			hit_points: Int
			hit_dice: String
			speed: String
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
			damage_vulnerabilities: String
			damage_resistances: String
			damage_immunities: String
			condition_immunities: String
			senses: String
			languages: String
			challenge_rating: String
			actions: [ActionsInput]
			reactions: [ReactionsInput]
			legendary_actions: [LegendaryActionsInput]
			special_abilities: [SpecialAbilitiesInput]
		): Monster

		# BATTLE mutations
		addBattle(
			userId: ID!
			name: String!
			heroes: [ID]
			npcs: [ID]
			monsters: [ID]
		): Battle

		updateBattle(
			battleId: ID!
			name: String
			userId: ID!
			heroes: [ID]
			npcs: [ID]
			monsters: [ID]
		): Battle

		deleteBattle(battleId: ID!): Battle

		# ENCOUNTER mutations
		addCollection(
			name: String!
			background_img: String
			userId: ID!
			battles: [ID]
		): Collection

		addBattleToCollection(battleId: ID!, collectionId: ID!): Collection

		removeBattleFromCollection(battleId: ID!, collectionId: ID!): Collection

		updateCollection(
			collectionId: ID!
			name: String
			background_img: String
		): Collection

		deleteCollection(collectionId: ID!): Collection
	}
`;

module.exports = typeDefs;
