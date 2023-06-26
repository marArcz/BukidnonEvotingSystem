import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalComponent = ({show,handleClose,title,children,backdrop="backdrop"}) => {
  return (
    <Modal backdrop={backdrop} show={show} onHide={handleClose}>
      <Modal.Header className=' bg-dark-purple text-light pb-2' closeButton>
        <Modal.Title className='fs-5'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalComponent
