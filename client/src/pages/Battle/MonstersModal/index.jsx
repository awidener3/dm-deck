import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { GiGoblinHead } from 'react-icons/gi';

import MonsterSelect from './MonsterSelect';
import SelectedMonster from './SelectedMonster';

const MonstersModal = ({
	showMonstersModal,
	handleCloseMonstersModal,
	battleOrder,
	setbattleOrder,
}) => {
	const [selectedMonster, setSelectedMonster] = useState('');

	const handleViewMonster = (monster) => setSelectedMonster(monster);

	return (
		<Modal
			show={showMonstersModal}
			onHide={handleCloseMonstersModal}
			centered
		>
			<Modal.Header closeButton>
				<GiGoblinHead size="2rem" />
			</Modal.Header>

			{/* Conditional rendering for pages */}
			{selectedMonster === '' ? (
				<MonsterSelect
					monsters={battleOrder}
					handleViewMonster={handleViewMonster}
				/>
			) : (
				<SelectedMonster
					monster={selectedMonster}
					setSelectedMonster={setSelectedMonster}
					battleOrder={battleOrder}
					setbattleOrder={setbattleOrder}
					handleCloseMonstersModal={handleCloseMonstersModal}
				/>
			)}
		</Modal>
	);
};

export default MonstersModal;
