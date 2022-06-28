import { Link } from 'react-router-dom';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

const Card = ({ battle, startDrag = null, handleDeleteBattle, draggable }) => {
	return (
		<div
			key={battle._id}
			className="p-2"
			draggable={draggable}
			onDragStart={(e) => startDrag(e, battle._id)}
		>
			<div className="card battle-card p-3">
				<h2 className="battle-card-title text-center mb-1 border-bottom">
					{battle.name}
				</h2>

				<div className="card-body">
					<Summary battle={battle} />

					<SummaryAccordion battle={battle} />
				</div>

				{/* Buttons */}
				<div className="button-container mt-auto d-flex justify-content-center">
					<button
						className="card-btn btn btn-outline-danger m-1"
						title="Delete Battle"
						onClick={() => handleDeleteBattle(battle)}
					>
						<FiTrash2 size={20} />
					</button>
					<Link
						className="card-btn btn btn-outline-secondary disabled m-1"
						title="Edit Card"
						to={`/battle/${battle._id}`}
					>
						<RiEditLine size={20} />
					</Link>
					<Link
						className="card-btn btn btn-outline-primary m-1"
						title="Start Battle"
						to={`/battle/${battle._id}`}
					>
						<RiSwordFill size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
