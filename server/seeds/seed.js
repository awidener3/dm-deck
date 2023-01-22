const db = require('../config/connection');
const { Monster } = require('../models/Monster');
const monsterData = require('./srd_monsters.json');

db.once('open', async () => {
	// Empty database of any monsters
	// todo: update this so that it does not empty user defined monsters (anything with a UserId)
	await Monster.deleteMany({});

	// Insert monsters found in reference document
	await Monster.insertMany(monsterData);

	console.log('Monsters seeded!');
	process.exit[0];
});
