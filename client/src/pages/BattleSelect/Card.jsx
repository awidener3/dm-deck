import { Link, useNavigate } from 'react-router-dom';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
import Summary from './Summary';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Card = ({ battle, startDrag = null, handleDeleteBattle, draggable }) => {
	let navigate = useNavigate();

	const handleClick = (e) => {
		navigate(`/battle/${battle._id}`);
	};

	const CreatureList = ({ type }) => {
		return (
			<section className="creature-list">
				<h3 className="creature-list-title">
					{type === 'heroes' ? 'Characters' : 'Monsters'}
				</h3>
				<ListGroup variant="flush" className="summary-list">
					{battle[type].map((creature, i) => (
						<ListGroupItem key={i} className="list-item">
							{creature?.character_name || creature.name}
						</ListGroupItem>
					))}
				</ListGroup>
			</section>
		);
	};

	return (
		<figure
			key={battle._id}
			className="p-2"
			draggable={draggable}
			onDragStart={(e) => startDrag(e, battle._id)}
		>
			<section className="card battle-card p-3">
				<div className="card-content" onClick={handleClick}>
					<h2 className="battle-card-title text-center mb-1 border-bottom">
						{battle.name}
					</h2>

					<div className="card-body">
						<Summary battle={battle} />

						<div className="creature-container">
							<CreatureList type={'heroes'} />
							<CreatureList type={'monsters'} />
						</div>
					</div>
				</div>

				{/* Buttons */}
				<section className="button-container mt-auto d-flex justify-content-between">
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
				</section>
			</section>
		</figure>
	);
};

export default Card;
