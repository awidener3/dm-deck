// Handles all stats within a monsters object
const renderStats = (monster) => {
	return (
		<>
			{Object.keys(monster.skills).length !== 0 ? (
				<Stat monster={monster} title={'Skills'} property={'skills'} />
			) : null}
			{monster.damage_resistances ? (
				<Stat
					monster={monster}
					title={'Damage Resistances'}
					property={'damage_resistances'}
					connector={'; '}
				/>
			) : null}
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
		str += `${skill} +${monster.skills[skill]}, `;
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

export { renderStats };
