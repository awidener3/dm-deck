import { Modal, Button } from 'react-bootstrap'
import { FaDiceD20 } from 'react-icons/fa'

const RollModal = ({ showRollModal, handleCloseRollModal, die, rollModifier }) => {
  function addToSelected(e) {
    e.currentTarget.classList.add('selected')
  }

  return (
    <Modal id="rollModal" show={showRollModal} onHide={handleCloseRollModal} centered>
      <Modal.Header closeButton>
        <FaDiceD20 size="2rem" />
      </Modal.Header>

      <section className="roll-modal-content">
        <section className="roll">
          <Modal.Title className="display-3">{die + rollModifier}</Modal.Title>
          <Modal.Body>
            {die} + {rollModifier}
          </Modal.Body>
        </section>

        <section className="hero-container">
          <h4>Apply Damage to Heroes</h4>

          <ul className="hero-list">
            <li onClick={addToSelected}>Gwyn</li>
            <li onClick={addToSelected}>Magnus</li>
            <li onClick={addToSelected}>Abi</li>
            <li onClick={addToSelected}>Echo</li>
            <li onClick={addToSelected}>Khelle</li>
          </ul>
        </section>
      </section>

      <Modal.Footer>
        <Button variant="success">Apply to Selected</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RollModal
