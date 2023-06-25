import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Form } from 'react-bootstrap';
import AppLayout from '@/Layouts/AppLayout';
import AppBgOverlay from '@/Components/AppBgOverlay';
import Footer from '@/Components/Footer';

export default function Register({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
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
        post(route('register'));
    };

    return (
        <AppLayout auth={auth}>
            <AppBgOverlay bottom={false} />
            <section className="register">
                <div className="container">
                    <Head title="Register" />
                    <h1 className='mt-3 mb-4 text-center fw-bolder page-title'>Create New Account</h1>

                    <div className="card bg-dark-purple text-light rounded-4 p-3">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md">
                                            <Form.Label htmlFor="name">Firstname</Form.Label>
                                            <Form.Control
                                                id="name"
                                                name="name"
                                                value={data.firstname}
                                                className="mt-1 custom"
                                                placeholder='Enter your firstname'
                                                autoComplete="firstname"
                                                isFocused={true}
                                                onChange={(e) => setData('firstname', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.firstname} className="mt-2" />
                                        </div>
                                        <div className="col-md">
                                            <Form.Label htmlFor="lastname">Lastname</Form.Label>
                                            <Form.Control
                                                id="lastname"
                                                name="lastname"
                                                value={data.lastname}
                                                className="mt-1 custom"
                                                placeholder='Enter your lastname'
                                                autoComplete="lastname"
                                                isFocused={true}
                                                onChange={(e) => setData('lastname', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.lastname} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md">
                                            <Form.Label htmlFor="email">Email Address</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 custom"
                                                placeholder='Enter your email address'
                                                autoComplete="email"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div className="col-md">
                                            <Form.Label htmlFor="username">Username</Form.Label>
                                            <Form.Control
                                                id="username"
                                                name="username"
                                                value={data.username}
                                                className="mt-1 custom"
                                                placeholder='Enter your username'
                                                onChange={(e) => setData('username', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.username} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control
                                        id="password"
                                        type={showPassword?'text':'password'}
                                        name="password"
                                        value={data.password}
                                        className="mt-1 custom"
                                        placeholder='Enter your password'
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                                    <Form.Control
                                        id="confirm-password"
                                        type={showPassword?'text':'password'}
                                        name="password-confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 custom"
                                        placeholder='Re enter your password'
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* <div className="mb-3">
                                    <Form.Check
                                        type='checkbox'
                                        id="show-password"
                                        checked={showPassword}
                                        onChange={()=>setShowPassword(!showPassword)}
                                        label='Show Password'
                                    />
                                </div> */}
                                <div className="mb-3">
                                    <Form.Check
                                        type='checkbox'
                                        id="agree-checkbox"
                                        label='I Agree to the Bukidnon e-vote privacy policy.'
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <Button type='submit' variant='light' disabled={processing}>
                                        Register
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <a href="#" className='nav-link link-light'>Privacy Policy</a>
                                    <p className="text-light">
                                        Already have an account? <a href={route('login')} className='link-light-purple'>Sign in</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </AppLayout>
    );
}
