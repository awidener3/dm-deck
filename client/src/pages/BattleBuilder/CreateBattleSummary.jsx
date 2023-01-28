import {
	getChallengeRating,
	calculateBaseMonsterXp,
	calculateMonsterXp,
	getXp,
} from 'utils/basicRuleCalculations';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, FormLabel } from 'react-bootstrap';

import './battleBuilder.scss';

const CreateBattleSummary = ({
	battleName,
	selectedHeroes,
	selectedMonsters,
	selectedNpcs,
	handleRemoveMonster,
	handleRemoveHero,
	handleRemoveNpc,
	handleSave,
}) => {
	const handleGetChallengeRating = () => {
		let battle = {
			heroes: selectedHeroes,
			monsters: selectedMonsters,
		};

		return getChallengeRating(battle);
	};

	return (
		<div className="mx-auto my-4">
			<FormLabel>Encounter Summary</FormLabel>
			<div className="summary-card d-flex flex-column">
				{/* Title */}
				<h2 className="summary-card-title">
					{battleName || 'New Battle'}
				</h2>
				{/* Stats */}
				<section className="summary-stats">
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
				</section>

				<div className="roster-container mt-2">
					{/* Heroes/Characters */}
					<article className="card roster-card p-3 w-100">
						<h2 className="roster-title">Characters</h2>
						<ListGroup variant="flush" className="roster-creatures">
							{selectedHeroes.length > 0 ? (
								selectedHeroes.map((hero, index) => (
									<ListGroup.Item
										className="d-flex justify-content-between roster-name"
										key={hero._id}
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

					{/* NPCs */}
					{selectedNpcs.length > 0 && (
						<article className="card roster-card mt-3 p-3 w-100">
							<h2 className="roster-title">NPC's</h2>
							<ListGroup
								variant="flush"
								className="roster-creatures"
							>
								{selectedNpcs.map((npc, index) => (
									<ListGroup.Item
										className="d-flex justify-content-between px-2 roster-name"
										key={index}
									>
										{npc.name}{' '}
										<span className="roster-subtext">
											CR {npc.challenge_rating} (
											{getXp(npc)}
											xp)
											<button
												className="close-btn ms-1"
												onClick={() =>
													handleRemoveNpc(npc)
												}
											>
												&#10006;
											</button>
										</span>
									</ListGroup.Item>
								))}
							</ListGroup>
						</article>
					)}

					{/* Monsters */}
					<article className="card roster-card mt-3 p-3 w-100">
						<h2 className="roster-title">Monsters</h2>
						<ListGroup variant="flush" className="roster-creatures">
							{selectedMonsters.length > 0 ? (
								selectedMonsters.map((monster, index) => (
									<ListGroup.Item
										className="d-flex justify-content-between px-2 roster-name"
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
					to="/battle-select"
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
