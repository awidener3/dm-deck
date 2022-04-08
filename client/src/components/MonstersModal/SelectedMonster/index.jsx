import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import { rollDie } from '../../../utils/diceRolls';

const SelectedMonster = ({
	monster,
	monsterArray,
	setSelectedMonster,
	setMonsterData,
	handleCloseMonstersModal,
}) => {
	const [startingHitpoints] = useState(monster.hitpoints);
	const [modifier, setModifier] = useState(0);
	const [savingThrowResult, setSavingThrowResult] = useState(0);

	const changeModifier = (e) => {
		let updatedModifier = getModifier(e.target.value);
		setModifier(updatedModifier);
	};

	const handleChangeHitpoints = (e) => {
		const updatedArray = monsterArray.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hitpoints = e.target.value;
			}
		});
		setMonsterData([...updatedArray]);
	};

	const handleRollSavingThrow = () => {
		const d20 = rollDie(20);
		const result = d20 + Number(modifier);
		setSavingThrowResult(result);
	};

	const getModifier = (ability) => {
		return Math.floor((monster.ability_scores[`${ability}`] - 10) / 2);
	};

	return (
		<div>
			<Modal.Title className="text-center">
				<h1 className="m-0">{monster.name}</h1>
			</Modal.Title>
			<Modal.Body className="w-75 m-auto">
				<div>
					<div className="d-flex justify-content-around">
						<p>Armor Class: {monster.armor_class}</p>
						<p>Hitpoints: {startingHitpoints}</p>
					</div>
					<div className="d-flex flex-column">
						<h5>Roll Saving Throw</h5>
						<div className="input-group mb-2">
							<select
								className="form-select"
								name="saving-throws"
								id="saving-throws"
								onChange={changeModifier}
							>
								<option defaultValue={true}>
									Choose an Ability
								</option>
								<option value={'strength'}>
									STR (
									{getModifier('strength') > 0
										? `+${getModifier('strength')}`
										: getModifier('strength')}
									)
								</option>
								<option value={'dexterity'}>
									DEX (
									{getModifier('dexterity') > 0
										? `+${getModifier('dexterity')}`
										: getModifier('dexterity')}
									)
								</option>
								<option value={'constitution'}>
									CON (
									{getModifier('constitution') > 0
										? `+${getModifier('constitution')}`
										: getModifier('constitution')}
									)
								</option>
								<option value={'intelligence'}>
									INT (
									{getModifier('intelligence') > 0
										? `+${getModifier('intelligence')}`
										: getModifier('intelligence')}
									)
								</option>
								<option value={'wisdom'}>
									WIS (
									{getModifier('wisdom') > 0
										? `+${getModifier('wisdom')}`
										: getModifier('wisdom')}
									)
								</option>
								<option value={'charisma'}>
									CHA (
									{getModifier('charisma') > 0
										? `+${getModifier('charisma')}`
										: getModifier('charisma')}
									)
								</option>
							</select>
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={handleRollSavingThrow}
							>
								Roll
							</button>
							<span className="input-group-text">
								{savingThrowResult}
							</span>
						</div>
						<h5>Change {monster.name}'s HP</h5>
						<div className="input-group-lg">
							<input
								type="number"
								className="form-control text-center"
								name="hitpoints"
								id="hitpoints"
								min="0"
								value={monster.hitpoints}
								onChange={handleChangeHitpoints}
							/>
						</div>
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
