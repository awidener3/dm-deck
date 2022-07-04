export const rollDie = (num) => {
	return Math.floor(Math.random() * num) + 1;
};

export const addInitiative = (battleOrder, setbattleOrder) => {
	const arrayWithInitiative = battleOrder
		.map((creature) => ({
			...creature,
			initiative: getInitiative(creature),
		}))
		.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));

	setbattleOrder(arrayWithInitiative);
};

export const getInitiative = (obj) => {
	if (obj.type === 'monster') {
		return (
			Math.floor(Math.random() * 20 + 1) +
			Math.floor((obj.ability_scores.dexterity - 10) / 2)
		);
	} else {
		return Math.floor(Math.random() * 20 + 1);
	}
};
