import {
	getChallengeRating,
	calculateMonsterXp,
} from '../../../utils/basicRuleCalculations';

const Summary = ({ battle }) => {
	return (
		<div>
			<p className="summary-stat">
				DIFFICULTY: {getChallengeRating(battle)}
			</p>
			<p className="summary-stat">
				TOTAL XP:{' '}
				<span className="total-xp">
					{calculateMonsterXp(battle.monsters)}
				</span>
			</p>
		</div>
	);
};

export default Summary;
