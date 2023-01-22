/**
 * Basic function that returns a random number based on the number of sides on a die
 * @function rollDie
 * @param {Number} num Number of sides on a die (4, 6, 8, 12, 20, 100)
 * @returns {Number} Random number
 */
export const rollDie = (num) => {
	return Math.floor(Math.random() * num) + 1;
};

/**
 * Adds an initiative to a battle order, taking into account if the objects already have an initiative
 * @function addInitiative
 * @param {Array} battleOrder Array of hero and monster objects
 * @param {Function} setbattleOrder Function to update the state of the battleOrder
 */
export const addInitiative = (battleOrder, setbattleOrder) => {
	const arrayWithInitiative = battleOrder
		.map((creature) => ({
			...creature,
			initiative: getInitiative(creature),
		}))
		.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));

	setbattleOrder(arrayWithInitiative);
};

/**
 * Gets an initiative for creatures that do not have one in the object already
 * @function getInitiative
 * @param {Object} obj Hero or monster object
 * @returns {Number} Random number for initiative (between 1 and 25)
 */
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
