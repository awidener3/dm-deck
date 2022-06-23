import { Link } from 'react-router-dom';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
import { Form } from 'react-bootstrap';

import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

const Card = ({ battle, startDrag = null, handleDeleteBattle = null }) => {
	return (
		<div
			key={battle._id}
			className="p-2"
			draggable="true"
			onDragStart={(e) => startDrag(e, battle._id)}
		>
			<div className="card battle-card p-3">
				<h2 className="battle-card-title text-center">{battle.name}</h2>

				<hr />

				<div className="card-body">
					<Summary battle={battle} />

					{/* Initiative Roll */}
					<Form>
						<Form.Check
							type="switch"
							label="Auto-roll Initiative"
							defaultChecked={true}
						/>
					</Form>

					<SummaryAccordion battle={battle} />
				</div>

				{/* Buttons */}
				<div className="button-container mt-auto d-flex justify-content-center">
					<button
						className="btn btn-outline-danger m-1"
						title="Delete Battle"
						onClick={() => handleDeleteBattle(battle)}
					>
						<FiTrash2 size={'1.5rem'} />
					</button>
					<Link
						className="btn btn-outline-secondary disabled m-1"
						title="Edit Card"
						to={`/battles/${battle._id}`}
					>
						<RiEditLine size={'1.5rem'} />
					</Link>
					<Link
						className="btn btn-outline-primary m-1"
						title="Start Battle"
						to={`/battles/${battle._id}`}
					>
						<RiSwordFill size={'1.5rem'} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
