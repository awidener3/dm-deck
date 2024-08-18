import { Modal, ModalBody, Button } from 'react-bootstrap';
import useLocalStorage from 'use-local-storage';

const WarningModal = ({ showWarning, hideWarning, handleDelete, thing }) => {
	const [theme] = useLocalStorage('theme');

	return (
		<Modal
			size="md"
			show={showWarning}
			onHide={hideWarning}
			centered
			data-theme={theme === 'dark' ? 'dark' : 'light'}
		>
			<ModalBody>
				<h1 className="text-center pb-2 border-bottom">Warning!</h1>
				<p>
					You are about to banish <b>{thing.character_name}</b> out of
					the Material Plane! Are you sure you want to permanently
					delete <b>{thing.character_name}</b>?
				</p>
				<div className="buttons d-flex justify-content-around">
					<Button variant="danger" onClick={hideWarning}>
						Nevermind...
					</Button>
					<Button
						variant="outline-success"
						onClick={() => handleDelete(thing)}
					>
						Yes, I'm sure!
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default WarningModal;
