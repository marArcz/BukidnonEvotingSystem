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
        <AppLayout headerVariant="dark" headerBg='transparent' noBg noShadowHeader auth={auth}>
            <Head title='Home' />
            {/* <AppBgOverlay full /> */}
            <section className='hero'>
                <div className="container my-lg-2 pb-4">
                    <div className="row align-items-center mt-xl-5 mt-3 gy-4">
                        <div className="col-md order-lg-0 order-1">
                            <div className="text-start mb-5 mt-lg-2">
                                <p className=' fs-5 mb-4 text-uppercase text-light'>Built for custom polls or voting.</p>
                                <h1 className=' text-light text-big fw-bolder'>Hello Riders,</h1>
                                <h1 className=' text-light text-big fw-bolder'>
                                    Welcome To Bukidnon Custom Classics Electronic Voting Platform
                                </h1>
                            </div>
                            <div>
                                <p className=' fs-5 text-light'>Create an account to start using our app.</p>
                                <Link className=' btn-lg btn btn-dark' href={route('register')}>Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Home
