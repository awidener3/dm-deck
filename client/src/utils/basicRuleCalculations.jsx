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

export const calculatePartyXpThreshold = (heroes) => {
	let easy = 0;
	let medium = 0;
	let hard = 0;
	let deadly = 0;

	for (let i = 0; i < heroes.length; i++) {
		let heroThreshold = calculateXpThreshold(heroes[i]);
		easy += heroThreshold[0];
		medium += heroThreshold[1];
		hard += heroThreshold[2];
		deadly += heroThreshold[3];
	}

	return { easy, medium, hard, deadly };
};

export const calculateMonsterXp = (monsters) => {
	let total = 0;

	for (let i = 0; i < monsters.length; i++) {
		total += getXp(monsters[i]);
	}

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

export const getChallengeRating = (battle) => {
	const partyThresholds = calculatePartyXpThreshold(battle.heroes);
	const totalMonsterXp = calculateMonsterXp(battle.monsters);

	console.log(partyThresholds);
	console.log(totalMonsterXp);

	if (totalMonsterXp < partyThresholds.medium) {
		return 'Easy';
	} else if (totalMonsterXp < partyThresholds.hard) {
		return 'Medium';
	} else if (totalMonsterXp < partyThresholds.deadly) {
		return 'Hard';
	} else {
		return 'Deadly';
	}
};

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
