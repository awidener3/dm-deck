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

	const handleToHit = (action) => {
		// if (conditions.includes('invisible')) {
		// 	setConditions(
		// 		conditions.filter((condition) => condition !== 'invisible')
		// 	);
		// 	setIsConcentrating(false);
		// }
		playSfx();
		handleRollDice(20, 1, action.hit_modifier);
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
			key={action.weapon}
			className="d-flex justify-content-between align-items-center mb-2"
		>
			<p className="action-title m-0">
				{action.action_type === 'melee' ? (
					<GiBattleAxe />
				) : action.action_type === 'ranged' ? (
					<GiPocketBow className="ranged-icon me-1" />
				) : (
					<GiTwirlCenter />
				)}{' '}
				{action.weapon}
			</p>
			<div>
				{action.action_type === 'melee' ||
				action.action_type === 'ranged' ? (
					<>
						<button
							id="toHitBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
							onClick={() => handleToHit(action)}
						>
							<GiPointySword /> +{action.hit_modifier}
						</button>
						<button
							id="getDamageBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
							onClick={() => {
								playSfx();
								handleRollDice(
									action.damage_die,
									action.damage_die_num,
									action.damage_modifier
								);
							}}
						>
							<GiMineExplosion /> {action.damage_dice_text}
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
