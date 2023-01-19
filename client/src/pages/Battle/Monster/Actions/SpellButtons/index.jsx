import { GiMineExplosion } from 'react-icons/gi';
import './spellButton.scss';

const SpellButtons = ({ action, handleDealDamage }) => {
	return (
		<div className="d-flex">
			{action.saving_throw ? (
				<p className="saving-throw-text">{action.saving_throw}</p>
			) : null}

			<button
				className="action-btn btn btn-outline-secondary card-btn btn-sm ms-1"
				onClick={() => handleDealDamage(action)}
			>
				<GiMineExplosion />{' '}
				{`${action.damage.damage_dice_text || ''} +${
					action.damage.damage_dice_bonus || 0
				}`}
			</button>
		</div>
	);
};
export default SpellButtons;
