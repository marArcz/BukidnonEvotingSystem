import AppBgOverlay from '@/Components/AppBgOverlay'
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Image } from 'react-bootstrap'
import VotingImage from '../../images/voting.png';

const CreatePollD = ({ auth }) => {
    return (
        <AppLayout auth={auth}>
            <Head title='Create Poll' />
            <AppBgOverlay full hideBottom bottom={false} />
            <section className='create-poll mt-5 mb-3'>
                <div className="container">
                    <div className="text-center">
                        <div className="row">
                            <div className="col-md-4">
                                <Image src={VotingImage} fluid />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default CreatePollD
