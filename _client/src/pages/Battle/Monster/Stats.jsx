import { capitalize } from '../../../utils/utils';

// Returns a <div> with the title of the stat and a description
const Stat = ({ monster, title, property }) => {
	const statStr = monster[property];

	return (
		<div className="d-flex flex-wrap">
			<p className="stat-text my-0">
				<span className="stat-title">{title}</span> {statStr}
			</p>
		</div>
	);
};

const Stats = ({ monster }) => {
	const skills = [
		'acrobatics',
		'animal_handling',
		'arcana',
		'athletics',
		'deception',
		'history',
		'insight',
		'intimidation',
		'investigation',
		'medicine',
		'nature',
		'perception',
		'performance',
		'persuasion',
		'religion',
		'sleight_of_hand',
		'stealth',
		'survival',
	];

	let skillsArr = [];

	skills.forEach((skill) => {
		if (monster[skill]) {
			skillsArr.push(
				`${capitalize(skill)} ${
					(monster[skill] < 0 ? '' : '+') + monster[skill]
				}`
			);
		}
	});

	return (
		<div className="dmd-card-row dmd-card-stats my-1 border-bottom">
			{/* Skills */}
			<div className="d-flex flex-wrap">
				<p className="stat-text my-0">
					<span className="stat-title">Skills</span>{' '}
					{skillsArr.join(', ')}
				</p>
			</div>

			{/* Damage Resistance */}
			{monster.damage_resistances && (
				<Stat
					monster={monster}
					title={'Damage Resistances'}
					property={'damage_resistances'}
					connector={'; '}
				/>
			)}

			{/* Damage Immunities */}
			{monster.damage_immunities && (
				<Stat
					monster={monster}
					title={'Damage Immunities'}
					property={'damage_immunities'}
				/>
			)}

			{/* Condition Immunitites */}
			{monster.condition_immunities && (
				<Stat
					monster={monster}
					title={'Condition Immunities'}
					property={'condition_immunities'}
				/>
			)}

			{/* Senses */}
			{monster.senses && (
				<Stat monster={monster} title={'Senses'} property={'senses'} />
			)}

			{/* Languages */}
			{monster.languages && (
				<Stat
					monster={monster}
					title={'Languages'}
					property={'languages'}
				/>
			)}
		</div>
	);
};

export default Stats;
