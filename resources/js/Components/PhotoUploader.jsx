import axios, { Axios } from 'axios'
import React, { useState } from 'react'
import { Modal, Button, FormLabel } from 'react-bootstrap'

const PhotoUploader = ({ show, handleClose, onCompleted, closeOnComplete }) => {
    const [image, setImage] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const onChange = (e) => {
        setIsUploading(true);
        let files = e.target.files;
        if (files.length > 0) {
            let formData = new FormData();
            formData.append('image', files[0]);
            axios.post(
                '/polls/upload-image',
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            )
                .then((res) => {
                    console.log('uploading image res: ', res)
                    onCompleted(res.data.imageUrl)
                    setIsUploading(false)
                    if (closeOnComplete) {
                        handleClose()
                    }
                })
                .catch((err) => {
                    console.error('error uploading image: ', err);
                    setIsUploading(false)
                    if (closeOnComplete) {
                        handleClose()
                    }
                })
        }
    }

    return (
        <>
            <Modal backdrop={isUploading ? 'static' : 'backdrop'} centered size='lg' className='image-uploader-modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton className=' bg-dark-purple'>
                    <Modal.Title className=' fs-5 text-light'>Media Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`image-uploader h-100 ${isUploading ? 'uploading' : ''}`}>
                        <div className=" text-center">
                            <div>
                                <p><i className=' bx bx-folder-plus bx-md'></i></p>
                                <p className='fs-5 fw-bold'>{isUploading ? 'Uploading image...' : 'Click to upload or drop an image here.'}</p>
                                <p className='fs-5 text-black-50'>JPG, PNG or GIF. </p>
                            </div>
                        </div>
                        <input onChange={onChange} accept='image/*' id='image-input' className='image-uploader-input' type='file' value={image} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark-purple" disabled={isUploading} onClick={handleClose} className='col-12'>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PhotoUploader
