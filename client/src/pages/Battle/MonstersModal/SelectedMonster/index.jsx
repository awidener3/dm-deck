import { useState } from 'react';
import { ModalTitle, ModalBody, Button } from 'react-bootstrap';
import { rollDie } from 'utils/diceRolls';
import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import AbilityOption from './AbilityOption';
import Conditions from '../../Monster/Conditions';
import './selectedMonster.scss';

const SelectedMonster = ({
	monster,
	setSelectedMonster,
	battleOrder,
	setbattleOrder,
	handleCloseMonstersModal,
}) => {
	const [hpModifier, setHpModifier] = useState('');
	const [modifier, setModifier] = useState(0);
	const [condition, setCondition] = useState('');
	const [savingThrowResult, setSavingThrowResult] = useState(0);

	// Saving Throw
	const changeModifier = (e) => {
		let updatedModifier = getModifier(e.target.value);
		setModifier(updatedModifier);
	};

	const getModifier = (ability) => {
		return Math.floor((monster[`${ability}`] - 10) / 2);
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
		const updatedArray = battleOrder.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.conditions.push(condition);
			}
		});
		setbattleOrder([...updatedArray]);
	};

	// Hitpoints
	const handleChangeHitpoints = (e) => {
		const updatedArray = battleOrder.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hit_points = e.target.value;
			}
		});
		setbattleOrder([...updatedArray]);
	};

	const handleAddHp = () => {
		const updatedArray = battleOrder.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hit_points = Number(item.hit_points) + Number(hpModifier);
			}
		});
		setbattleOrder([...updatedArray]);
	};

	const handleSubtractHp = () => {
		const updatedArray = battleOrder.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hit_points = Number(item.hit_points) - Number(hpModifier);
			}
		});
		setbattleOrder([...updatedArray]);
	};

	return (
		<>
			<ModalTitle className="text-center">
				<h1>{monster.name}</h1>
			</ModalTitle>
			<ModalBody className="w-75 m-auto pt-0">
				<Conditions
					monster={monster}
					battleOrder={battleOrder}
					setbattleOrder={setbattleOrder}
				/>
				{/* FIRST ROW */}
				<section className="d-flex justify-content-around">
					<div className="hp-adjust-container d-flex flex-column mx-auto">
						<Button
							variant="success"
							size="sm"
							onClick={handleAddHp}
						>
							Heal
						</Button>
						<input
							type="number"
							className="number-input"
							name="hitpoints"
							id="hitpoints"
							min={0}
							pattern="[0-9]*"
							placeholder="0"
							inputMode="numeric"
							p
							value={hpModifier}
							onChange={(e) => setHpModifier(e.target.value)}
						/>
						<Button
							variant="danger"
							size="sm"
							onClick={handleSubtractHp}
						>
							Damage
						</Button>
					</div>
					<div
						id="monster-stats"
						className="d-flex flex-column justify-content-center"
					>
						<p>
							<RiHeartFill className="hp-icon" size="2.5rem" />{' '}
							{monster.hit_points}
						</p>
						<p>
							<RiShieldFill className="ac-icon" size="2.5rem" />{' '}
							{monster.armor_class}
						</p>
					</div>
				</section>

				{/* SECOND ROW */}
				<section className="d-flex flex-column">
					{/* SAVING THROWS */}
					<h5>Roll Saving Throw</h5>
					{monster.saving_throw_bonus ? (
						<p className="saving-throw-bonus">
							{monster.saving_throw_bonus}
						</p>
					) : null}
					<div className="input-group mb-2">
						<select
							className="form-select"
							name="saving-throws"
							id="saving-throws"
							onChange={changeModifier}
						>
							<option defaultValue="true">
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
							<option defaultValue="">Select a Condition</option>
							<option value="blind">Blinded</option>
							<option value="charmed">Charmed</option>
							<option value="deafened">Defeaned</option>
							<option value="frightened">Frightened</option>
							<option value="grappled">Grappled</option>
							<option value="incapacitated">Incapacitated</option>
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
				</section>

				{/* BUTTONS */}
				<section className="d-flex justify-content-center mt-2">
					<Button
						variant="outline"
						className="card-btn m-1"
						onClick={() => setSelectedMonster('')}
					>
						Back
					</Button>
					<Button
						variant="outline"
						className="card-btn m-1"
						onClick={() => {
							setSelectedMonster('');
							handleCloseMonstersModal();
						}}
					>
						Apply
					</Button>
				</section>
			</ModalBody>
		</>
	);
};

export default SelectedMonster;
