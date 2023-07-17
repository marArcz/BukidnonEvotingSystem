import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import ImageVoting from '../../images/voting (2).png'
const Contact = ({ auth }) => {
    const { data, setData, post, processing } = useForm({
        name: '',
        message: '',
        email: ''
    });
    return (
        <AppLayout auth={auth} noBg>
            <Head title='Contact Us' />
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-dark w-100 ">
                    <div className="container py-3 d-flex justify-content-center align-items-end">
                        <h3 className='my-2 text-light fw-bolder text-center me-2'>
                            Contact Us
                        </h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row gy-5 h-100 align-items-baseline mt-xl-2 mt-2 pt-3">
                        <div className="col-md">
                            <h3 className='fw-bold text-uppercase'><i className=' bx bxs-map-pin'></i> Address</h3>
                            <p className='fw-medium fs-5'>Malaybalay city, Bukidnon, Philippines</p>
                        </div>
                        <div className="col-md">
                            <h3 className='fw-bold text-uppercase'><i className=' bx bxs-envelope'></i> Email</h3>
                            <p className='fw-medium fs-5'>bukidnonevote@gmail.com</p>
                        </div>
                        <div className="col-md">
                            <h3 className='fw-bold text-uppercase'><i className=' bx bxs-phone'></i> Phone</h3>
                            <p className='fw-medium fs-5'>+639363012979</p>
                        </div>
                        <div className="col-md">
                            <h3 className='fw-bold text-uppercase'>Social Media</h3>
                            <p className='fw-medium fs-5'><i className=' bx bxl-facebook'></i> BCC.facebook.com</p>
                            <p className='fw-medium fs-5'><i className=' bx bxl-twitter'></i> BCC.instagram.com</p>
                        </div>
                    </div>
                    <div className="row mt-4 justify-content-center">
                        <div className="col-md-12">
                            <h4 className='fw-bold text-uppercase mb-4'><i className=' bx bxs-message'></i> Leave us a message</h4>
                            <form>
                                <div className="row gy-3">
                                    <div className="col-md">
                                        <Form.Control
                                            className='custom'
                                            size='lg'
                                            type='text'
                                            placeholder='Your name'
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md">
                                        <Form.Control
                                            className='custom'
                                            size='lg'
                                            type='email'
                                            placeholder='Your email address'
                                            value={data.email}
                                            onChange={e => setData('email',e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea placeholder='Message' onChange={e => setData('message', e.target.value)} value={data.message} className='form-control custom' rows="10"></textarea>
                                    </div>
                                </div>

                                <div className="text-end mt-3">
                                    <Button size='lg' variant='dark' type='submit'>Send Message</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Contact
