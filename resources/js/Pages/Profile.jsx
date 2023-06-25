import ImageUploader from '@/Components/ImageUploader';
import PhotoUploader from '@/Components/PhotoUploader';
import ProfilePhoto from '@/Components/ProfilePhoto';
import TextProfilePic from '@/Components/TextProfilePic';
import { MultipartHeader } from '@/Helpers';
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Image, Spinner } from 'react-bootstrap';

const Profile = ({ auth }) => {
    const [photo, setPhoto] = useState(null)
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const onProfilePicChanged = (imageUrl) => {
        var formData = new FormData()

        formData.append('image', imageUrl)
        formData.append('user_id', auth.user.id)
        setIsProcessing(true)
        axios.post('/profile/photo/change', formData, MultipartHeader)
            .then(res => {
                console.log('res: ', res);
                setPhoto(imageUrl);
                setIsProcessing(false)
                auth.user.photo = imageUrl;
            })


    }

    console.log(auth)

    return (
        <AppLayout noBg auth={auth}>
            <PhotoUploader closeOnComplete show={showImageUploader} handleClose={() => setShowImageUploader(false)} onCompleted={onProfilePicChanged} />
            <Head title='Profile' />
            <section className='profile-section'>
                <div className="bg-dark-purple section-header w-100 ">
                    <div className="container pt-4 pb-2 pb-25 d-flex justify-content-start align-items-center">
                        <h4 className='my-3 text-uppercase text-light fw-bolder text-center me-2'>
                            Account Profile
                        </h4>
                        {/* <div className='my-0'>
                            <Image fluid className='my-3' src={DashboardIcon} />
                        </div> */}
                    </div>
                </div>
                <Container className='overlay-top'>
                    <div className="row justify-content-center mb-3 mt-xl-4 mt-3">
                        <div className="col-md-12">
                            <div className="card shadow-sm overlay-card bg-white border rounded-1 p-xl-3 p-3">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-auto h-100 text-center">
                                            {
                                                !auth.user.photo ? (
                                                    <div className={`change-photo-wrapper text ${isProcessing ? 'loading' : ''}`}>
                                                        <TextProfilePic text={auth.user.firstname[0] + auth.user.lastname[0]} />
                                                        <div className="control">
                                                            {
                                                                isProcessing ? (
                                                                    <Spinner
                                                                        animation='border'
                                                                        color='white'
                                                                        variant='white'
                                                                        size='sm'
                                                                    />
                                                                ) : (
                                                                    <button onClick={() => setShowImageUploader(true)} className='btn btn-sm border-0 '>
                                                                        <i className=' text-light fs-5 bx bxs-camera'></i>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`change-photo-wrapper photo ${isProcessing ? 'loading' : ''}`}>
                                                        <ProfilePhoto className="border border-4 shadow-sm" image={auth.user.photo} />
                                                        <div className="control">
                                                            {
                                                                isProcessing ? (
                                                                    <Spinner
                                                                        animation='border'
                                                                        color='white'
                                                                        variant='white'
                                                                        size='sm'
                                                                    />
                                                                ) : (
                                                                    <button onClick={() => setShowImageUploader(true)} className='btn btn-sm border-0 '>
                                                                        <i className=' text-light fs-5 bx bxs-camera'></i>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className={`change-photo-wrapper ${isProcessing ? 'loading' : ''}`}>
                                            </div>

                                        </div>
                                        <div className="col h-100">
                                            <h3 className='my-1 fw-bold text-dark'>{auth.user.firstname + ' ' + auth.user.lastname}</h3>
                                            <p className="my-1 text-dark-50 fs-5">User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </AppLayout>
    )
}

export default Profile
