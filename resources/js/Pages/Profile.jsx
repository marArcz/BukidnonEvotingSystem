import AccountInfoForm from '@/Components/AccountInfoForm';
import ImageUploader from '@/Components/ImageUploader';
import InputError from '@/Components/InputError';
import LoadingButton from '@/Components/LoadingButton';
import Modal from '@/Components/Modal2';
import ModalComponent from '@/Components/ModalComponent';
import PasswordForm from '@/Components/PasswordForm';
import PhotoUploader from '@/Components/PhotoUploader';
import ProfilePhoto from '@/Components/ProfilePhoto';
import TextProfilePic from '@/Components/TextProfilePic';
import { MultipartHeader } from '@/Helpers';
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Badge, Button, Card, Container, Form, Image, ListGroup, Nav, Spinner, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Profile = ({ auth, profile }) => {
    const [tabKey, setTabKey] = useState('info')
    const [photo, setPhoto] = useState(null)
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState(null)
    const [currentPasswordError, setCurrentPasswordError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState('info')
    const { data, setData, processing, patch, errors } = useForm({
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        email: auth.user.email,
        username: auth.user.username,
    })

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

    const onChangePassword = (e) => {
        e.preventDefault()
        if (newPassword == confirmPassword) {
            setCurrentPasswordError(null)
            setNewPasswordError(null)
            setChangingPassword(true)
            var formData = new FormData();
            formData.append("user_id", auth.user.id)
            formData.append('new_password', newPassword)
            formData.append('current_password', currentPassword)
            axios.post('/profile/password/change', formData, MultipartHeader)
                .then((res) => {
                    setChangingPassword(false)
                    if (res.data.success == false) {
                        toast.error(res.data.message)
                        setCurrentPasswordError(res.data.message)
                    } else {

                        auth.user = res.data.user
                        toast.success('Successfully changed!');
                    }
                })
        } else {
            toast.error("Passwords does not match!")
            setNewPasswordError("Password does not match")
        }
    }

    const onInfoSave = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
        setShowModal(false)
    }

    const resetInfo = (e) => {
        setData('firstname', auth.user.firstname)
        setData('lastname', auth.user.lastname)
        setData('username', auth.user.username)
        setData('email', auth.user.email)
    }

    const showModalComponent = (f) => {
        setForm(f)
        setShowModal(true)
    }

    return (
        <AppLayout noBg auth={auth}>
            <PhotoUploader closeOnComplete show={showImageUploader} handleClose={() => setShowImageUploader(false)} onCompleted={onProfilePicChanged} />
            <Head title='Profile' />
            <section className='profile-section'>
                <div className="bg-dark section-header w-100 ">
                    <div className="container pt-4 pb-2 pb-25 d-flex justify-content-start align-items-center">
                        <h4 className='my-3 text-capitalize text-light fw-bolder text-center me-2'>
                            Account Profile
                        </h4>
                    </div>
                </div>
                <Container className='overlay-top'>
                    <div className="row justify-content-center gy-3 mb-3 mt-2">
                        <div className="col-md-4">
                            <div className="card shadow-sm  bg-white border rounded-0 p-xl-2 p-2 h-100">
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

                                    <ListGroup className=' mt-3'>
                                        <ListGroup.Item>
                                            <div className="d-flex align-items-center">
                                                <p className='my-1'>Polls created</p>
                                                <div className='ms-auto'>
                                                    <Badge title='3' bg='purple'>{profile?.polls_created || 0}</Badge>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex align-items-center">
                                                <p className='my-1'>Polls joined</p>
                                                <div className='ms-auto'>
                                                    <Badge title='3' bg='danger'>{profile?.polls_joined || 0}</Badge>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card h-100 rounded-0 shadow-sm  p-2 border">
                                <div className="card-body">
                                    <p>Profile Information</p>
                                    <ListGroup variant='flush' className='profile-list'>
                                        <ListGroup.Item onClick={() => showModalComponent('info')} className=' text-secondary'>
                                            <div className="row align-items-center gy-1 mb-2">
                                                <div className="col-md-2">
                                                    <p className='my-1'><small>Name</small></p>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className='my-1'>{auth.user.firstname} {auth.user.lastname}</p>
                                                </div>
                                            </div>
                                            <div className="row mb-2 gy-1">
                                                <div className="col-md-2">
                                                    <p className='my-1'><small>Username</small></p>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className='my-1'>{auth.user.username}</p>
                                                </div>
                                            </div>
                                            <div className="row mb-2 gy-1">
                                                <div className="col-md-2">
                                                    <p className='my-1'><small>Email Address</small></p>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className='my-1'>{auth.user.email}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item onClick={() => showModalComponent('password')} className=' text-secondary'>
                                            <p className='my-1'><small>Password</small></p>
                                            <p className='my-2'>*****************</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div> 
                </Container>
            </section>
            <ModalComponent className=" rounded-0" size='md' headerBg="light" titleColor='dark' title={form =='info'?'Update Information':'Change Password'} show={showModal} handleClose={() => setShowModal(false)}>
                {
                    form == 'info' ? (
                        <AccountInfoForm onInfoSave={onInfoSave} data={data} setData={setData} resetInfo={resetInfo} />
                    ) : (
                        <PasswordForm
                            confirmPassword={confirmPassword} 
                            newPassword={newPassword} 
                            currentPassword={currentPassword} 
                            currentPasswordError={currentPasswordError}
                            newPasswordError={newPasswordError}
                            onChangePassword={onChangePassword}
                            setConfirmPassword={setConfirmPassword}
                            setCurrentPassword={setCurrentPassword}
                            setNewPassword={setNewPassword}
                            changingPassword={changingPassword}
                        />
                    )
                }
            </ModalComponent>
        </AppLayout>
    )
}

export default Profile
