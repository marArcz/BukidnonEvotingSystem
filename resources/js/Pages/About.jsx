import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Image } from 'react-bootstrap'
import ImageVoting from '../../images/voting-dark.png'
const About = ({ auth }) => {
    return (
        <AppLayout auth={auth} noBg>
            <Head title='About' />
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-dark w-100 ">
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
                            <p className='fw-medium fs-5 mt-3'>
                                A group of like minded people driven to a passion for retro style motorcycle, custom culture and cafe racing. This community represents a close-knit gathering of people who are bound together by their profound love for retro-style motorcycles. Their shared enthusiasm extends beyond mere appreciation; it delves into the intricacies of custom motorcycle culture, where each bike is a canvas for individual expression and craftsmanship. Additionally, their shared zeal for cafe racing, a style known for its blend of speed and style, unites them in the pursuit of a thrilling yet classic riding experience. These individuals don't just own motorcycles; they embrace a unique way of life, one that revolves around the timeless charm of vintage bikes and the camaraderie forged through this shared passion, creating a vibrant and tightly woven subculture within the world of motorcycling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default About
