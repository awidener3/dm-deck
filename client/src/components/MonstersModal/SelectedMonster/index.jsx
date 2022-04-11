import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { rollDie } from '../../../utils/diceRolls';
import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import AbilityOption from './AbilityOption';
import Conditions from '../../Monster/Conditions';
import './selectedMonster.scss';

const SelectedMonster = ({
	monster,
	setSelectedMonster,
	// monsterArray,
	// setMonsterData,
	sortedData,
	setSortedData,
	handleCloseMonstersModal,
}) => {
	const [startingHitpoints] = useState(monster.hitpoints);
	const [modifier, setModifier] = useState(0);
	const [condition, setCondition] = useState('');
	const [monsterConditions, setMonsterConditions] = useState(
		monster.conditions
	);
	const [savingThrowResult, setSavingThrowResult] = useState(0);

	useEffect(() => {
		setCondition(monster.conditions);
	}, [monster.conditions]);

	// Saving Throw
	const changeModifier = (e) => {
		let updatedModifier = getModifier(e.target.value);
		setModifier(updatedModifier);
	};

	const getModifier = (ability) => {
		return Math.floor((monster.ability_scores[`${ability}`] - 10) / 2);
	};

	const renderOptions = () => {
		const abilityArray = [
			['STR', 'strength'],
			['DEX', 'dexterity'],
			['CON', 'constitution'],
			['INT', 'intelligence'],
			['WIS', 'wisdom'],
			['CHA', 'charisma'],
		];

		return (
			<>
				{abilityArray.map((ability, index) => (
					<AbilityOption
						key={abilityArray[index][1]}
						monster={monster}
						short={abilityArray[index][0]}
						long={abilityArray[index][1]}
					/>
				))}
			</>
		);
	};

	const handleRollSavingThrow = () => {
		const d20 = rollDie(20);
		const result = d20 + Number(modifier);
		setSavingThrowResult(result);
	};

	// Conditions
	const changeCondition = (e) => {
		setCondition(e.target.value);
	};

	const handleAddCondition = (e) => {
		// const updatedArray = monsterArray.slice();
		const updatedArray = sortedData.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.conditions.push(condition);
			}
		});
		// setMonsterData([...updatedArray]);
		setSortedData([...updatedArray]);
	};

	// Hitpoints
	const handleChangeHitpoints = (e) => {
		// const updatedArray = monsterArray.slice();
		const updatedArray = sortedData.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hitpoints = e.target.value;
			}
		});
		// setMonsterData([...updatedArray]);
		setSortedData([...updatedArray]);
	};

	return (
		<div>
			<Modal.Title className="text-center">
				<h1 className="m-0">{monster.name}</h1>
			</Modal.Title>
			<Modal.Body className="w-75 m-auto pt-0">
				<Conditions
					monster={monster}
					conditions={monsterConditions}
					setCondition={setMonsterConditions}
				/>
				<div>
					<div
						id="monster-stats"
						className="d-flex justify-content-center"
					>
						<p
							className="mx-2"
							title={`Hitpoints: ${startingHitpoints}`}
						>
							<RiHeartFill className="hp-icon" size={'2rem'} />{' '}
							{startingHitpoints}
						</p>
						<p
							className="mx-2"
							title={`Armor Class: ${monster.armor_class}`}
						>
							<RiShieldFill className="ac-icon" size={'2rem'} />{' '}
							{monster.armor_class}
						</p>
					</div>
					<div className="d-flex flex-column">
						{/* SAVING THROWS */}
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
								{renderOptions()}
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

						{/* CONDITIONS */}
						<h5>Add Condition(s)</h5>
						<div className="input-group mb-2">
							<select
								className="form-select"
								name="conditions"
								id="conditions"
								onChange={changeCondition}
							>
								<option defaultValue="">
									Select a Condition
								</option>
								<option value="blind">Blinded</option>
								<option value="charmed">Charmed</option>
								<option value="deafened">Defeaned</option>
								<option value="frightened">Frightened</option>
								<option value="grappled">Grappled</option>
								<option value="incapacitated">
									Incapacitated
								</option>
								<option value="invisible">Invisible</option>
								<option value="paralyzed">Paralyzed</option>
								<option value="petrified">Petrified</option>
								<option value="poisoned">Poisoned</option>
								<option value="prone">Prone</option>
								<option value="restrained">Restrained</option>
								<option value="stunned">Stunned</option>
								<option value="unconcious">Unconscious</option>
							</select>
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={handleAddCondition}
							>
								Add
							</button>
						</div>

						{/* HP */}
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
