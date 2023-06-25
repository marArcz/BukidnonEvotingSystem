import AppBgOverlay from '@/Components/AppBgOverlay'
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Button, Image } from 'react-bootstrap'
import VotingImage from '../../images/voting (2).png';
import JoinImage from '../../images/join.png';
import CreateImage from '../../images/create.png';

const NewPoll = ({ auth }) => {
    return (
        <AppLayout auth={auth}>
            <Head title='New Poll' />
            <section className="new-poll mt-5 mb-3">
                <div className="container">
                    <div className="card border-0 shadow rounded-1 p-xl-4 p-3 bg-overlay">
                        <div className="card-body">
                            <div className="text-center">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-lg-4">
                                        <Image fluid src={VotingImage} />
                                        <h3 className='fw-bold text-dark mt-3'>Bukidnon Evoting System</h3>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-xl-4">
                                        <div className="card bg-opacity-50 border-0 bg-white shadow-sm">
                                            <div className="card-body py-3">
                                                <Image fluid src={JoinImage} width={60} />
                                                <div className="text-center">
                                                    <Link href={route('create-poll')} className='btn btn-blue px-4 mt-4 fs-5 text-uppercase'>
                                                        Join
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xl-4">
                                        <div className="card bg-opacity-50 border-0 bg-white shadow-sm">
                                            <div className="card-body py-3">
                                                <Image fluid src={CreateImage} className='' width={100} />
                                                <div className="text-center">
                                                    <Link href={route('create-poll')} className='btn btn-dark-purple px-4 mt-4 fs-5 text-uppercase'>
                                                        Create
                                                    </Link>
                                                </div>
                                            </div>
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

export default NewPoll
