import { useState } from 'react'
import { Modal, ModalHeader } from 'react-bootstrap'
import { GiGoblinHead } from 'react-icons/gi'
import MonsterSelect from './MonsterSelect'
import SelectedMonster from './SelectedMonster'
import useLocalStorage from 'use-local-storage'

const MonstersModal = ({ showMonstersModal, handleCloseMonstersModal, battleOrder, setbattleOrder }) => {
  const [selectedMonster, setSelectedMonster] = useState('')
  const [theme] = useLocalStorage('theme')
  const handleViewMonster = monster => setSelectedMonster(monster)

  return (
    <Modal
      show={showMonstersModal}
      onHide={() => {
        setSelectedMonster('')
        handleCloseMonstersModal()
      }}
      centered
      data-theme={theme === 'dark' ? 'dark' : 'light'}
    >
      <ModalHeader closeButton>
        <GiGoblinHead size="2rem" />
      </ModalHeader>

      {/* Conditional rendering for pages */}
      {selectedMonster === '' ? (
        <MonsterSelect monsters={battleOrder} handleViewMonster={handleViewMonster} />
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
  )
}

export default MonstersModal
