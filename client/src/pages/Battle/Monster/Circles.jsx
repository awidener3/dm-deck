const Circles = ({ monster }) => {
	const formatAlignment = (alignment) => {
		if (alignment === 'unaligned') {
			return 'U';
		} else {
			let arr = alignment.split(' ');
			let str = arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
			return str;
		}
	};
	if (monster.type) {
		return (
			<div className="circle-container d-flex p-2">
				<div
					className="stat-circle cr-circle"
					title={`Challenge Rating: ${monster.challenge_rating}`}
				>
					{monster.challenge_rating}
				</div>
				<div className="stat-circle race-circle" title={monster.type}>
					{`${monster.type[0].toUpperCase()}${monster.type[1]}`}
				</div>
				<div
					className="stat-circle alignment-circle"
					title={monster.alignment}
				>
					{formatAlignment(monster.alignment)}
				</div>
			</div>
		);
	}
	return <></>;
};

export default Circles;
