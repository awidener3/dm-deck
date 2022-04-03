const Circles = ({ monster }) => {
	return (
		<div className="circle-container d-flex p-2">
			<div
				className="stat-circle cr-circle"
				title={`Challenge Rating: ${monster.challenge_rating}`}
			>
				{monster.challenge_rating}
			</div>
			<div className="stat-circle race-circle" title={monster.race}>
				{monster.race_short}
			</div>
			<div
				className="stat-circle alignment-circle"
				title={monster.alignment}
			>
				{monster.alignment_short}
			</div>
		</div>
	);
};

export default Circles;
