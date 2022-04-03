// Returns a <div> with any abilities a monster may have
const Trait = ({ title, description }) => {
	return (
		<div className="dmd-card-row py-1">
			<p className="ability-text m-0">
				<span className="ability-title">{title}.</span> {description}
			</p>
		</div>
	);
};

export default Trait;
