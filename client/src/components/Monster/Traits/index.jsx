import Trait from '../Trait';

const Traits = ({ monster }) => {
	return (
		<div className="dmd-card-traits my-1">
			{monster.special_traits
				? monster.special_traits.map(({ title, description }) => (
						<Trait
							key={title}
							title={title}
							description={description}
						/>
				  ))
				: null}
		</div>
	);
};

export default Traits;
