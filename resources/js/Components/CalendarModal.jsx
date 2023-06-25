import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Calendar from 'react-calendar'

const CalendarModal = ({ handleSelect, show, handleClose, handleClear }) => {
    const today = new Date()
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-5'>Select Poll Deadline</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Calendar minDate={today} className="mx-auto w-100 h-100" onChange={handleSelect} value={today} />
                    <div className="text-end mt-2">
                        <Button variant='dark-purple' onClick={handleClear} type='button'>Clear Deadline</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CalendarModal
