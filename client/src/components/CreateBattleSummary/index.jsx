import {
	getChallengeRating,
	calculateMonsterXp,
} from '../../utils/basicRuleCalculations';
import { Link } from 'react-router-dom';

import './createBattleSummary.scss';

const CreateBattleSummary = ({
	battleName,
	selectedHeroes,
	selectedMonsters,
}) => {
	const handleGetChallengeRating = () => {
		let battle = {
			heroes: selectedHeroes,
			monsters: selectedMonsters,
		};

		return getChallengeRating(battle);
	};

	const handleSave = () => {
		let existingBattles = JSON.parse(
			localStorage.getItem('dm-deck-battles')
		);

		if (existingBattles === null) existingBattles = [];

		let battleData = {
			name: battleName,
			heroes: selectedHeroes,
			monsters: selectedMonsters,
		};

		let updatedArray = [battleData, ...existingBattles];

		localStorage.setItem('dm-deck-battles', JSON.stringify(updatedArray));
	};

	return (
		<div className="summary-card mx-auto mt-2 d-flex flex-column">
			{/* Title */}
			<h2 className="summary-card-title">{battleName || 'New Battle'}</h2>
			{/* Stats */}
			<div className="summary-stats">
				<p className="summary-stat m-0">
					Difficulty Rating {handleGetChallengeRating()}
				</p>
				<p className="summary-stat m-0">
					Total XP{' '}
					<span className="total-xp">
						{calculateMonsterXp(selectedMonsters)}
					</span>
				</p>
			</div>

			<div className="roster-container mt-2">
				{/* Heroes */}
				<article className="card roster-card p-3 w-100">
					<h2 className="roster-title">Heroes</h2>
					<div>
						{selectedHeroes.map((hero) => (
							<p
								key={hero.character_name}
								className="roster-creature-name m-0"
							>
								{hero.character_name}
							</p>
						))}
					</div>
				</article>
				{/* Monsters */}
				<article className="card roster-card mt-3 p-3 w-100">
					<h2 className="roster-title">Monsters</h2>
					<div>
						{selectedMonsters.length > 0 ? (
							selectedMonsters.map((monster, index) => (
								<p
									key={index}
									className="roster-creature-name m-0"
								>
									{monster.name}
								</p>
							))
						) : (
							<p>Nothing yet...</p>
						)}
					</div>
				</article>
			</div>
			<Link
				to="/battles"
				className="btn btn-outline-success mt-auto"
				onClick={handleSave}
			>
				Save
			</Link>
		</div>
	);
};

export default CreateBattleSummary;
