import React, { useState } from 'react';
import { GiPocketBow, GiBattleAxe, GiTwirlCenter } from 'react-icons/gi';
import useSound from 'use-sound';
import diceSfx from '../../../assets/audio/dice-roll.mp3';
import MeleeRangeButtons from './MeleeRangeButtons';

const Actions = ({ monster, handleRollDice, sortedData, setSortedData }) => {
	const [playSfx] = useSound(diceSfx);

	// acid, bludgeoning, cold, fire, force, lightning, necrotic, piercing, poison, psychic, radiant, slashing, thunder

	const processActions = (actions) => {
		let newActions = [];

		actions.map((action) => {
			let newAction = {
				desc: action.desc,
				attack_bonus: action.attack_bonus,
			};
			// name + extra description
			if (action.name.match(/\(([^\)]*)\)/)) {
				let nameExtra = action.name.match(/\(([^\)]*)\)/);
				newAction.name = action.name.replace(nameExtra[0], '').trim();
				newAction.nameSubtext = nameExtra[0];
			} else {
				newAction.name = action.name;
			}

			// attack type
			if (action.desc.includes('Melee or Ranged Weapon Attack')) {
				newAction.attack_type = 'Melee or Ranged';
			} else if (action.desc.includes('Melee Weapon Attack')) {
				newAction.attack_type = 'Melee';
			} else if (action.desc.includes('Ranged Weapon Attack')) {
				let strArr = action.desc.split(' ');
				newAction.range = strArr[strArr.indexOf('range') + 1];
				newAction.attack_type = 'Ranged';
			} else {
				console.log('other');
			}

			// damage + bonus damage
			if (action.damage_dice) {
				if (action.damage_dice.includes('+')) {
					let dice = action.damage_dice.split('+');
					const damageDice = dice[0].split('d');
					const bonusDice = dice[1].split('d');
					newAction.damage = {
						damageNum: Number(damageDice[1]),
						damageSides: Number(damageDice[0]),
						damageBonus: action.damage_bonus,
						damageText: dice[0],
					};
					newAction.bonus_damage = {
						bonusNum: Number(bonusDice[1]),
						bonusSides: Number(bonusDice[0]),
						bonusText: dice[1],
					};
				} else if (action.damage_dice) {
					const damageDice = action.damage_dice.split('d');
					newAction.damage = {
						damageNum: Number(damageDice[1]),
						damageSides: Number(damageDice[0]),
						damageText: action.damage_dice,
					};
				}
			}

			console.log(action.name, 'original', action, 'updated', newAction);
			newActions.push(newAction);
		});
		return newActions;
	};

	const [actions, setActions] = useState(() =>
		processActions(monster.actions)
	);

	// d20 + attack bonus
	const handleToHit = (attack_bonus) => {
		playSfx();
		handleRollDice(20, 1, attack_bonus);
	};

	// damage dice * dice num + damage bonus
	const handleDealDamage = (action) => {
		playSfx();
		// [# of dice, # of sides] 2d6
		let damageDiceSides = 0;
		let damageDiceNum = 0;
		let bonusDiceSides = 0;
		let bonusDiceNum = 0;

		if (action.damage_dice.includes('+')) {
			let dice = action.damage_dice.split('+');
			const damageDice = dice[0].split('d');
			const bonusDice = dice[1].split('d');
			damageDiceSides = Number(damageDice[1]);
			damageDiceNum = Number(damageDice[0]);

			console.log(dice, damageDice, bonusDice);
		} else if (action.damage_dice) {
			const damageDice = action.damage_dice.split('d');
			damageDiceSides = Number(damageDice[1]);
			damageDiceNum = Number(damageDice[0]);
		} else {
			damageDiceSides = 0;
			damageDiceNum = 0;
		}
		let damage_modifier = action.damage_bonus || 0;
		handleRollDice(damageDiceSides, damageDiceNum, damage_modifier);
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

	return actions.map((action) => (
		<div
			key={action.name}
			className="d-flex justify-content-between align-items-center mb-2"
		>
			<p className="action-title m-0">
				{action.attack_type === 'Melee' ? (
					<GiBattleAxe />
				) : action.attack_type === 'Ranged' ? (
					<GiPocketBow className="ranged-icon me-1" />
				) : (
					<GiTwirlCenter />
				)}{' '}
				{action.name}
			</p>
			<div>
				{action.attack_type === 'Melee' ||
				action.attack_type === 'Ranged' ||
				action.damage_dice ? (
					<MeleeRangeButtons
						action={action}
						handleToHit={handleToHit}
						handleDealDamage={handleDealDamage}
					/>
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
