import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import { Image } from 'react-bootstrap'
import LostImage from '../../images/Lost-amico.png';
import { Head, Link } from '@inertiajs/react';

const PollNotFound = ({ auth }) => {
    return (
        <AppLayout noBg auth={auth}>
            <Head title='No poll is found' />
            <section className="poll-not-found">
                <div className="container text-center">
                    <div className="row justify-content-center mt-2">
                        <div className="col-md-4">
                            <Image src={LostImage} fluid />
                        </div>
                    </div>
                    <p className='mt-3 fs-3 fw-bold'>Opps you seem to be lost</p>
                    <p className='mt-3 fs-5'>No poll is found at this link.</p>
                    <Link className='btn btn-outline-dark-purple fw-bold' href={route('home')}>Go home</Link>
                </div>
            </section>
        </AppLayout>
    )
}

export default PollNotFound
