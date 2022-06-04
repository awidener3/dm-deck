import { Modal } from 'react-bootstrap';
import { FaDiceD20 } from 'react-icons/fa';
import './rollModal.scss';

const RollModal = ({
	showRollModal,
	handleCloseRollModal,
	die,
	rollModifier,
}) => {
	return (
		<Modal
			dialogClassName="roll-modal"
			className="d-flex justify-content-center"
			size="sm"
			show={showRollModal}
			onHide={handleCloseRollModal}
			centered
		>
			<Modal.Header closeButton>
				<FaDiceD20 size="2rem" />
			</Modal.Header>
			<div className="d-flex flex-column justify-content-center text-center">
				<Modal.Title className="display-3">
					{die + rollModifier}
				</Modal.Title>
				<Modal.Body>
					{die} + {rollModifier}
				</Modal.Body>
			</div>
		</Modal>
	);
};

export default RollModal;
