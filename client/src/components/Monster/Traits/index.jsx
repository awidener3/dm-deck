import Trait from '../Trait';

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
