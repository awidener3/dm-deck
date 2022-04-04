import { Modal } from 'react-bootstrap';
import { FaDiceD20 } from 'react-icons/fa';

const RollModal = ({
	showRollModal,
	handleCloseRollModal,
	d20,
	rollModifier,
}) => {
	return (
		<Modal
			size="sm"
			show={showRollModal}
			onHide={handleCloseRollModal}
			centered
		>
			<Modal.Header closeButton>
				<FaDiceD20 size="2rem" />
			</Modal.Header>
			<div className="d-flex flex-column justify-content-center text-center">
				<Modal.Title className="display-5">
					{d20 + rollModifier}
				</Modal.Title>
				<Modal.Body>
					{d20} + {rollModifier}
				</Modal.Body>
			</div>
		</Modal>
	);
};

export default RollModal;
