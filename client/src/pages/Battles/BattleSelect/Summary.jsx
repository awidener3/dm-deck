import {
	getChallengeRating,
	calculateBaseMonsterXp,
	calculateMonsterXp,
} from 'utils/basicRuleCalculations';
import { Row, Col } from 'react-bootstrap';

const Summary = ({ battle }) => {
	return (
		<div>
			<p className="summary-stat">
				Difficulty {getChallengeRating(battle)}
			</p>
			<Row>
				<Col>
					<p className="summary-stat m-0">
						Total XP{' '}
						<span className="total-xp">
							{calculateBaseMonsterXp(battle.monsters)}
						</span>
					</p>
				</Col>
				<Col>
					<p className="summary-stat m-0">
						Adjusted XP{' '}
						<span className="total-xp">
							{calculateMonsterXp(battle.monsters)}
						</span>
					</p>
				</Col>
			</Row>
		</div>
	);
};

export default Summary;
