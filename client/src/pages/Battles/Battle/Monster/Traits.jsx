// import Trait from '../Trait';

const Trait = ({ title, description }) => {
	return (
		<div className="dmd-card-row py-1">
			<p className="ability-text m-0">
				<span className="ability-title">{title}.</span> {description}
			</p>
		</div>
	);
};

const Traits = ({ monster }) => {
	return (
		<div className="dmd-card-traits my-1 border-bottom">
			{monster.special_abilities
				? monster.special_abilities.map(({ name, desc }) => (
						<Trait key={name} title={name} description={desc} />
				  ))
				: null}
		</div>
	);
};

export default Traits;
