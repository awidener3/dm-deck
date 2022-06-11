const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
	{
		type: {
			type: String,
			default: 'hero',
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		character_name: {
			type: String,
			required: true,
		},
		player_name: String,
		level: {
			type: Number,
			min: 1,
			max: 20,
		},
		race: String,
		class: String,
		armor_class: Number,
		hit_points: Number,
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Character = model('Character', characterSchema);

module.exports = { Character, characterSchema };
