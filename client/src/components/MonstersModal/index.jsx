import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { GiGoblinHead } from 'react-icons/gi';

import MonsterSelect from './MonsterSelect';
import SelectedMonster from './SelectedMonster';

const MonstersModal = ({
	showMonstersModal,
	handleCloseMonstersModal,
	monsters,
}) => {
	const [selectedMonster, setSelectedMonster] = useState('');

	const handleViewMonster = (monster) => {
		setSelectedMonster(monster);
	};

	return (
		<Modal
			show={showMonstersModal}
			onHide={handleCloseMonstersModal}
			centered
		>
			<Modal.Header closeButton>
				<GiGoblinHead size="2rem" />
			</Modal.Header>

			{/* Conditional rendering for monster */}
			{selectedMonster === '' ? (
				<MonsterSelect
					monsters={monsters}
					handleViewMonster={handleViewMonster}
				/>
			) : (
				<SelectedMonster
					monster={selectedMonster}
					setSelectedMonster={setSelectedMonster}
				/>
			)}
		</Modal>
	);
};

export default MonstersModal;
