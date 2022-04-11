import { RiHeartFill, RiShieldFill } from 'react-icons/ri';

const QuickView = ({ sortedData, turn, setTurn, setIndex }) => {
	return (
		<>
			{sortedData.map((creature, index) => (
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
					<h5 className="m-0">
						{creature.name || creature.character_name}
					</h5>
					<div className="d-flex justify-content-center">
						<p className="mb-0 me-1">
							<RiHeartFill className="hp-icon" />{' '}
							{creature.hitpoints}
						</p>
						<p className="mb-0 ms-1">
							<RiShieldFill className="ac-icon" />{' '}
							{creature.armor_class}
						</p>
					</div>
				</div>
			))}
		</>
	);
};

export default QuickView;
