const { Schema, model } = require('mongoose');

/**
 * Schema for a battle, a collection of monsters and heroes
 */
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
		// Reference to an array of monsters
		monsters: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Monster',
			},
		],
		message: String,
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Battle = model('Battle', battleSchema);

module.exports = { Battle, battleSchema };
