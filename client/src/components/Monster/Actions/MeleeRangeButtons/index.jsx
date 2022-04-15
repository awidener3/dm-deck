import { useState } from 'react';
import { GiMineExplosion, GiPointySword } from 'react-icons/gi';

const MeleeRangeButtons = ({ action, handleToHit, handleDealDamage }) => {
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
