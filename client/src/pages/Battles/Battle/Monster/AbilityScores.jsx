// import { renderAbilityScores } from '../AbilityScore';

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

	for (let i = 0; i < shortName.length; i++) {
		abilityScores.push(
			<AbilityScore
				key={shortName[i][0]}
				monster={monster}
				ability={shortName[i][0]}
				short={shortName[i][1]}
			/>
		);
	}
	return <>{abilityScores}</>;
};

// Returns a <p> tag with ability score and calculated modifier
const AbilityScore = ({ monster, ability, short }) => {
	let score = monster[`${ability}`];
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

// export { renderAbilityScores };

const AbilityScores = ({ monster }) => {
	return (
		<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
			{renderAbilityScores(monster)}
		</div>
	);
};

export default AbilityScores;
