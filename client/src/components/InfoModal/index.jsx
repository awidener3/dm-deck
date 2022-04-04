import { Modal } from 'react-bootstrap';
import { GiBookCover } from 'react-icons/gi';

const InfoModal = ({ info, showInfoModal, handleCloseInfoModal }) => {
	return (
		<Modal
			size="sm"
			show={showInfoModal}
			onHide={handleCloseInfoModal}
			centered
		>
			<Modal.Header closeButton>
				<GiBookCover size="2rem" />
			</Modal.Header>
			<div className="d-flex flex-column justify-content-center">
				<Modal.Body>
					{info.actions
						? info.actions.map((action) => (
								<p key={action.weapon}>
									<span className="info-modal-action">
										{action.weapon}
									</span>
									. {action.action_text}
								</p>
						  ))
						: null}
				</Modal.Body>
			</div>
		</Modal>
	);
};

export default InfoModal;
