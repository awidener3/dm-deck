export const rollD20 = () => {
	return Math.floor(Math.random() * 20) + 1;
};

export const rollD12 = () => {
	return Math.floor(Math.random() * 12) + 1;
};

export const rollD10 = () => {
	return Math.floor(Math.random() * 10) + 1;
};

export const rollD8 = () => {
	return Math.floor(Math.random() * 8) + 1;
};
export const rollD6 = () => {
	return Math.floor(Math.random() * 6) + 1;
};

export const rollD4 = () => {
	return Math.floor(Math.random() * 4) + 1;
};

export const rollDie = (num) => {
	return Math.floor(Math.random() * num) + 1;
};

// export const addInitiative = (
// 	monsterData,
// 	heroData,
// 	setMonsterData,
// 	setHeroData
// ) => {
// 	const monsters = monsterData.map((monster) => ({
// 		...monster,
// 		initiative: getInitiative(monster),
// 	}));
// 	setMonsterData(monsters);

// 	const heroes = heroData.map((hero) => ({
// 		...hero,
// 		initiative: getInitiative(hero),
// 	}));
// 	setHeroData(heroes);
// };

// ? New addInitiative with sortedData only
export const addInitiative = (sortedData, setSortedData) => {
	const arrayWithInitiative = sortedData
		.map((creature) => ({
			...creature,
			initiative: getInitiative(creature),
		}))
		.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));

	setSortedData(arrayWithInitiative);
};

const getInitiative = (obj) => {
	if (obj.type === 'monster') {
		return (
			Math.floor(Math.random() * 20 + 1) +
			Math.floor((obj.ability_scores.dexterity - 10) / 2)
		);
	} else {
		return Math.floor(Math.random() * 20 + 1);
	}
};
