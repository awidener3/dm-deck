const { Schema, model } = require('mongoose');

const actionSchema = new Schema({
	name: String,
	desc: String,
	attack_bonus: Number,
	damage_dice: String,
	damage_bonus: Number,
});

const specialAbilitiesSchema = new Schema({
	name: String,
	desc: String,
	attack_bonus: Number,
	damage_dice: String,
	damage_bonus: Number,
});

const reactionSchema = new Schema({
	name: String,
	desc: String,
	attack_bonus: Number,
});

const legendaryActionSchema = new Schema({
	name: String,
	desc: String,
	attack_bonus: Number,
});

const monsterSchema = new Schema(
	{
		name: String,
		size: String,
		type: String,
		subtype: String,
		alignment: String,
		armor_class: Number,
		hit_points: Number,
		hit_dice: String,
		speed: String,
		strength: Number,
		dexterity: Number,
		constitution: Number,
		intelligence: Number,
		wisdom: Number,
		charisma: Number,
		strength_save: Number,
		dexterity_save: Number,
		constitution_save: Number,
		intelligence_save: Number,
		wisdom_save: Number,
		charisma_save: Number,
		acrobatics: Number,
		animal_handling: Number,
		arcana: Number,
		athletics: Number,
		deception: Number,
		history: Number,
		insight: Number,
		intimidation: Number,
		investigation: Number,
		medicine: Number,
		nature: Number,
		perception: Number,
		performance: Number,
		persuasion: Number,
		religion: Number,
		sleight_of_hand: Number,
		stealth: Number,
		survival: Number,
		damage_vulnerabilities: String,
		damage_resistances: String,
		damage_immunities: String,
		condition_immunities: String,
		senses: String,
		languages: String,
		challenge_rating: String,
		actions: [actionSchema],
		reactions: [reactionSchema],
		legendary_actions: [legendaryActionSchema],
		special_abilities: [specialAbilitiesSchema],
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Monster = model('Monster', monsterSchema);

module.exports = { Monster, monsterSchema };
