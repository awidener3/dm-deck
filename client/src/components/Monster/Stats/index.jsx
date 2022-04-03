import { renderStats } from '../Stat';

const Stats = ({ monster }) => {
	return (
		<div className="dmd-card-row dmd-card-stats my-1 border-bottom">
			{renderStats(monster)}
		</div>
	);
};

export default Stats;
