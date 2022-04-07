import { Modal } from 'react-bootstrap';

const SelectedMonster = ({ monster, setSelectedMonster }) => {
	return (
		<div>
			<Modal.Title className="text-center">{monster.name}</Modal.Title>
			<Modal.Body>
				<div className="monster-btns d-flex flex-column">
					{monster.name}
				</div>

				<div className="d-flex justify-content-center">
					{/* Button to return back to monster select */}
					<button
						className="btn btn-outline-secondary m-1"
						onClick={() => setSelectedMonster('')}
					>
						&lt; Back
					</button>

					{/* Apply damage */}
					<button className="btn btn-outline-secondary m-1">
						Apply
					</button>
				</div>
			</Modal.Body>
		</div>
	);
};

export default SelectedMonster;
