import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import './quickView.scss';

const QuickView = ({ battleOrder, turn, setTurn, setIndex }) => {
	const getConditions = (creature) => {
		if (
			creature.conditions !== undefined &&
			creature.conditions.length > 0
		) {
			return (
				<>
					{creature.conditions.map((condition) => (
						<div
							key={condition}
							className={`condition-marker ${condition}`}
						></div>
					))}
				</>
			);
		}
		return null;
	};

	return (
		<div className="monster-data">
			{battleOrder.map((creature, index) => (
				<div
					className={
						turn === index + 1
							? `monster-data-card text-center current`
							: `monster-data-card text-center`
					}
					key={index}
					onClick={() => {
						setIndex(index);
						setTurn(index + 1);
					}}
				>
					<div className="d-flex justify-content-center">
						<p className="d-flex align-items-center mb-0 me-1">
							<RiHeartFill className="hp-icon" />{' '}
							{creature.hit_points}
						</p>
						<p className="d-flex align-items-center mb-0 ms-1">
							<RiShieldFill className="ac-icon" />{' '}
							{creature.armor_class}
						</p>
					</div>
					<h5 className="m-0">
						{creature.name || creature.character_name}
					</h5>
					<div className="condition-markers">
						{getConditions(creature)}
					</div>
				</div>
			))}
		</div>
	);
};

export default QuickView;
