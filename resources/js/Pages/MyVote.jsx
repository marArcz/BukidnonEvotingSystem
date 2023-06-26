import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import PollIcon from '../../images/poll-icon-1.png';
import { Button, Form, Image } from 'react-bootstrap';
import VotersImage from '../../images/voters.png';

const MyVote = ({ auth, poll, votes }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    // const [polls, setPolls] = useState(poll.option_groups)

    // const getSelectedOption = (groupId) =>{
    //     for(let vote of votes)
    // }

    return (
        <AppLayout noBg auth={auth}>
            <Head title={poll.title} />
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-purple-secondary w-100 ">
                    <div className="container pt-4 pb-3 d-flex justify-content-center align-items-end">
                        <h3 className='my-3 text-light fw-bolder text-uppercase text-center me-2'>
                            Online Voting
                        </h3>
                        <div className='my-0'>
                            <Image fluid className='my-3' src={PollIcon} />
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <Link href={route('voter_poll',{code:poll.poll_code.code})} className='btn btn-light border shadow-sm mb-3'>
                        <i className='bx bx-arrow-back'></i>
                    </Link>
                    <div className="card shadow-sm border">
                        <div className="card-body p-xl-4 px-3">
                            <div className="row gy-4 align-items-center">
                                <div className="col-md">
                                    <h1 className='fw-bold'>{poll.title}</h1>
                                    <p className=' fw-medium'>{poll.description}</p>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="border-end border-secondary px-1">
                                                <div className="d-flex align-items-center">
                                                    <div className='me-3'>
                                                        {/* <Image src={VotersImage} fluid /> */}
                                                        <div className="circle-icon bg-purple-secondary bg-opacity-10 text-purple-secondary p-4">
                                                            <i className=' bx bxs-user fs-5'></i>
                                                        </div>
                                                    </div>
                                                    <div className=' text-center'>
                                                        <p className="my-0 text-start text-dark fw-medium">No of voters</p>
                                                        <p className="my-0  text-start">{poll.participants?.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className=" px-1">
                                                <div className="d-flex align-items-center">
                                                    <div className='me-3'>
                                                        {/* <Image src={VotersImage} fluid /> */}
                                                        <div className="circle-icon bg-primary bg-opacity-10 text-primary p-4">
                                                            <i className=' bx bx-check fs-3'></i>
                                                        </div>
                                                    </div>
                                                    <div className=' text-center'>
                                                        <p className="my-0 text-start text-dark fw-medium">Already voted</p>
                                                        <p className="my-0  text-start">{poll.participants?.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="alert alert-info">
                            <i className=' bx bx-info-circle me-2'></i>
                            <span>Showing your submitted vote</span>
                        </div>
                        {
                            poll && poll.option_groups.map((pollGroup, index) => (
                                <div className='card bg-dark-purple p-xl-3 p-3 voting-card mb-3' key={index}>
                                    <div className="card-body text-light p-3 p-xl-4">
                                        <h4 className='fw-bold'>{pollGroup.title}</h4>
                                        <div>
                                            <p className=' text-white-50 mt-0 mb-2 fw-medium'>Choose:</p>
                                            {
                                                pollGroup.type.toLowerCase() == 'text only' ? (
                                                    pollGroup.options.map((option, optionIndex) => (
                                                        <div className="option-item p-3 rounded-2 voting mb-3" onClick={() => setSelectedOption(pollGroup.id, option.id)} key={optionIndex}>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="h-100 ">
                                                                        <p className="fs-5 my-1 text-light">{option.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <Form.Check
                                                                        className='radio-purple'
                                                                        type="radio"
                                                                        checked={votes[index]?.option_id == option.id}
                                                                        name={`poll-option-group-${index}`}
                                                                        onChange={() => setSelectedOption(pollGroup.id, option.id)}
                                                                        id={`poll-option-${option.id}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="row">
                                                        {
                                                            pollGroup.options.map((option, optionIndex) => (
                                                                <div className="col-md-12" key={optionIndex}>
                                                                    <div onClick={() => setSelectedOption(pollGroup.id, option.id)} className="option-item with-image p-3 voting mb-3" key={optionIndex}>
                                                                        <div className="row gx-1">
                                                                            <div className="col h-100">
                                                                                <div className="row gx-lg-3 gx-1 gy-2 align-items-center">
                                                                                    <div className="col-auto text-center h-100 d-flex justify-content-center align-items-center">
                                                                                        {
                                                                                            option.image && option.image !== '' ? (
                                                                                                <div className="border-end pe-3 border-secondary image-wrapper">
                                                                                                    <Image thumbnail fluid src={option.image} />
                                                                                                </div>
                                                                                            ) : (
                                                                                                <Button onClick={() => uploadPollImage(index, optionIndex)} variant='dark' className=' h-100 select-image-btn bg-opacity-5'>
                                                                                                    <i className=' bx bx-image me-2'></i>
                                                                                                    Upload an image
                                                                                                </Button>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                    <div className="col h-100 align-self-baseline ">
                                                                                        <div className="h-100 ">
                                                                                            <p className="fs-5 my-1 text-light">{option.name}</p>
                                                                                            <p className="fs-6 fw-light my-1 text-light">{option.description}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <Form.Check
                                                                                    className='radio-purple'
                                                                                    type="radio"
                                                                                    checked={votes[index].option_id == option.id}
                                                                                    name={`poll-option-group-${index}`}
                                                                                    onChange={() => setSelectedOption(pollGroup.id, option.id)}
                                                                                    id={`poll-option-${option.id}`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default MyVote
