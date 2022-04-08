import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { GiGoblinHead } from 'react-icons/gi';

import MonsterSelect from './MonsterSelect';
import SelectedMonster from './SelectedMonster';

const MonstersModal = ({
	showMonstersModal,
	handleCloseMonstersModal,
	monsters,
	setMonsterData,
	heroActionType,
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
			) : heroActionType === 'attack' ? (
				<SelectedMonster
					monster={selectedMonster}
					monsterArray={monsters}
					setSelectedMonster={setSelectedMonster}
					setMonsterData={setMonsterData}
					handleCloseMonstersModal={handleCloseMonstersModal}
				/>
			) : null}
		</Modal>
	);
};

export default MonstersModal;
