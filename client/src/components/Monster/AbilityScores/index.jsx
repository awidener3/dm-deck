import { renderAbilityScores } from '../AbilityScore';

const AbilityScores = ({ monster }) => {
	return (
		<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
			{renderAbilityScores(monster)}
		</div>
	);
};

export default AbilityScores;
