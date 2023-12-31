import AppBgOverlay from '@/Components/AppBgOverlay'
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Badge, Button, Image } from 'react-bootstrap'
import PollIcon from '../../../images/poll-icon-1.png';
import PollImage from '../../../images/analytics.png';
import Cookies from 'js-cookie'
import TextProfilePic from '@/Components/TextProfilePic'
import defaultPhoto from '../../../images/default.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import CountDown from '@/Components/CountDown'
import ProfilePhoto from '@/Components/ProfilePhoto'

const Poll = ({ auth, poll, participant, session }) => {

    return (
        <AppLayout auth={auth} noBg >
            <Head title={poll.title} />
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-dark w-100 ">
                    <div className="container py-3 d-flex justify-content-center align-items-end">
                        <h3 className='my-3 text-light fw-bolder text-center me-2'>
                            ONLINE VOTING
                        </h3>
                        <div className='my-0'>
                            <Image fluid className='my-3' src={PollIcon} />
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <Link href={route('home')} className='btn btn-light border shadow-sm mb-3'>
                        <i className='bx bxs-home'></i>
                    </Link>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card p-xl-3 p-3 mb-3">
                                <div className="card-body ">
                                    <div className="row align-items-center gy-5">
                                        <div className="col-md">
                                            <div className="">
                                                <div className="d-flex">
                                                    <h1 className='fw-bold text-uppercase'>{poll.title} </h1>
                                                    <div className='ms-2'>
                                                        {
                                                            poll.status == 'Live' ? (
                                                                <Badge bg='success' >{poll.status} <i className=' bx bx-broadcast'></i></Badge>
                                                            ) : (
                                                                <Badge bg='danger'>{poll.status}</Badge>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <h5>{poll.description}</h5>

                                                <div className="mt-4">
                                                    <div className={`my-1 text-uppercase`}>
                                                        {
                                                            poll.status == 'Live' ? (
                                                                <>
                                                                    <h6 className=' text-purple-secondary fw-bold'>This poll ends on:</h6>

                                                                    {
                                                                        poll.deadline_date ? (
                                                                            <CountDown endDate={new Date(poll.deadline_date)} />
                                                                        ) : (
                                                                            <p>No deadline</p>
                                                                        )
                                                                    }
                                                                </>
                                                            ) : (
                                                                <>
                                                                    This poll has ended <i className=' bx bxs-flag fs-5'></i>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3  text-center poll-actions">
                                            <div className="text-center poll-action">
                                                <Image className='mb-2' fluid src={PollImage} />
                                                <div className="d-grid">
                                                    <Link href={route('statistics', { code: poll.poll_code.code })} className="btn rounded-0 btn-purple-secondary text-light">Show statistics</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-xl-3 p-3 bg-dark-purple">
                                <div className="card-body">
                                    {
                                        auth.user ? (
                                            <div className="row align-items-center">
                                                <div className="col-auto h-100">
                                                    {
                                                        auth.user.photo ?(
                                                            <ProfilePhoto className="p-1 border border-2" image={auth.user.photo}/>
                                                        ) : (
                                                            // <Image fluid thumbnail src={defaultPhoto} />
                                                            <TextProfilePic text={auth.user.firstname[0] + auth.user.lastname[0]} />

                                                        )
                                                    }
                                                </div>
                                                <div className="col h-100">
                                                    <h4 className='my-1 text-light'>{auth.user.firstname + ' ' + auth.user.lastname}</h4>
                                                    <p className="my-1 text-white-50 fs-6">Voter</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <h5 className='text-white-50 mt-1 mb-3'>You are not logged in!</h5>
                                        )
                                    }
                                    <hr className='bg-secondary text-secondary' />
                                    {
                                        poll.status == 'Live' ? (
                                            participant ? (
                                                participant.has_voted ? (
                                                    <div className='text-light'>
                                                        <p className='mt-2 mb-3 fs-5 fw-medium'>You already voted in this poll.</p>
                                                        <Link href={route('myvote', { code: poll.poll_code.code })} className='btn btn-light-purple text-light'>See submitted vote</Link>
                                                    </div>
                                                ) : (
                                                    <div className='text-light'>
                                                        <p className='mt-2 mb-3 fs-5 fw-medium'>You haven't voted for this poll yet.</p>
                                                        <Link href={route('voting', { code: poll.poll_code.code })} className='btn btn-light-purple text-light'>Vote Now</Link>
                                                    </div>
                                                )
                                            ) : (
                                                <div className='text-light'>
                                                    <p className='mt-2 mb-3 fs-5 fw-bold'>Join in this poll?</p>
                                                    <p className='mt-2 mb-3 fw-medium'>Click on the join button to start.</p>
                                                    <Link href={route('join_poll', { code: poll.poll_code.code })} className='btn btn-light-purple text-light'>Join</Link>
                                                </div>
                                            )
                                        ) : (
                                            participant ? (
                                                participant.has_voted ? (
                                                    <div className='text-light'>
                                                        <p className='mt-2 mb-3 fs-5 fw-medium'>This poll has already ended.</p>
                                                        <Link href={route('myvote', { code: poll.poll_code.code })} className='btn btn-light-purple text-light'>See submitted vote</Link>
                                                    </div>
                                                ) : (
                                                    <div className='text-light'>
                                                        <p className='mt-2 mb-3 fs-5 fw-medium'>This poll has already ended.</p>
                                                        <Button variant='light-purple' type='button' disabled>Vote Now</Button>
                                                    </div>
                                                )
                                            ) : (
                                                <div className='text-light'>
                                                    <p className='mt-2 mb-3 fs-5 fw-bold'>Join in this poll?</p>
                                                    <p className='mt-2 mb-3 fw-medium'>Click on the join button to start.</p>
                                                    <Link href={route('join_poll', { code: poll.poll_code.code })} className='btn btn-light-purple text-light'>Join</Link>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </AppLayout >
    )
}

export default Poll
