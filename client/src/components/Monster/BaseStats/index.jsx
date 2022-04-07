import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import { FaArrowCircleRight } from 'react-icons/fa';

const BaseStats = ({ monster }) => {
	return (
		<div className="dmd-card-row d-flex justify-content-between align-items-center pb-2 border-bottom">
			<div className="d-flex align-items-center">
				<RiHeartFill className="dmd-card-icon hp-icon me-1" />
				<p className="stat-title m-0">
					HP{' '}
					<span>
						{monster.hitpoints} ({monster.hitpoint_dice})
					</span>
				</p>
			</div>
			<div className="d-flex align-items-center">
				<RiShieldFill className="dmd-card-icon ac-icon me-1" />
				<p className="stat-title m-0">
					AC <span>{monster.armor_class}</span>
				</p>
			</div>
			<div className="d-flex align-items-center">
				<FaArrowCircleRight className="dmd-card-icon speed-icon me-1" />
				<p
					title={`Walking: ${monster.speed.walking} ft., Flying: ${
						monster.speed.flying
					}, Swimming: ${
						monster.speed.swimming || monster.speed.walking / 2
					} ft.`}
					className="stat-title m-0"
				>
					SPD <span>{monster.speed.walking} ft.</span>
				</p>
			</div>
		</div>
	);
};

export default BaseStats;
