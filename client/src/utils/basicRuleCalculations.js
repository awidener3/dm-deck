/**
 * Returns an XP value based on a monsters 'challenge_rating'
 * @function getXp
 * @param {Object} monster Monster object
 * @returns {Number} An xp amount
 */
export const getXp = (monster) => {
	let xp;
	switch (monster.challenge_rating) {
		case '0':
			xp = 10;
			break;
		case '1/8':
			xp = 25;
			break;
		case '1/4':
			xp = 50;
			break;
		case '1/2':
			xp = 100;
			break;
		case '1':
			xp = 200;
			break;
		case '2':
			xp = 450;
			break;
		case '3':
			xp = 700;
			break;
		case '4':
			xp = 1100;
			break;
		case '5':
			xp = 1800;
			break;
		case '6':
			xp = 2300;
			break;
		case '7':
			xp = 2900;
			break;
		case '8':
			xp = 3900;
			break;
		case '9':
			xp = 5000;
			break;
		case '10':
			xp = 5900;
			break;
		case '11':
			xp = 7200;
			break;
		case '12':
			xp = 8400;
			break;
		case '13':
			xp = 10000;
			break;
		case '14':
			xp = 11500;
			break;
		case '15':
			xp = 13000;
			break;
		case '16':
			xp = 15000;
			break;
		case '17':
			xp = 18000;
			break;
		case '18':
			xp = 20000;
			break;
		case '19':
			xp = 22000;
			break;
		case '20':
			xp = 25000;
			break;
		case '21':
			xp = 33000;
			break;
		case '22':
			xp = 41000;
			break;
		case '23':
			xp = 50000;
			break;
		case '24':
			xp = 62000;
			break;
		case '25':
			xp = 75000;
			break;
		case '26':
			xp = 90000;
			break;
		case '27':
			xp = 105000;
			break;
		case '28':
			xp = 120000;
			break;
		case '29':
			xp = 135000;
			break;
		case '30':
			xp = 155000;
			break;
		default:
			xp = 'error';
	}

	return xp;
};

/**
 * Returns an array of XP thresholds for each encounter difficulty
 * @function calculateXpThreshold
 * @param {Object} hero Hero object
 * @returns {Array} Array of XP thresholds ["Easy", "Medium", "Hard", "Deadly"]
 */
export const calculateXpThreshold = (hero) => {
	let threshold = [];

	switch (hero.level) {
		case 1:
			threshold = [25, 50, 75, 100];
			break;
		case 2:
			threshold = [50, 100, 150, 200];
			break;
		case 3:
			threshold = [75, 150, 225, 400];
			break;
		case 4:
			threshold = [125, 250, 375, 500];
			break;
		case 5:
			threshold = [250, 500, 750, 1100];
			break;
		case 6:
			threshold = [300, 600, 900, 1400];
			break;
		case 7:
			threshold = [350, 750, 1100, 1700];
			break;
		case 8:
			threshold = [450, 900, 1400, 2100];
			break;
		case 9:
			threshold = [550, 1100, 1600, 2400];
			break;
		case 10:
			threshold = [600, 1200, 1900, 2800];
			break;
		case 11:
			threshold = [800, 1600, 2400, 3600];
			break;
		case 12:
			threshold = [1000, 2000, 3000, 4500];
			break;
		case 13:
			threshold = [1100, 2200, 3400, 5100];
			break;
		case 14:
			threshold = [1250, 2500, 3800, 5700];
			break;
		case 15:
			threshold = [1400, 2800, 4300, 6400];
			break;
		case 16:
			threshold = [1600, 3200, 4800, 7200];
			break;
		case 17:
			threshold = [2000, 3900, 5900, 8800];
			break;
		case 18:
			threshold = [2100, 4200, 6300, 9500];
			break;
		case 19:
			threshold = [2400, 4900, 7300, 10900];
			break;
		case 20:
			threshold = [2800, 5700, 8500, 12700];
			break;
		default:
			threshold = ['error!'];
	}

	return threshold;
};

export const calculateNpcXpThreshold = (npc) => {
	let threshold = [];

	const xp = getXp(npc);

	threshold[0] = xp * 0.15; // easy
	threshold[1] = xp * 0.3; // medium
	threshold[2] = xp * 0.45; // hard
	threshold[3] = xp * 0.7; // deadly

	return threshold;
};

/**
 * Calculates the threshold for an entire hero party
 * @function calculatePartyXpThreshold
 * @param {Array} heroes Array of Hero objects (party)
 * @returns {Object} An object containing threshold data for each encounter difficulty
 */
export const calculatePartyXpThreshold = (heroes, npcs) => {
	let easy = 0;
	let medium = 0;
	let hard = 0;
	let deadly = 0;

	heroes.forEach((hero) => {
		let threshold = calculateXpThreshold(hero);
		easy += threshold[0];
		medium += threshold[1];
		hard += threshold[2];
		deadly += threshold[3];
	});

	if (npcs) {
		npcs.forEach((npc) => {
			let threshold = calculateNpcXpThreshold(npc);
			easy += threshold[0];
			medium += threshold[1];
			hard += threshold[2];
			deadly += threshold[3];
		});
	}

	return { easy, medium, hard, deadly };
};

/**
 * Calculates the base XP gained from an array of monsters
 * @function calculateBaseMonsterXp
 * @param {Array} monsters Array of Monster objects
 * @returns {Number} Base Monster XP
 */
export const calculateBaseMonsterXp = (monsters) => {
	let total = 0;

	monsters.forEach((monster) => {
		total += getXp(monster);
	});

	return total;
};

/**
 * Adjusts base encounter XP with total number of monsters
 * @function calculateMonsterXP
 * @param {Array} monsters Array of Monster objects
 * @returns {Number} Total XP amount after # of monsters is accounted for
 */
export const calculateMonsterXp = (monsters) => {
	let total = calculateBaseMonsterXp(monsters);

	if (monsters.length === 2) {
		total *= 1.5;
	} else if (monsters.length <= 6 && monsters.length >= 3) {
		total *= 2;
	} else if (monsters.length <= 10 && monsters.length >= 7) {
		total *= 2.5;
	} else if (monsters.length <= 14 && monsters.length >= 11) {
		total *= 3;
	} else if (monsters.length >= 15) {
		total *= 4;
	}

	return total;
};

/**
 * Returns a JSX element with the result of an encounters challenge rating
 * @function getChallengeRating
 * @param {Object} battle Battle object
 * @returns {Object} jsx object with the challenge rating of an encounter
 */
export const getChallengeRating = (battle) => {
	const partyThresholds = calculatePartyXpThreshold(
		battle.heroes,
		battle?.npcs
	);
	const totalMonsterXp = calculateMonsterXp(battle.monsters);

	if (totalMonsterXp === 0) {
		return (
			<span className="challenge-rating-display trivial">Trivial</span>
		);
	} else if (totalMonsterXp < partyThresholds.medium) {
		return <span className="challenge-rating-display easy">Easy</span>;
	} else if (totalMonsterXp < partyThresholds.hard) {
		return <span className="challenge-rating-display medium">Medium</span>;
	} else if (totalMonsterXp < partyThresholds.deadly) {
		return <span className="challenge-rating-display hard">Hard</span>;
	} else if (totalMonsterXp >= partyThresholds.deadly) {
		return <span className="challenge-rating-display deadly">Deadly</span>;
	} else {
		return (
			<span className="challenge-rating-display trivial">Trivial</span>
		);
	}
};
