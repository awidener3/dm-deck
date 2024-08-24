// Handles sliding animation (left)
export const slideLeft = (
	index,
	turn,
	round,
	battleOrder,
	setRound,
	setTurn,
	setIndex
) => {
	// Previous turn
	if (index - 1 >= 0) {
		setTurn(turn - 1);
		setIndex(index - 1);
	}

	// Previous round
	if (index === 0 && round !== 1) {
		setIndex(battleOrder.length - 1);
		setTurn(battleOrder.length);
		setRound(round - 1);
	}
};

// Handles sliding animation (right)
export const slideRight = (
	index,
	turn,
	round,
	battleOrder,
	setRound,
	setTurn,
	setIndex
) => {
	// Next turn
	if (index + 1 <= battleOrder.length - 1) {
		setTurn(turn + 1);
		setIndex(index + 1);
	}

	// Next round
	if (index === battleOrder.length - 1) {
		setIndex(0);
		setTurn(1);
		setRound(round + 1);
	}
};
