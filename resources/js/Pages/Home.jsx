import AppBgOverlay from '@/Components/AppBgOverlay'
import AppHeader from '@/Components/AppHeader'
import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import VotingImage from '../../images/voting (2).png'
import { Image } from 'react-bootstrap'
import Footer from '@/Components/Footer'
import { Head, Link } from '@inertiajs/react'
import ImageUnlimited from '../../images/infinity.png'
import ImageEasy from '../../images/easy.png'
import ImageFree from '../../images/free (2).png'
import ImageDataReport from '../../images/Data report-rafiki.png'


const Home = ({ auth }) => {
    return (
        <AppLayout noBg noShadowHeader auth={auth}>
            <Head title='Home' />
            {/* <AppBgOverlay full /> */}
            <section className='hero'>
                <div className="container my-lg-2 pb-4">
                    <div className="row align-items-center mt-xl-5 mt-3 gy-4">
                        <div className="col-md order-lg-0 order-1">
                            <div className="text-start mb-5 mt-lg-2">
                                <p className=' fs-5 mb-4 text-uppercase text-purple-secondary'>Built for custom polls or voting.</p>
                                <h1 className=' text-big fw-bolder'>Welcome To Bukidnon Classic Custom Voting System</h1>
                            </div>
                            <div>
                                <p className=' fs-5 text-secondary'>Create an account to start using our app.</p>
                                <Link className=' btn-lg btn btn-purple-secondary' href={route('register')}>Create Account</Link>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="row justify-content-center">
                                <div className="col-lg-12 col-md-10 col-8">
                                    <Image src={VotingImage} fluid />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="features my-0 py-4 bg-secondary bg-opacity-10">
                <div className="container ">
                    <div className="row my-0 align-items-center">
                        <div className="col-md">
                            <div className="d-flex align-items-center my-3">
                                <div className='me-3'>
                                    <Image src={ImageUnlimited} fluid />
                                </div>
                                <div>
                                    <p className='my-1 fw-bold text-uppercase'>Unlimited polls</p>
                                    <p className=' text-secondary my-1'>You can create polls or voting as much as you want</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="d-flex align-items-center my-3">
                                <div className='me-3'>
                                    <Image src={ImageEasy} fluid />
                                </div>
                                <div>
                                    <p className='my-1 fw-bold text-uppercase'>Ease to use</p>
                                    <p className=' text-secondary my-1'>Our app is built to be user friendly</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="d-flex align-items-center my-3">
                                <div className='me-3'>
                                    <Image src={ImageFree} fluid />
                                </div>
                                <div>
                                    <p className='my-1 fw-bold text-uppercase'>Free</p>
                                    <p className=' text-secondary my-1'>You will not pay for anything</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className='about py-3'>
                <div className="container">
                    <div className="row gx-3 gy-3">
                        <div className="col-md">
                            <Image src={ImageDataReport} fluid />
                        </div>
                        <div className="col-md align-self-center">
                            <h1>Quick Results</h1>
                            <p className='fs-4 mt-4 text-secondary'>Delivers quick results for each poll  and maximizes the use of charts and relevant visual tools to display result and statistics.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </AppLayout>
    )
}

export default Home
