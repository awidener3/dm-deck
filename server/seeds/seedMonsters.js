const db = require('../config/connection');
const axios = require('axios');
const { Monster } = require('../models/Monster');
const monsterData = require('./srd_monsters.json');

db.once('open', async () => {
	try {
		// Empty database of any monsters
		await Monster.deleteMany({});

		// Check if private repository exists, and use that data if so
		const { data } = await axios.get(
			`${process.env.PRIVATE_DATA_URL}/seed/monsters`
		);

		let monsters = [];

		await data.forEach((source) => {
			source.monsters.forEach((monster) => {
				monster.source = source.source;
			});

			monsters.push(source.monsters);
		});

		await Monster.insertMany(monsters.flat());
	} catch (err) {
		console.log('NO PRIVATE REPOSITORY FOUND! FALLING BACK TO DEFAULT');
		// If error occurs, private repository does not exist, so use default

		// Insert monsters found in reference document
		await Monster.insertMany(monsterData);
	}

	console.log('✅ Monsters seeded!');
	// Close connection after seeding
	process.exit(0);
});
