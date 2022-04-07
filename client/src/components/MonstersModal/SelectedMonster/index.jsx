import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const SelectedMonster = ({
	monster,
	monsterArray,
	setSelectedMonster,
	setMonsterData,
	handleCloseMonstersModal,
}) => {
	const [startingHitpoints] = useState(monster.hitpoints);
	const handleChangeHitpoints = (e) => {
		const updatedArray = monsterArray.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hitpoints = e.target.value;
			}
		});
		setMonsterData([...updatedArray]);
	};

	return (
		<div>
			<Modal.Title className="text-center">{monster.name}</Modal.Title>
			<Modal.Body className="w-50 m-auto">
				<div className="monster-btns d-flex flex-column">
					<p>Armor Class: {monster.armor_class}</p>
					<p>Hitpoints: {startingHitpoints}</p>
					<label htmlFor="hitpoints">Add Damage:</label>
					<input
						type="number"
						name="hitpoints"
						id="hitpoints"
						min="0"
						value={monster.hitpoints}
						onChange={handleChangeHitpoints}
					/>
				</div>

				<div className="d-flex justify-content-center">
					{/* Button to return back to monster select */}
					<button
						className="btn btn-outline-secondary m-1"
						onClick={() => setSelectedMonster('')}
					>
						&lt; Back
					</button>

					{/* Apply damage */}
					<button
						className="btn btn-outline-secondary m-1"
						onClick={() => {
							setSelectedMonster('');
							handleCloseMonstersModal();
						}}
					>
						Apply
					</button>
				</div>
			</Modal.Body>
		</div>
	);
};

export default SelectedMonster;
