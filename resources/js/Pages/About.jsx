import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Image } from 'react-bootstrap'
import ImageVoting from '../../images/voting (2).png'
const About = ({ auth }) => {
    return (
        <AppLayout auth={auth} noBg>
            <Head title='About' />
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-purple-secondary w-100 ">
                    <div className="container py-3 d-flex justify-content-center align-items-end">
                        <h3 className='my-2 text-light fw-bolder text-center me-2'>
                            About Us
                        </h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row gy-5 h-100 align-items-center mt-xl-5 mt-3 pt-3">
                        <div className="col-md-6">
                            <div className="col-10 mx-auto">
                                <Image src={ImageVoting} fluid />
                            </div>
                        </div>
                        <div className="col-md">
                            <h2 className=' text-uppercase fw-bold'>Bukidnon classic custom voting system</h2>
                            <p className='fw-medium fs-5 mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default About
