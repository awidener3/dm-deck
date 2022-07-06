import { Modal, ModalTitle, ModalBody, Button } from 'react-bootstrap';
import './battle.scss';

const InitiativeModal = ({
	showInitiativeModal,
	handleCloseInitiativeModal,
	battle,
}) => {
	console.log(battle);
	return (
		<Modal
			size="sm"
			show={showInitiativeModal}
			// onHide={handleCloseInitiativeModal}
			centered
		>
			<ModalTitle></ModalTitle>
			<ModalBody className="d-flex flex-column">
				<h3>Set Initiative</h3>
				<p>Any blanks fields will be randomly rolled.</p>

				<section className="d-flex justify-content-around">
					<div className="flex-grow-1">
						<h4>Characters</h4>
						{battle.heroes.map((hero) => (
							<div className="d-flex">
								<input
									key={hero._id}
									type="number"
									className="initiative-input"
									placeholder="?"
								/>
								<p className="initiative-name">
									{hero.character_name}
								</p>
							</div>
						))}
					</div>

					<div className="flex-grow-1">
						<h4>Monsters</h4>
						{battle.monsters.map((monster) => (
							<div className="d-flex">
								<input
									type="number"
									className="initiative-input"
									placeholder="?"
								/>
								<p className="initiative-name">
									{monster.name}
								</p>
							</div>
						))}
					</div>
				</section>

				<Button
					variant="outline-success"
					onClick={handleCloseInitiativeModal}
				>
					Set!
				</Button>
			</ModalBody>
		</Modal>
	);
};

export default InitiativeModal;
