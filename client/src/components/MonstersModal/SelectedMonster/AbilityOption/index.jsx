const AbilityOption = ({ monster, short, long }) => {
	const getModifier = (ability) => {
		return Math.floor((monster.ability_scores[`${ability}`] - 10) / 2);
	};

	return (
		<option value={long}>
			{short} (
			{getModifier(long) > 0
				? `+${getModifier(long)}`
				: getModifier(long)}
			)
		</option>
	);
};

export default AbilityOption;
