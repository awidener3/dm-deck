import { useState } from 'react';
import { Modal, ModalHeader } from 'react-bootstrap';
import { GiGoblinHead } from 'react-icons/gi';
import MonsterSelect from './MonsterSelect';
import SelectedMonster from './SelectedMonster';
import useLocalStorage from 'use-local-storage';

const MonstersModal = ({
	showMonstersModal,
	handleCloseMonstersModal,
	battleOrder,
	setbattleOrder,
}) => {
	const [selectedMonster, setSelectedMonster] = useState('');
	/* //TODO: Global Context
     This solution currently only works once, and will not see if a user changes between dark and light mode. A global context that is checking the current theme is best.

     This bug stems from react-bootstrap rendering the modal component OUTSIDE of the root component, therefore it is not seeing the `data-theme` that is attached.
  */
	const [theme] = useLocalStorage('theme');
	const handleViewMonster = (monster) => setSelectedMonster(monster);

	return (
		<Modal
			show={showMonstersModal}
			onHide={() => {
				setSelectedMonster('');
				handleCloseMonstersModal();
			}}
			centered
			data-theme={theme === 'dark' ? 'dark' : 'light'}
		>
			<ModalHeader closeButton>
				<GiGoblinHead size="2rem" />
			</ModalHeader>

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
