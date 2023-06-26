import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import AppLayout from '@/Layouts/AppLayout';
import AppBgOverlay from '@/Components/AppBgOverlay';
import Footer from '@/Components/Footer';
import VotingImage from '../../../images/voting (2).png';
import ImageExt from '../../../images/dark-ext.png'
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
        <AppLayout auth={auth} noBg>
            <Head title="Register" />
            <section className='login p-0'>
                <div className="row g-0 login-form min-vh-100">
                    <div className="col-md-5 col-left box-border bg-purple-gray d-grid align-items-center p-xl-4 p-3">
                        <div className="text-center text-light">
                            <div className="row justify-content-center ">
                                <div className="col-xl-8 col-lg-8 col-md-7 col-5">
                                    <Image src={VotingImage} fluid />
                                </div>
                            </div>
                            <p className=' mt-3 text-shadow fs-4 col-xl-7 col-12 justify-content-center mx-auto text-uppercase fw-medium'>
                                Bukidnon classic custom voting system
                            </p>
                        </div>
                    </div>
                    <div className="col-md box-border d-grid align-items-center position-relative col-bg p-lg-4 p-3">
                        <div className="img-ext-wrapper ">
                            {/* <img src={ImageExt} alt="" className='img-fluid' /> */}
                            <div className="img-ext"></div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-10 text-start">
                                <h2 className=' text-dark mt-3 text-uppercase mb-4 fw-bolder text-start'>Sign up here</h2>
                                <div className='w-100'>
                                    <form onSubmit={submit}>
                                        <div className='mb-3'>
                                            <div className="row gy-3">
                                                <div className="col-md">
                                                    <Form.Label htmlFor="name">Firstname</Form.Label>
                                                    <Form.Control
                                                        size='lg'
                                                        id="name"
                                                        name="name"
                                                        value={data.firstname}
                                                        className="custom"
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
                                                        size='lg'
                                                        id="lastname"
                                                        name="lastname"
                                                        value={data.lastname}
                                                        className="custom"
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
                                            <div className="row gy-3">
                                                <div className="col-md">
                                                    <Form.Label htmlFor="email">Email Address</Form.Label>
                                                    <Form.Control
                                                        size='lg'
                                                        id="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="custom"
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
                                                        size='lg'
                                                        id="username"
                                                        name="username"
                                                        value={data.username}
                                                        className="custom"
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
                                                size='lg'
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="custom"
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
                                                size='lg'
                                                id="confirm-password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password-confirmation"
                                                value={data.password_confirmation}
                                                className="custom"
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
                                            <Button type='submit' variant='blue' size='lg' disabled={processing}>
                                                Register
                                                {processing && (
                                                    <Spinner
                                                        animation='border'
                                                        size='sm'
                                                        variant='light'
                                                        className='ms-2'
                                                    />
                                                )}
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                            <a href="#" className='nav-link link-dark'>Privacy Policy</a>
                                            <p className="text-dark mt-3">
                                                Already have an account? <a href={route('login')} className='link-light-purple'>Sign in</a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
