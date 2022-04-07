import { Modal } from 'react-bootstrap';
import { GiGoblinHead } from 'react-icons/gi';

const MonstersModal = ({
	showMonstersModal,
	handleCloseMonstersModal,
	monsterData,
}) => {
	return (
		<Modal
			className="d-flex justify-content-center"
			show={showMonstersModal}
			onHide={handleCloseMonstersModal}
			centered
		>
			<Modal.Header closeButton>
				<GiGoblinHead size="2rem" />
			</Modal.Header>
			<div className="d-flex flex-column justify-content-center text-center">
				<Modal.Title className="display-3">Monsters</Modal.Title>
				<Modal.Body>Monster data goes here...</Modal.Body>
			</div>
		</Modal>
	);
};

export default MonstersModal;
