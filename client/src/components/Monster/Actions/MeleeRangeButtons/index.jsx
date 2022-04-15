import { useState } from 'react';
import { GiMineExplosion, GiPointySword } from 'react-icons/gi';

const MeleeRangeButtons = ({ action, handleToHit, handleDealDamage }) => {
	const getDice = (action) => {
		let diceObj = {
			name: action.name,
		};

		if (action.damage_dice.includes('+')) {
			let dice = action.damage_dice.split('+');
			const damageDice = dice[0].split('d');
			const bonusDice = dice[1].split('d');
			diceObj.damageNum = Number(damageDice[1]);
			diceObj.damageSides = Number(damageDice[0]);
			diceObj.bonusNum = Number(bonusDice[1]);
			diceObj.bonusSides = Number(bonusDice[0]);
		} else if (action.damage_dice) {
			const damageDice = action.damage_dice.split('d');
			diceObj.damageNum = Number(damageDice[1]);
			diceObj.damageSides = Number(damageDice[0]);
		}
	};

	const [actionDice, setActionDice] = useState(() => getDice(action));

	getDice(action);

	return (
		<>
			<button
				className="action-btn btn btn-outline-secondary btn-sm ms-1"
				onClick={() => handleToHit(action.attack_bonus || 0)}
			>
				<GiPointySword /> +{action.attack_bonus || 0}
			</button>
			<button
				className="action-btn btn btn-outline-secondary btn-sm ms-1"
				onClick={() => handleDealDamage(action)}
			>
				<GiMineExplosion />{' '}
				{`${action.damage_dice || ''} +${action.damage_bonus || 0}`}
			</button>
		</>
	);
};

export default MeleeRangeButtons;
