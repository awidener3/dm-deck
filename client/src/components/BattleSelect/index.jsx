import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BattleSelect = () => {
	const [battles, setBattles] = useState([]);

	useEffect(() => {
		const battles = JSON.parse(localStorage.getItem('dm-deck-battles'));
		if (battles) {
			setBattles(battles);
		}
	}, []);

	console.log('battles', battles);

	return (
		<div>
			<h1 className="text-center">Select a saved Battle</h1>
			<div className="container-fluid d-flex flex-wrap">
				{battles.map((battle) => {
					return (
						<div key={battle.name} className="w-50 p-2">
							<div className="card p-3">
								<h2 className="text-center">{battle.name}</h2>
								<div className="d-flex justify-content-around">
									<div>
										<h3>Heroes</h3>
										<ul className="list-unstyled">
											{battle.heroes.map((hero) => {
												return (
													<li
														key={
															hero.character_name
														}
													>
														{hero.character_name}
													</li>
												);
											})}
										</ul>
									</div>
									<div>
										<h3>Monsters</h3>
										<ul className="list-unstyled">
											{battle.monsters.map((monster) => {
												return (
													<li key={monster.name}>
														{monster.name}
													</li>
												);
											})}
										</ul>
									</div>
								</div>

								<Link
									className="btn btn-success"
									to={`/battles/${battle.name}`}
								>
									Battle!
								</Link>
							</div>
						</div>
					);
				})}
				<div className="card w-50 p-3">
					<h2 className="text-center">Example Battle</h2>

					<p>Used for testing with hard-coded data.</p>

					<Link className="btn btn-success" to={`/battles/001`}>
						Battle!
					</Link>
				</div>

				<div className="card w-50 p-3">
					<h2 className="text-center">Battle</h2>
					<p>Nothing here yet...</p>
					<Link
						className="btn btn-success disabled"
						to={`/battles/002`}
					>
						Battle!
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BattleSelect;