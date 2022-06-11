const { Schema, model } = require('mongoose');

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
