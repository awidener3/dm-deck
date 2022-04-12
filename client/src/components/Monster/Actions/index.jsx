import React from 'react';
import {
	GiMineExplosion,
	GiPointySword,
	GiPocketBow,
	GiBattleAxe,
	GiTwirlCenter,
} from 'react-icons/gi';
import useSound from 'use-sound';
import diceSfx from '../../../assets/audio/dice-roll.mp3';

const Actions = ({
	monster,
	handleRollDice,
	sortedData,
	setSortedData,
	// isConcentrating,
	// setIsConcentrating,
}) => {
	const [playSfx] = useSound(diceSfx);

	const handleToHit = (attack_bonus) => {
		// if (conditions.includes('invisible')) {
		// 	setConditions(
		// 		conditions.filter((condition) => condition !== 'invisible')
		// 	);
		// 	setIsConcentrating(false);
		// }
		playSfx();
		handleRollDice(20, 1, attack_bonus);
	};

	const handleAddDamage = (action) => {
		let damage_dice = 0;
		let damage_die_num = 0;

		if (action.damage_dice) {
			const dice = action.damage_dice.split('d');
			damage_dice = Number(dice[1]);
			damage_die_num = Number(dice[0]);
		} else {
			damage_dice = 0;
			damage_die_num = 0;
		}
		let damage_modifier = action.damage_bonus;
		handleRollDice(damage_dice, damage_die_num, damage_modifier);
	};

	const handleConditions = ({ action_target, condition }) => {
		// check if the target is self + isn't currently active
		if (
			action_target === 'self' &&
			!monster.conditions.includes(condition)
		) {
			let updatedArray = sortedData.map((creature) => {
				if (creature.name === monster.name) {
					return {
						...monster,
						conditions: [...monster.conditions, condition],
					};
				}
				return creature;
			});

			setSortedData([...updatedArray]);
		}
		// otherwise, select a creature to apply the effect to
	};

	return monster.actions.map((action) => (
		<div
			key={action.name}
			className="d-flex justify-content-between align-items-center mb-2"
		>
			<p className="action-title m-0">
				{action.desc.startsWith('Melee') ? (
					<GiBattleAxe />
				) : action.desc.startsWith('Ranged') ? (
					<GiPocketBow className="ranged-icon me-1" />
				) : (
					<GiTwirlCenter />
				)}{' '}
				{action.name}
			</p>
			<div>
				{action.desc.startsWith('Melee') ||
				action.desc.startsWith('Ranged') ? (
					<>
						<button
							id="toHitBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
							onClick={() =>
								handleToHit(action.attack_bonus || 0)
							}
						>
							<GiPointySword /> +{action.attack_bonus || 0}
						</button>
						<button
							id="getDamageBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
							onClick={() => {
								playSfx();
								handleAddDamage(action);
							}}
						>
							<GiMineExplosion />{' '}
							{`${action.damage_dice || ''} +${
								action.damage_bonus
							}`}
						</button>
					</>
				) : (
					<button
						id="addStatusBtn"
						className="action-btn btn btn-outline-secondary btn-sm ms-1"
						onClick={() => handleConditions(action)}
					>
						<GiTwirlCenter /> Add Status
					</button>
				)}
			</div>
		</div>
	));
};

export default Actions;
