import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import AppLayout from '@/Layouts/AppLayout';
import VotingImage from '../../../images/voting (2).png';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Container, Form, Image } from 'react-bootstrap';
import InputError from '@/Components/InputError';
import ImageVerify from '../../../images/Confirmed-pana.png'

export default function VerifyEmail({ auth, status }) {
    const { post, processing } = useForm({});
    console.log('auth: ', auth);

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AppLayout auth={auth} noShadowHeader noBg>
            <Head title="Verify Email" />
            <section className=''>
                <Container className=' text-center'>
                    <h1 className='mt-4 fw-bold text-uppercase'>
                        Verify Email
                    </h1>
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-2 col-9">
                            <Image src={ImageVerify} fluid />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <p>
                                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="text-center">
                            <div className="mt-4">
                                <Button type='submit' variant='purple-secondary' disabled={processing}>Resend Verification Email</Button>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="btn btn-secondary ms-3"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </form>
                </Container>
            </section>
        </AppLayout>
    );
}
