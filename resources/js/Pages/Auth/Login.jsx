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
export default function Login({ auth, status, canResetPassword, session }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <AppLayout auth={auth} noBg>
            <Head title="Log in" />
            <section className='login p-0'>
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
                    <div className="col-md box-border d-grid align-items-center position-relative col-bg p-lg-4 p-3">
                        <div className="img-ext-wrapper ">
                            {/* <img src={ImageExt} alt="" className='img-fluid' /> */}
                            <div className="img-ext"></div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className="col-md-8 text-start">
                                <h1 className=' text-dark text-uppercase mb-4 fw-bolder text-start'>Log In Here</h1>
                                <div className='w-100'>
                                    {session.error && (
                                        // <p className=' fs-5 text-danger'>{session.error}</p>
                                        <Alert variant='danger' dismissible>
                                            {session.error}
                                        </Alert>
                                    )}
                                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                                    <form onSubmit={submit}>
                                        <div className='mb-3'>
                                            <Form.Label className='text-dark fs-5' htmlFor="username">
                                                <i className=' bx bxs-user'></i> Username
                                            </Form.Label>
                                            <Form.Control
                                                size='lg'
                                                type='text'
                                                id="username"
                                                name="username"
                                                value={data.username}
                                                autoComplete='username'
                                                className="mt-1 custom"
                                                placeholder='Enter your username'
                                                onChange={(e) => setData('username', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.username} className="mt-2" />
                                        </div>
                                        <div className='mb-3'>
                                            <Form.Label className='text-dark fs-5' htmlFor="password">
                                                <i className=' bx bxs-lock'></i> Password
                                            </Form.Label>
                                            <Form.Control
                                                size='lg'
                                                type='password'
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 custom"
                                                placeholder='Enter your pasword'
                                                autoComplete="password"
                                                isFocused={true}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Check
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                name='remember'
                                                type='checkbox'
                                                checked={data.remember}
                                                id="remember-me"
                                                className=' text-dark custom'
                                                label='Remember me'
                                            />
                                        </div>
                                        <div className="text-end">
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className=" link-dark"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}
                                        </div>
                                        <Button type='submit' variant='dark' size='lg' className=' text-uppercase rounded-3 col-12 my-3' disabled={processing}>
                                            Log in
                                        </Button>

                                        <p className='mb-3 mt-4 text-dark text-start '>
                                            No account yet? <a className=' link-dark fw-bolder' href={route('register')}>Register here</a>
                                        </p>
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
