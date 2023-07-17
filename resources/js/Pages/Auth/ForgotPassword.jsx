import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Alert, Button, Form, Image } from 'react-bootstrap';
import VotingImage from '../../../images/voting-dark.png';
import AppBgOverlay from '@/Components/AppBgOverlay';
import ImageExt from '../../../images/dark-ext.png'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AppLayout noBg>
            <section className="login p-0">
                <div className="row g-0 login-form min-vh-100">
                    <div className="col-md-5 col-left box-border bg-purple-gray d-grid align-items-center p-xl-4 p-3">
                        <div className="text-center text-light">
                            <div className="row justify-content-center ">
                                <div className="col-xl-8 col-lg-8 col-md-7 col-5">
                                    <Image src={VotingImage} fluid />
                                </div>
                            </div>
                            <p className=' mt-3 text-shadow fs-4 col-xl-7 col-12 justify-content-center mx-auto text-uppercase text-title fw-medium'>
                                Bukidnon classic custom voting system
                            </p>
                        </div>
                    </div>
                    <div className="col-md box-border d-grid align-items- position-relative col-bg p-lg-4 p-3">
                        <div className="img-ext-wrapper ">
                            {/* <img src={ImageExt} alt="" className='img-fluid' /> */}
                            <div className="img-ext"></div>
                        </div>
                        <div className="row justify-content-center mt-xl-4">
                            <div className="col-md-10 text-start">
                                <Head title="Forgot Password" />
                                <h1 className=' text-dark text-uppercase mb-4 fw-bolder text-start'>Forgot Password</h1>

                                <div className="mb-5 text-sm ">
                                    <p className='mb-2'>Forgot your password?</p>
                                    <p>No problem. Just let us know your email address and we will email you a password
                                        reset link that will allow you to choose a new one.</p>
                                </div>

                                {status && <div className="mb-4 font-medium text-sm text-light-purple">{status}</div>}

                                <form onSubmit={submit}>
                                    <div className='mb-3'>
                                        <Form.Control
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 custom text-center"
                                            placeholder='Enter your email address'
                                            autoComplete="email"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            size='lg'
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <InputError message={errors.email} className="mt-2" />

                                    <div className="d-grid">
                                        <Button type='submit' variant='dark' disabled={processing}>
                                            Email Password Reset Link
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
