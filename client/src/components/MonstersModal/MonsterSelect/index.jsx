import { Modal } from 'react-bootstrap';

const MonsterSelect = ({ monsters, handleViewMonster }) => {
	let inBattle = monsters;
	console.log(inBattle);
	return (
		<div>
			<Modal.Title className="text-center">Select a Monster</Modal.Title>
			<Modal.Body>
				<div className="monster-btns d-flex flex-column">
					{monsters.map((monster) => {
						let currentMonster = monster;
						if (currentMonster.type === 'monster') {
							return (
								<button
									className="btn btn-outline-secondary mb-2 w-75 m-auto"
									key={monster.name}
									onClick={() =>
										handleViewMonster(currentMonster)
									}
								>
									{monster.name}
								</button>
							);
						}
						return null;
					})}
				</div>
			</Modal.Body>
		</div>
	);
};

export default MonsterSelect;
