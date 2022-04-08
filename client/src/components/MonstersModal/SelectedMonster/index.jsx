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
				<div className="monster-btns d-flex flex-column text-center">
					<p>Armor Class: {monster.armor_class}</p>
					<p>Hitpoints: {startingHitpoints}</p>
					<div className="input-group">
						<label htmlFor="hitpoints" className="input-group-text">
							Adjust HP:
						</label>
						<input
							type="number"
							className="form-control"
							name="hitpoints"
							id="hitpoints"
							min="0"
							value={monster.hitpoints}
							onChange={handleChangeHitpoints}
						/>
					</div>
				</div>

				<div className="d-flex justify-content-center mt-2">
					{/* Button to return back to monster select */}
					<button
						className="btn btn-outline-secondary m-1"
						onClick={() => setSelectedMonster('')}
					>
						Back
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
