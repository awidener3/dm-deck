const { Schema, model } = require('mongoose');

const actionSchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	attack_bonus: Number,
	damage_dice: String,
	damage_bonus: Number,
});

const monsterSchema = new Schema(
	{
		slug: String,
		name: String,
		size: String,
		type: String,
		subtype: String,
		group: String,
		alignment: String,
		armor_class: Number,
		armor_desc: String,
		hit_points: Number,
		hit_dice: String,
		speed: {
			walk: Number,
			swim: Number,
			climb: Number,
			fly: Number,
		},
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
		perception: Number,
		// TODO: This also isn't right, I don't think
		skills: {
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
		},
		damage_vulnerabilities: String,
		damage_resistances: String,
		damage_immunities: String,
		condition_immunities: String,
		senses: String,
		languages: String,
		challenge_rating: String,
		// TODO: This probably isn't right
		actions: [actionSchema],
		reactions: String,
		legendary_desc: String,
		legendary_actions: String,
		special_abilities: String,
		// TODO: No way it's this easy...
		spell_list: Array,
		img_main: String,
		document__slug: String,
		document__title: String,
		document__license_url: String,
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Monster = model('Monster', monsterSchema);

module.exports = { Monster, monsterSchema };
