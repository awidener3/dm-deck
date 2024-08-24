import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { GiBookCover } from 'react-icons/gi'

const InfoModal = ({ info, showInfoModal, handleCloseInfoModal }) => {
  return (
    <Modal size="sm" show={showInfoModal} onHide={handleCloseInfoModal} centered>
      <ModalHeader closeButton>
        <GiBookCover size="2rem" />
      </ModalHeader>
      <div className="d-flex flex-column justify-content-center">
        <ModalBody>
          {info.actions
            ? info.actions.map(action => (
                <p key={action.name}>
                  <span className="info-modal-action">{action.name}</span>. {action.desc}
                </p>
              ))
            : null}
        </ModalBody>
      </div>
    </Modal>
  )
}

export default InfoModal
