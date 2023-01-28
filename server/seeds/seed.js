const db = require('../config/connection');
const axios = require('axios');
const { Monster } = require('../models/Monster');
const monsterData = require('./srd_monsters.json');

db.once('open', async () => {
	try {
		console.log('🌱 SEEDING DATABASE...');

		// Empty database of any monsters
		await Monster.deleteMany({});

		// Check if private repository exists, and use that data if so
		const { data } = await axios.get(
			`${process.env.PRIVATE_DATA_URL}/seed/monsters`
		);

		let monsters = [];

		data.forEach((source) => {
			source.monsters.forEach((monster) => {
				monster.source = source.source;
			});

			monsters.push(source.monsters);
		});

		await Monster.insertMany(monsters.flat());
		console.log('✅ PRIVATE REPOSITORY DATA SEEDED!');
	} catch (err) {
		// If error occurs, private data repository does not exist, so use default
		console.log(
			'📢 NO PRIVATE DATA REPOSITORY FOUND! FALLING BACK TO DEFAULTS'
		);

		monsterData.forEach((monster) => {
			monster.source = 'Systems Reference Document (SRD)';
		});
		// Insert monsters found in reference document
		await Monster.insertMany(monsterData);
		console.log('✅ DEFAULTS SEEDED!');
	}

	// Close connection after seeding
	process.exit(0);
});
