import { capitalize } from '../../../utils/utils';
// Handles all stats within a monsters object
const renderStats = (monster) => {
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
		<>
			{/* {checkNull(monster) && (
				<Stat monster={monster} title={'Skills'} property={'skills'} />
			)} */}

			<div className="d-flex flex-wrap">
				<p className="stat-text my-0">
					<span className="stat-title">Skills</span>{' '}
					{skillsArr.join(', ')}
				</p>
			</div>

			{monster.damage_resistances && (
				<Stat
					monster={monster}
					title={'Damage Resistances'}
					property={'damage_resistances'}
					connector={'; '}
				/>
			)}
			{monster.damage_immunities ? (
				<Stat
					monster={monster}
					title={'Damage Immunities'}
					property={'damage_immunities'}
				/>
			) : null}
			{monster.condition_immunities ? (
				<Stat
					monster={monster}
					title={'Condition Immunities'}
					property={'condition_immunities'}
				/>
			) : null}
			{monster.senses ? (
				<Stat monster={monster} title={'Senses'} property={'senses'} />
			) : null}
			{monster.languages ? (
				<Stat
					monster={monster}
					title={'Languages'}
					property={'languages'}
				/>
			) : null}
			{monster.proficiency_bones > 0 ? (
				<p className="stat-text m-0">
					<span className="stat-title">Proficiency Bonus</span> +
					{monster.proficiency_bonus}
				</p>
			) : null}
		</>
	);
};

const formatSkills = (monster) => {
	let str = '';
	for (const skill in monster.skills) {
		if (monster.skills[skill] !== null) {
			str += `${skill} +${monster.skills[skill]}, `;
		}
	}
	return str.slice(0, -2);
};

// Returns a <div> with the title of the stat and a description
const Stat = ({ monster, title, property, connector = ', ' }) => {
	return (
		<div className="d-flex flex-wrap">
			<p className="stat-text my-0">
				<span className="stat-title">{title}</span>{' '}
				{property === 'skills'
					? formatSkills(monster)
					: monster[`${property}`]}
			</p>
		</div>
	);
};

const Stats = ({ monster }) => {
	return (
		<div className="dmd-card-row dmd-card-stats my-1 border-bottom">
			{renderStats(monster)}
		</div>
	);
};

export default Stats;
