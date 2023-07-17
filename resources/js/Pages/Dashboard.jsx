import AppBgOverlay from '@/Components/AppBgOverlay';
import AppHeader from '@/Components/AppHeader';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Badge, Button, Dropdown, Form, Image } from 'react-bootstrap';
import defaultPhoto from '../../images/default.jpg'
import TextProfilePic from '@/Components/TextProfilePic';
import MaterialIcon from '@/Components/MaterialIcon';
import EmptyIcon from '../../images/empty-folder.png'
import { BoxIconElement } from 'boxicons';
import DashboardIcon from '../../images/dashboard.png'
import { useState } from 'react';
import ModalComponent from '@/Components/ModalComponent';
import axios from 'axios';
import { MultipartHeader } from '@/Helpers';
import ProfilePhoto from '@/Components/ProfilePhoto';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard({ auth, polls, session }) {
    const [counter, setCounter] = useState(0)
    const [joinCode, setJoinCode] = useState("")
    const [joinError, setJoinError] = useState("");

    const [isProcessing, setIsProcessing] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)

    const onJoinSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('code', joinCode);
        formData.append('user_id', auth.user.id);
        setIsProcessing(true)
        axios.post('/polls/join', formData, MultipartHeader)
            .then((res) => {
                setIsProcessing(false)
                window.location = route('voter_poll', { code: joinCode })
            })
            .catch((err) => {
                setIsProcessing(false)
                setJoinError(err.response.data.message)
            })
    }

    const onJoinCodeChange = (e) => {
        setJoinCode(e.target.value);
        setJoinError("")
    }

    useEffect(() => {
        setCounter(counter + 1)
        if (session.success) {
            toast.success(session.success)
        }
    }, [])


    return (
        <AppLayout noBg auth={auth} >
            <Head title="Dashboard" />
            <ModalComponent backdrop={isProcessing ? 'static' : "backdrop"} show={showJoinModal} handleClose={() => setShowJoinModal(false)} title="Join Poll">
                <form onSubmit={onJoinSubmit}>
                    <div className="mb-3">
                        <Form.Label htmlFor='input-code'>Code:</Form.Label>
                        <Form.Control
                            id='input-code'
                            value={joinCode}
                            onChange={onJoinCodeChange}
                            placeholder='Enter code..'
                            className={`${joinError != '' ? 'border-danger' : ''}`}
                            required
                        />
                        <p className=' text-danger mt-2 mb-0'>{joinError}</p>
                    </div>
                    <hr />
                    <Button variant='purple-secondary' type='submit' disabled={isProcessing}>Submit</Button>
                </form>
            </ModalComponent>
            <section className="dashboard">
                <div className=" bg-dark section-header w-100 ">
                    <div className="container pt-4 pb-2 pb-25 d-flex justify-content-start align-items-center">
                        <h4 className='my-3 text-uppercase text-light fw-bolder text-center me-2'>
                            <i className=' bx bxs-dashboard'></i> Dashboard
                        </h4>
                    </div>
                </div>
                <div className="container overlay-top">
                    <div className="row justify-content-center mb-3 mt-2">
                        <div className="col-md-12">
                            <div className="card shadow-sm overlay-card bg-white border rounded-1 p-xl-3 p-3">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-auto h-100">
                                            {
                                                !auth.user.photo ? (
                                                    <TextProfilePic text={auth.user.firstname[0] + auth.user.lastname[0]} />
                                                ) : (
                                                    <ProfilePhoto size='md' className="border border-4 shadow-sm" image={auth.user.photo} />
                                                )
                                            }
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
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card rounded-3 bordered-bottom bg-dark  px-xl-4 p-3">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap">
                                        <h3 className=' text-light me-auto'>
                                            <span className=''>My Polls</span>
                                        </h3>
                                        <div className="text-end">
                                            <Dropdown align="start" drop='start' className="d-inline mx-2 my-1">
                                                <Dropdown.Toggle bsPrefix='none' className='no-icon btn btn-blue' as="a" id="new-poll">
                                                    <i className=' bx bx-plus'></i>
                                                    New Poll
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} href={route('create-poll')}>Create</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setShowJoinModal(true)} >Join</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {
                                            polls && polls.length > 0 ? (
                                                <>
                                                    <div className="row justify-content-center">
                                                        <div className="col-xl-6 col-4">
                                                            <p className='text-light'>Name</p>
                                                        </div>
                                                        <div className="col-xl-6 col">
                                                            <div className="row text-light">
                                                                <div className="col-md text-center">
                                                                    <p className='d-none d-lg-block text-light'>Participants</p>
                                                                </div>
                                                                <div className="col-md text-center">
                                                                    <p className='d-none d-lg-block '>Deadline</p>
                                                                </div>
                                                                <div className="col-md text-center">
                                                                    <p className='d-none d-lg-block '>Status</p>
                                                                </div>
                                                                <div className="col-md text-center">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        polls.map((poll, index) => (
                                                            <div className='row rounded-3 gy-2 py-2 align-items-center justify-content-center bg-light bg-opacity-10' key={index}>
                                                                <div className="col-xl-6 col-5">
                                                                    <p className='my-1 text-light'>
                                                                        {
                                                                            poll.user_id == auth.user.id ? (
                                                                                <Link href={route('manage_poll', { code: poll.poll_code.code })} className='link-light fw-bold text-decoration-none'>
                                                                                    {poll.title}
                                                                                    <Badge bg='danger' className='ms-2'>Hosted</Badge>
                                                                                </Link>
                                                                            ) : (
                                                                                <Link href={route('voter_poll', { code: poll.poll_code.code })} className='link-light fw-bold text-decoration-none'>
                                                                                    {poll.title}
                                                                                </Link>
                                                                            )
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-xl-6 col">
                                                                    <div className="row  text-light align-items-center">
                                                                        <div className="col-lg col-6 order-lg-0 text-center">
                                                                            <p className='my-1 text-light'><i className=' bx bxs-group'></i> {poll.participants.length}</p>
                                                                        </div>
                                                                        <div className="col-lg col-6 order-lg-1 text-center d-lg-block d-none">
                                                                            <p className='my-1 text-light'>
                                                                                <small>{poll.deadline_date == null ? 'No deadline' : poll.deadline_date}</small>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-lg col-6 order-lg-2 order-3 text-center">
                                                                            <Badge bg={poll.status == 'Live' ? 'success-lighter' : 'danger'}>
                                                                                <span className="text-dark">{poll.status}</span>
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="col-lg col order-lg-3 order-2 text-center">
                                                                            {
                                                                                poll.user_id == auth.user.id && (
                                                                                    <Dropdown className="d-inline mx-2 my-1">
                                                                                        <Dropdown.Toggle bsPrefix='none' className='no-icon dropdown-toggler link-light  btn-link btn-sm ' as="a" id="dropdown-autoclose-true">
                                                                                            <i className='micon'>more_horiz</i>
                                                                                        </Dropdown.Toggle>

                                                                                        <Dropdown.Menu>
                                                                                            {
                                                                                                poll.status == 'Live' && (
                                                                                                    <Dropdown.Item as={Link} href={route('edit_poll', { code: poll.poll_code.code })}>Edit Poll</Dropdown.Item>
                                                                                                )
                                                                                            }
                                                                                            <Dropdown.Item as={Link} href={route('delete_poll', { code: poll.poll_code.code })} >Delete Poll</Dropdown.Item>
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3">

                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <Image src={EmptyIcon} fluid width={60} />
                                                    <p className=' fs-5 my-0 text-white-50 text-center'>No polls to show.</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
