import { ModalTitle, ModalBody } from 'react-bootstrap';

const MonsterSelect = ({ monsters, handleViewMonster }) => {
	return (
		<>
			<ModalTitle className="text-center">Select a Monster</ModalTitle>
			<ModalBody className="monster-btns text-center">
				{monsters.map((monster) => {
					if (monster.type !== 'hero') {
						return (
							<button
								className="btn btn-outline-secondary card-btn mb-2 w-75 m-auto"
								key={monster.name}
								onClick={() => handleViewMonster(monster)}
							>
								{monster.name}
							</button>
						);
					}
					return null;
				})}
			</ModalBody>
		</>
	);
};

export default MonsterSelect;
