import AppLayout from '@/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import Image404 from '../../images/404.png'
import Image401 from '../../images/unathorized.webp'
import { Link } from '@inertiajs/react'
const ErrorPage = ({ auth, status }) => {

    const [error, setError] = useState(null)

    useEffect(() => {
        if (status == 404) {
            let error = {
                image: Image404,
                title: 'Page Not Found',
                message: 'This only means that the page you are accessing does not exist in our server.'
            }

            setError(error);
        } else {
            let error = {
                image: Image401,
                title: 'User Unauthorized',
                message: 'Sorry you are not authorized to access this page.'
            }

            setError(error);
        }
    }, [])


    return (
        <AppLayout noBg auth={auth} noShadowHeader>
            <section>
                <div className="container">
                    {
                        error && (
                            <div className="row gx-3">
                                <div className="col-md">
                                    <Image src={error.image} fluid />
                                </div>
                                <div className="col-md align-self-center">
                                    <div className='px-3 py-2 text-light rounded-pill bg-purple d-inline-block'>
                                        <p className='my-1'>{error.title}</p>
                                    </div>
                                    <h1 className='text-bigger mt-3 fw-medium'>Error <span className=' text-purple fw-bolder'>{status}</span></h1>
                                    <h3 className='mt-3 text-secondary'>{error.message}</h3>

                                    <div className="mt-3">
                                        <Link href={route('home')} className="btn btn-dark py-2 px-3 rounded-pill">Back to homepage</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </AppLayout>
    )
}

export default ErrorPage
