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

const Actions = ({ monster, handleRollDice, conditions, setConditions }) => {
	const [playSfx] = useSound(diceSfx);
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
							onClick={() => {
								playSfx();
								handleRollDice(20, 1, action.hit_modifier);
							}}
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
								// rollDamage(action);
							}}
						>
							<GiMineExplosion /> {action.damage_dice_text}
						</button>
					</>
				) : (
					<button
						id="addStatusBtn"
						className="action-btn btn btn-outline-secondary btn-sm ms-1"
						onClick={() => {
							if (
								action.action_target === 'self' &&
								!conditions.includes(action.condition)
							) {
								// set this monsters current status as action.condition
								setConditions([
									...conditions,
									action.condition,
								]);

								console.log('conditions with push', conditions);
							}
							console.log(action);
						}}
					>
						<GiTwirlCenter /> Add Status
					</button>
				)}
			</div>
		</div>
	));
};

export default Actions;
