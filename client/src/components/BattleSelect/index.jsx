import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, ListGroup, Form } from 'react-bootstrap';

import { getXp } from '../../utils/basicRuleCalculations';

import './battleSelect.scss';

const BattleSelect = () => {
	const [battles, setBattles] = useState([]);

	useEffect(() => {
		const battles = JSON.parse(localStorage.getItem('dm-deck-battles'));
		if (battles) {
			setBattles(battles);
		}
	}, []);

	return (
		<div>
			<h1 className="text-center">Select a Saved Battle</h1>
			<hr />
			<div className="container d-flex flex-wrap justify-content-center">
				{battles.length > 0 ? (
					battles.map((battle) => {
						return (
							<div key={battle.name} className="p-2">
								<div className="card custom-card">
									<h2 className="text-center">
										{battle.name}
									</h2>

									<hr />
									<div className="card-body">
										<Form>
											<Form.Check
												type="switch"
												label="Auto-roll Initiative"
												defaultChecked={true}
											/>
										</Form>
										<Accordion
											className="mb-2"
											defaultActiveKey={['0']}
											alwaysOpen
										>
											<Accordion.Item eventKey="1">
												<Accordion.Header>
													<h3 className="accordion-title">
														Heroes (
														{battle.heroes.length})
													</h3>
												</Accordion.Header>
												<Accordion.Body>
													<ListGroup variant="flush">
														{battle.heroes.map(
															(hero, i) => (
																<ListGroup.Item
																	key={i}
																>
																	{
																		hero.character_name
																	}{' '}
																	-{' '}
																	<span className="accordion-subtext">
																		{
																			hero.class
																		}{' '}
																		(
																		{
																			hero.level
																		}
																		)
																	</span>
																</ListGroup.Item>
															)
														)}
													</ListGroup>
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="2">
												<Accordion.Header>
													<h3 className="accordion-title">
														Monsters (
														{battle.monsters.length}
														)
													</h3>
												</Accordion.Header>
												<Accordion.Body>
													<ListGroup variant="flush">
														{battle.monsters.map(
															(monster, i) => (
																<ListGroup.Item
																	key={i}
																>
																	{
																		monster.name
																	}{' '}
																	<span className="accordion-subtext">
																		CR{' '}
																		{
																			monster.challenge_rating
																		}{' '}
																		(
																		{getXp(
																			monster
																		)}
																		xp )
																	</span>
																</ListGroup.Item>
															)
														)}
													</ListGroup>
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
									<div className="button-container mt-auto d-flex justify-content-center">
										<Link
											className="btn btn-outline-primary me-2"
											to={`/battles/${battle.name}`}
										>
											Battle!
										</Link>

										<button className="btn btn-outline-danger ms-2">
											Delete
										</button>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<h2 className="mx-auto">No battles yet!</h2>
				)}
			</div>
		</div>
	);
};

export default BattleSelect;
