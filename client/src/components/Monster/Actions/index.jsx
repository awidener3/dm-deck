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

// Temporary damage functionality in console
const rollDamage = ({ damage_die, damage_die_num, damage_modifier }) => {
	console.log(
		Math.floor(Math.random() * damage_die) * damage_die_num +
			damage_modifier
	);
};

const Actions = ({ monster, handleRollToHit }) => {
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
								handleRollToHit(action.hit_modifier);
							}}
						>
							<GiPointySword /> +{action.hit_modifier}
						</button>
						<button
							id="getDamageBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
							onClick={() => rollDamage(action)}
						>
							<GiMineExplosion /> {action.damage_dice_text}
						</button>
					</>
				) : (
					<button
						id="addStatusBtn"
						className="action-btn btn btn-outline-secondary btn-sm ms-1"
						onClick={() => console.log(action)}
					>
						<GiTwirlCenter /> Add Status
					</button>
				)}
			</div>
		</div>
	));
};

export default Actions;
