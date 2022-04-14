import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

import './battleSelect.scss';

const BattleSelect = () => {
	const [battles, setBattles] = useState([]);

	useEffect(() => {
		const battles = JSON.parse(localStorage.getItem('dm-deck-battles'));
		if (battles) {
			setBattles(battles);
		}
	}, []);

	const handleDeleteBattle = (selectedBattle) => {
		let updatedArray = battles.slice();

		updatedArray = updatedArray.filter(
			(battle) => battle !== selectedBattle
		);

		setBattles(updatedArray);
		localStorage.setItem('dm-deck-battles', JSON.stringify(updatedArray));
	};

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
										<Summary battle={battle} />

										{/* Initiative Roll */}
										<Form>
											<Form.Check
												type="switch"
												label="Auto-roll Initiative"
												defaultChecked={true}
											/>
										</Form>

										<SummaryAccordion battle={battle} />
									</div>

									{/* Buttons */}
									<div className="button-container mt-auto d-flex justify-content-center">
										<Link
											className="btn btn-outline-primary me-2"
											to={`/battles/${battle.name}`}
										>
											Battle!
										</Link>

										<button
											className="btn btn-outline-danger ms-2"
											onClick={() =>
												handleDeleteBattle(battle)
											}
										>
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
