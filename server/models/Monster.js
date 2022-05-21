const { Schema, model } = require('mongoose');

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
		// TODO: This isn't right...I think...
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
		skills: Object,
		damage_vulnerabilities: String,
		damage_resistances: String,
		damage_immunities: String,
		condition_immunities: String,
		senses: String,
		languages: String,
		challenge_rating: String,
		// TODO: This probably isn't right
		actions: Array,
		reactions: String,
		legendary_desc: String,
		legendary_actions: String,
		special_abilities: String,
		// TODO: No way it's this easy...
		spell_list: Array,
		img_main: String,
		document__slug: String,
		document__title: String,
		docuemnt__license_url: String,
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Monster = model('Monster', monsterSchema);

module.exports = { Monster, monsterSchema };
