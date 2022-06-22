const { Schema, model } = require('mongoose');
const { characterSchema } = require('./Character');
const { monsterSchema } = require('./Monster');

const battleSchema = new Schema(
	{
		name: String,
		// Reference to a user
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		// Reference to an array of characters
		heroes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Character',
			},
		],
		message: String,
		monster_slugs: [String],
		monsters: [monsterSchema],
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Battle = model('Battle', battleSchema);

module.exports = { Battle, battleSchema };
