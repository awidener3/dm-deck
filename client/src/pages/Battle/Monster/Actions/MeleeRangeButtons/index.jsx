import { GiMineExplosion, GiPointySword } from 'react-icons/gi';

const MeleeRangeButtons = ({ action, handleToHit, handleDealDamage }) => {
	return (
		<>
			<button
				className="action-btn btn btn-outline-secondary card-btn btn-sm ms-1"
				onClick={() => handleToHit(action.attack_bonus || 0)}
			>
				<GiPointySword /> +{action.attack_bonus || 0}
			</button>
			<button
				className="action-btn btn btn-outline-secondary card-btn btn-sm ms-1"
				onClick={() => handleDealDamage(action)}
			>
				<GiMineExplosion />{' '}
				{`${action.damage.damage_dice_text || ''} +${
					action.damage.damage_dice_bonus || 0
				}`}
			</button>
		</>
	);
};

export default MeleeRangeButtons;
