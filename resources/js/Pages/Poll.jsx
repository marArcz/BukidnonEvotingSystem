import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Badge, Button, Form, Image, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import PollImage from '../../images/poll.png';
import PollCountImage from '../../images/poll-count.png';
import VoterListImage from '../../images/voter-list.png';
import EndImage from '../../images/end-election.png';
import AppBgOverlay from '@/Components/AppBgOverlay';
import { useState } from 'react';
import { useEffect } from 'react';
import CountDown from '@/Components/CountDown';
import Swal from 'sweetalert2';
import ImagePower from '../../images/power-button.png';
import ImageRestart from '../../images/restart.png'
import ModalComponent from '@/Components/ModalComponent';
import Calendar from 'react-calendar';
import axios from 'axios';
import { MultipartHeader } from '@/Helpers';
import LoadingButton from '@/Components/LoadingButton';

const Poll = ({ auth, poll }) => {
    const [showResumeModal, setShowResumeModal] = useState(false)
    const [newDeadline, setNewDeadline] = useState(null)
    const [addDeadline, setAddDeadline] = useState(false)
    const [minDate, setMinDate] = useState(null)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [processing, setProcessing] = useState(false)
    useEffect(() => {
        let today = new Date();
        today.setDate(new Date().getDate() + 1)
        setMinDate(today)
    }, [])


    const onEndPoll = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, end poll!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = e.target.href;
            }
        })
    }

    const dateToString = (d) => {
        let date = new Date(d)
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        day = day < 10 ? `0${day}` : day

        return `${months[month]} ${day}, ${year}`
    }

    const switchDeadline = () => {
        if (addDeadline) {
            setAddDeadline(false)
            setNewDeadline(null)
        } else {
            setAddDeadline(true)
        }

    }

    const onResumePoll = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('code', poll.poll_code.code);
        if (newDeadline) {
            let ddline = `${Number(newDeadline.getMonth()) + Number(1) < 10 ? '0' : ''}${newDeadline.getFullYear()}-${Number(newDeadline.getMonth()) + Number(1) < 10 ? Number(newDeadline.getMonth()) + Number(1) : Number(newDeadline.getMonth()) + Number(1)}-${Number(newDeadline.getDate()) < 10 ? '0' : ''}${newDeadline.getDate()}`
            formData.append('deadline', ddline);
        }

        axios.post('/polls/resume', formData, MultipartHeader)
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
    }

    return (
        <AppLayout auth={auth} noBg>
            <ModalComponent backdrop={processing ? 'static' : ''} title="Resume Poll" show={showResumeModal} handleClose={() => setShowResumeModal(false)}>
                <form onSubmit={onResumePoll}>
                    <div className="mb-3">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Add deadline"
                            checked={addDeadline}
                            onClick={switchDeadline}
                            className='mb-3'
                        />
                        <Form.Control
                            type='text'
                            readOnly
                            value={newDeadline ? dateToString(newDeadline) : 'No Deadline'}
                            className='mb-3'
                        />

                        <Calendar value={newDeadline} minDate={minDate} onChange={d => setNewDeadline(d)} className="w-100" tileDisabled={() => !addDeadline} />
                    </div>
                    <div className="text-end">
                        {/* <Button variant='purple-secondary' type='submit'>Submit</Button> */}
                        <LoadingButton variant='purple-secondary' loading={processing} type='submit'>Submit</LoadingButton>
                    </div>
                </form>
            </ModalComponent>
            <Head title={poll.title} />
            <section className="poll">
                <div className=" bg-dark-purple w-100 py-4">
                    <div className="container">
                        <div className="d-flex">
                            <h2 className=' text-white fw-bold my-0'>
                                {poll.title}
                            </h2>
                            <div className='ms-2'>
                                <Badge bg={poll.status == 'Live' ? 'success-lighter' : 'danger'} className=''>
                                    <span className="text-dark">{poll.status}</span>
                                </Badge>
                            </div>
                        </div>
                        {poll.status == "Live" ? (
                            <p className='text-white-50 mt-2 mb-0'>This poll is still ongoing.</p>
                        ) : (
                            <p className=' mb-0 mt-2 mb-0 text-white-50'>This poll has ended.</p>
                        )}
                    </div>
                </div>
                <div className="container">
                    {/* <Link href={route('home')} className='btn btn-light border shadow-sm mt-2'>
                        <i className='bx bxs-home'></i>
                    </Link> */}
                    <div className="row mt-3 mt-lg-3 justify-content-center">
                        <div className="col-md-12">
                            <h4 className='text-dark-purple mb-3 fw-bold'>Manage Poll</h4>
                            {
                                poll.status == 'Live' && (
                                    <>
                                        {
                                            poll.deadline_date ? (
                                                <>
                                                    <p className='mb-2 text-dark-purple'>This poll will automatically close on:</p>

                                                    <CountDown endDate={new Date(poll.deadline_date)} />
                                                </>
                                        ) : null
                                        }
                                    </>
                                )
                            }
                            <div className="card border bg-white bg-opacity-75 shadow mb-3 mt-3">
                                <div className="card-body poll-actions">
                                    <div className="row gx-lg-4 gx-3 gy-5">
                                        <div className="col-md-3 col-6">
                                            <div className="text-center poll-action">
                                                <Image className='mb-2' fluid src={PollImage} />
                                                <div className="d-grid">
                                                    {
                                                        poll.status == 'Live' ? (
                                                            <Link href={route('edit_poll', { code: poll.poll_code.code })} className="btn rounded-0 btn-purple-secondary text-light">Edit Poll</Link>
                                                        ) : (
                                                            <Button variant='dark' className='rounded-0 disabled' type='button' disabled>Edit Poll</Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center poll-action">
                                                <Image className='mb-2' fluid src={VoterListImage} />
                                                <div className="d-grid">
                                                    <Link href={route('poll_voters', { code: poll.poll_code.code })} className="btn rounded-0 btn-purple-secondary text-light">Voters</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center poll-action">
                                                <Image className='mb-2' fluid src={PollCountImage} />
                                                {
                                                    poll.status == 'Live' ? (
                                                        <div className="d-grid">
                                                            <Link href={route('statistics', { code: poll.poll_code.code })} className="btn rounded-0 btn-purple-secondary text-light">Live Poll</Link>
                                                        </div>
                                                    ) : (
                                                        <div className="d-grid">
                                                            <Link href={route('result', { code: poll.poll_code.code })} className="btn rounded-0 btn-purple-secondary text-light">See result</Link>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center poll-action">
                                                {
                                                    poll.status == 'Live' ? (
                                                        <>
                                                            <Image className='mb-2' fluid src={EndImage} />
                                                            <div className="d-grid">
                                                                <Link onClick={onEndPoll} href={route('endPoll', { id: poll.id })} className={`${poll.status == 'Closed' ? 'disabled btn-dark-purple' : 'btn-purple-secondary'} btn rounded-0  text-light`}>
                                                                    {poll.status == "Live" ? "End" : "Already ended"}
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Image className='mb-2' fluid src={ImageRestart} style={{ width: '10px !important', height: '10px !important' }} />
                                                            <div className="d-grid">
                                                                <button type='button' onClick={() => setShowResumeModal(true)} className={`btn-purple-secondary btn rounded-0  text-light`}>
                                                                    Resume poll
                                                                </button>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-dark-purple voting-card shadow p-xl-3 p-3">
                                <div className="card-body text-light">
                                    <h5 className=' d-flex align-items-center'>
                                        <i className=' bx bx-share-alt me-2'></i>
                                        <span>Invite voters</span>
                                    </h5>
                                    <hr />
                                    <p className="mt-1 mb-2">
                                        <small>Share this code </small>
                                    </p>

                                    <OverlayTrigger
                                        placement="right"
                                        trigger={'focus'}

                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Successfully Copied
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={() => navigator.clipboard.writeText(poll.poll_code.code)} size='sm' variant='purple-secondary rounded-0 mb-3'>
                                            <div className="d-flex align-items-center">
                                                <span className='me-2'>{poll.poll_code.code}</span>
                                                <small className='micon fs-5 text-white-50'>content_copy</small>
                                            </div>
                                        </Button>
                                    </OverlayTrigger>

                                    <p className=' text-white-50'>or</p>
                                    <div className="mb-3">
                                        <Form.Label>Copy and share this link to your voters.</Form.Label>
                                        <div className="form-poll-code d-flex">
                                            <Form.Control className='custom' type='text' readOnly value={route('voter_poll', { code: poll.poll_code.code })} />
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={'focus'}

                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        Successfully Copied
                                                    </Tooltip>
                                                }
                                            >
                                                <button onClick={() => navigator.clipboard.writeText(route('voter_poll', { code: poll.poll_code.code }))} className='btn btn-dark-purple' type='button'><i className=' bx bx-link'></i></button>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Poll
