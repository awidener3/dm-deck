import { Modal, ModalTitle, ModalBody, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getInitiative } from 'utils/diceRolls';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './battle.scss';

const InitiativeModal = ({
	showInitiativeModal,
	handleCloseInitiativeModal,
	battle,
	setBattle,
	setbattleOrder,
}) => {
	const navigate = useNavigate();

	const handleAddInitiative = (value, type, index) => {
		if (type === 'hero') {
			const clone = JSON.parse(JSON.stringify(battle));
			clone.heroes[index]['initiative'] = Number(value);
			setBattle(clone);
		} else {
			const clone = JSON.parse(JSON.stringify(battle));
			clone.monsters[index]['initiative'] = Number(value);
			setBattle(clone);
		}
	};

	const handleClose = () => {
		const clone = JSON.parse(JSON.stringify(battle));
		clone.monsters = clone.monsters.map((monster) => {
			return { ...monster, conditions: [] }; // Add 'conditions' to monsters
		});

		const combined = clone.heroes.concat(clone.monsters); // Combine into single array

		const order = combined.map((combatant) => {
			if (!combatant?.initiative) {
				console.log('⌛ Adding initiative...');
				return { ...combatant, initiative: getInitiative(combatant) }; // Add initiative
			} else {
				console.log('✅ Initiative detected!');
				return combatant;
			}
		});

		const sorted = order.sort((a, b) =>
			a.initiative < b.initiative ? 1 : -1
		);
		console.log('🏆 Initiative processed & sorted!\n', sorted);
		setbattleOrder(sorted);
		handleCloseInitiativeModal();
	};

	return (
		<Modal size="sm" show={showInitiativeModal} centered>
			<ModalTitle className="ms-2 mt-2 p-0 d-flex align-items-center">
				<Button
					variant="outline-secondary"
					onClick={() => navigate(-1)}
				>
					<IoMdArrowRoundBack size="1.5rem" /> Back
				</Button>
			</ModalTitle>
			<ModalBody className="d-flex flex-column">
				<h3 className="text-center display-5 m-0">Set Initiative</h3>
				<p className="text-center mb-2">
					Any blanks fields will be randomly rolled.
				</p>

				<section className="d-flex justify-content-around">
					<div className="flex-grow-1">
						<h4>Characters</h4>
						{battle.heroes &&
							battle.heroes.map((hero, index) => (
								<div className="d-flex" key={index}>
									<input
										key={hero._id}
										type="number"
										className="initiative-input"
										min={0}
										max={75}
										pattern="[0-9]*"
										inputMode="numeric"
										placeholder="?"
										onChange={(e) =>
											handleAddInitiative(
												e.target.value,
												'hero',
												index
											)
										}
									/>
									<p className="initiative-name">
										{hero.character_name}
									</p>
								</div>
							))}
					</div>

					<div className="flex-grow-1">
						<h4>Monsters</h4>
						{battle.monsters &&
							battle.monsters.map((monster, index) => (
								<div className="d-flex" key={index}>
									<input
										type="number"
										className="initiative-input"
										min={0}
										max={75}
										pattern="[0-9]*"
										inputMode="numeric"
										placeholder="?"
										onChange={(e) =>
											handleAddInitiative(
												e.target.value,
												'monster',
												index
											)
										}
									/>
									<p className="initiative-name">
										{monster.name}
									</p>
								</div>
							))}
					</div>
				</section>

				<Button variant="outline-success" onClick={handleClose}>
					Set!
				</Button>
			</ModalBody>
		</Modal>
	);
};

export default InitiativeModal;
