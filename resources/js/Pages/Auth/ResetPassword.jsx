import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AppBgOverlay from '@/Components/AppBgOverlay';
import { Button, Form } from 'react-bootstrap';

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
        <AppLayout>
            <AppBgOverlay bottom={false} />
            <section className="reset-password">
                <div className="mt-4 mb-3">
                    <div className="container">
                        <h1 className='mt-3 mb-4 text-center fw-bolder page-title'>Change Password</h1>
                        <Head title="Reset Password" />
                        <div className="card bg-dark-purple p-lg-4 p-3">
                            <div className="card-body text-light">
                                <div className="text-center">
                                    <span className=' bx bx-check'></span>
                                    <p className=' text-center'>Please enter your new desired password below.</p>
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
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor="password">New Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            name="password"
                                            type={`${showPassword?'text':'password'}`}
                                            value={data.password}
                                            className="mt-1 custom"
                                            placeholder='Enter new password'
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                                        <Form.Control
                                            id="confirm-password"
                                            name="password_confirmation"
                                            type={`${showPassword?'text':'password'}`}
                                            value={data.password_confirmation}
                                            className="mt-1 custom"
                                            placeholder='Confirm new password'
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>


                                    <div className="row justify-content-center mt-4">
                                        <div className="col-md-4">
                                            <div className="d-grid">
                                                <Button variant='purple' className="" disabled={processing}>
                                                    Reset Password
                                                </Button>
                                            </div>
                                        </div>
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
