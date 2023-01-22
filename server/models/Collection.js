const { Schema, model } = require('mongoose');

/**
 * Schema for a collection of battles, and the user they are associated with
 */
const collectionSchema = new Schema(
	{
		name: String,
		background_img: String,
		// Reference to a user
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		// Reference to an array of battle IDs
		battles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Battle',
			},
		],
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const Collection = model('Collection', collectionSchema);

module.exports = { Collection, collectionSchema };
