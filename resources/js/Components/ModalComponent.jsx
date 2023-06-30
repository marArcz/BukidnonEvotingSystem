import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalComponent = ({show,handleClose,title,children,backdrop="backdrop",size,headerBg='dark-purple',titleColor='light',className}) => {
  return (
    <Modal className={className}  backdrop={backdrop} show={show} onHide={handleClose} size={size}>
      <Modal.Header className={` bg-${headerBg} text-light pb-2`} closeButton>
        <Modal.Title  className={`fs-6 text-${titleColor}`}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalComponent
