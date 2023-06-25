import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Form, Image } from 'react-bootstrap';
import ForgotPasswordImage from '../../../images/forgot-password.jpg';
import AppBgOverlay from '@/Components/AppBgOverlay';
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AppLayout>
            <AppBgOverlay />
            <section className="forgot-password">
                <div className="mt-4 mb-3">
                    <div className="container">
                        <h1 className='mt-3 mb-4 text-center fw-bolder page-title'>Reset Password</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card bg-dark-purple text-light p-lg-4 p-3">
                                    <div className="card-body text-center">
                                        <Head title="Forgot Password" />
                                        <div className="mb-4 text-sm ">
                                            <p className='mb-2'>Forgot your password?</p>
                                            <p>No problem. Just let us know your email address and we will email you a password
                                                reset link that will allow you to choose a new one.</p>
                                        </div>

                                        {status && <div className="mb-4 font-medium text-sm text-light-purple">{status}</div>}

                                        <form onSubmit={submit}>
                                            <div className='mb-3'>
                                                <div className="row justify-content-center">
                                                    <div className="col-lg-5">
                                                        {/* <Form.Label htmlFor="email"></Form.Label> */}
                                                        <Form.Control
                                                            id="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="mt-1 custom text-center"
                                                            placeholder='Enter your email address'
                                                            autoComplete="email"
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors.email} className="mt-2" />
                                                    </div>
                                                </div>
                                            </div>

                                            <InputError message={errors.email} className="mt-2" />

                                            <div className="flex items-center justify-end mt-4">
                                                <Button type='submit' variant='purple' disabled={processing}>
                                                    Email Password Reset Link
                                                </Button>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
