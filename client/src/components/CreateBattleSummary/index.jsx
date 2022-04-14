import {
	getChallengeRating,
	calculateBaseMonsterXp,
	calculateMonsterXp,
	getXp,
} from '../../utils/basicRuleCalculations';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';

import './createBattleSummary.scss';

const CreateBattleSummary = ({
	battleName,
	selectedHeroes,
	selectedMonsters,
	handleRemoveMonster,
	handleRemoveHero,
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
		<div className="mx-auto mt-5">
			<div className="summary-card d-flex flex-column">
				{/* Title */}
				<h2 className="summary-card-title">
					{battleName || 'New Battle'}
				</h2>
				{/* Stats */}
				<div className="summary-stats">
					<p className="summary-stat m-0">
						Difficulty {handleGetChallengeRating()}
					</p>
					<Row>
						<Col>
							<p className="summary-stat m-0">
								Total XP{' '}
								<span className="total-xp">
									{calculateBaseMonsterXp(selectedMonsters)}
								</span>
							</p>
						</Col>
						<Col>
							<p className="summary-stat m-0">
								Adjusted XP{' '}
								<span className="total-xp">
									{calculateMonsterXp(selectedMonsters)}
								</span>
							</p>
						</Col>
					</Row>
				</div>

				<div className="roster-container mt-2">
					{/* Heroes */}
					<article className="card roster-card p-3 w-100">
						<h2 className="roster-title">Heroes</h2>
						<ListGroup variant="flush">
							{selectedHeroes.length > 0 ? (
								selectedHeroes.map((hero, index) => (
									<ListGroup.Item
										className="d-flex justify-content-between"
										key={hero.character_name}
									>
										{hero.character_name}{' '}
										<span className="roster-subtext">
											{hero.class} ({hero.level})
											<button
												className="close-btn ms-1"
												onClick={() =>
													handleRemoveHero(hero)
												}
											>
												&#10006;
											</button>
										</span>
									</ListGroup.Item>
								))
							) : (
								<p>Nothing yet...</p>
							)}
						</ListGroup>
					</article>
					{/* Monsters */}
					<article className="card roster-card mt-3 p-3 w-100">
						<h2 className="roster-title">Monsters</h2>
						<ListGroup variant="flush">
							{selectedMonsters.length > 0 ? (
								selectedMonsters.map((monster, index) => (
									<ListGroup.Item
										className="d-flex justify-content-between px-2"
										key={index}
									>
										{monster.name}{' '}
										<span className="roster-subtext">
											CR {monster.challenge_rating} (
											{getXp(monster)}
											xp)
											<button
												className="close-btn ms-1"
												onClick={() =>
													handleRemoveMonster(monster)
												}
											>
												&#10006;
											</button>
										</span>
									</ListGroup.Item>
								))
							) : (
								<p>Nothing yet...</p>
							)}
						</ListGroup>
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
		</div>
	);
};

export default CreateBattleSummary;
