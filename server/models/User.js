const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { characterSchema } = require('./Character');
const { monsterSchema } = require('./Monster');
const { battleSchema } = require('./Battle');
const { collectionSchema } = require('./Collection');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			minlength: 5,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			match: [
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must contain at least one letter and one number',
			],
		},
		// characters: [characterSchema],
		characters: [characterSchema],
		monsters: [monsterSchema],
		battles: [battleSchema],
		collections: [collectionSchema],
	},
	{
		// for use with virtuals
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
