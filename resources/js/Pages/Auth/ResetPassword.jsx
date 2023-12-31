import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AppBgOverlay from '@/Components/AppBgOverlay';
import { Button, Form, Image } from 'react-bootstrap';
import VotingImage from '../../../images/voting-dark.png';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
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
                                <h1 className='mt-3 mb-4  fw-bold'>Change Password</h1>
                                <Head title="Reset Password" />
                                <div className=" mb-3">
                                    <p className=''>Please enter your new desired password below.</p>
                                </div>
                                <form onSubmit={submit}>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor="email">Email Address</Form.Label>
                                        <Form.Control
                                            id="email"
                                            name="email"
                                            type='email'
                                            value={data.email}
                                            className="mt-1 custom"
                                            placeholder='Enter your email address'
                                            autoComplete="email"
                                            onChange={(e) => setData('email', e.target.value)}
                                            size='lg'
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor="password">New Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            name="password"
                                            type={`${showPassword ? 'text' : 'password'}`}
                                            value={data.password}
                                            className="mt-1 custom"
                                            placeholder='Enter new password'
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            size='lg'

                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                                        <Form.Control
                                            id="confirm-password"
                                            name="password_confirmation"
                                            type={`${showPassword ? 'text' : 'password'}`}
                                            value={data.password_confirmation}
                                            className="mt-1 custom"
                                            placeholder='Confirm new password'
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                            size='lg'
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>


                                    <div className="text-end">
                                        <Button type='submit' variant='dark' size='lg' className="" disabled={processing}>
                                            Reset Password
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
