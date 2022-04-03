// Renders all ability scores
const renderAbilityScores = (monster) => {
	let abilityScores = [];
	let shortName = [
		['strength', 'STR'],
		['dexterity', 'DEX'],
		['constitution', 'CON'],
		['intelligence', 'INT'],
		['wisdom', 'WIS'],
		['charisma', 'CHA'],
	];
	for (let ability in monster.ability_scores) {
		let shortIndex = shortName.findIndex(
			(stat) => stat.indexOf(ability) !== -1
		);

		abilityScores.push(
			<AbilityScore
				key={ability}
				monster={monster}
				ability={ability}
				short={shortName[shortIndex][1]}
			/>
		);
	}
	return <>{abilityScores}</>;
};

// Returns a <p> tag with ability score and calculated modifier
const AbilityScore = ({ monster, ability, short }) => {
	let score = monster.ability_scores[`${ability}`];
	let modifier = Math.floor((score - 10) / 2);
	return (
		<div>
			<p className="stat-title m-0">{short}</p>
			<p className="stat-num m-0">
				{score} {modifier >= 0 ? `(+${modifier})` : `(${modifier})`}
			</p>
		</div>
	);
};

export { renderAbilityScores };
