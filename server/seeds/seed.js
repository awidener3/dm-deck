const db = require('../config/connection');
const { Monster } = require('../models/Monster');
const monsterData = require('./srd_monsters.json');

db.once('open', async () => {
	await Monster.deleteMany({});

	const monsters = await Monster.insertMany(monsterData);

	console.log('Monsters seeded!');
	process.exit[0];
});
