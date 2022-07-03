import { Link } from 'react-router-dom';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
import Summary from './Summary';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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

					<div className="d-flex justify-content-around border-top pt-2">
						<div>
							<h3 className="list-title">Characters</h3>
							<ListGroup variant="flush" className="summary-list">
								{battle.heroes.map((hero, i) => (
									<ListGroupItem
										key={i}
										className="list-item"
									>
										{hero.character_name}
									</ListGroupItem>
								))}
							</ListGroup>
						</div>
						<div>
							<h3 className="list-title">Monsters</h3>
							<ListGroup variant="flush" className="summary-list">
								{battle.monsters.map((monster, i) => (
									<ListGroupItem
										key={i}
										className="list-item"
									>
										{monster.name}
									</ListGroupItem>
								))}
							</ListGroup>
						</div>
					</div>
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
