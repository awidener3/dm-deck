import {
	getChallengeRating,
	calculateBaseMonsterXp,
	calculateMonsterXp,
} from 'utils/basicRuleCalculations';

const Summary = ({ battle }) => {
	return (
		<div className="mb-0 mb-md-2">
			<p className="summary-stat">
				Difficulty {getChallengeRating(battle)}
			</p>

			<p className="summary-stat m-0">
				Total XP{' '}
				<span className="total-xp">
					{calculateBaseMonsterXp(battle.monsters)}
				</span>
			</p>

			<p className="summary-stat m-0 pb-1">
				Adjusted XP{' '}
				<span className="total-xp">
					{calculateMonsterXp(battle.monsters)}
				</span>
			</p>
		</div>
	);
};

export default Summary;
