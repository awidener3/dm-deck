const mongoose = require('mongoose');
// Configure .env files
require('dotenv').config();

// Connection to DB - MONGODB_URI can be retrieved from Mongo Atlas
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dm-deck',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;
