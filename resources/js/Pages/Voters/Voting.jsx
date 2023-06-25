import AppLayout from '@/Layouts/AppLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import PollIcon from '../../../images/poll-icon-1.png';
import PollImage from '../../../images/analytics.png';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import VotingImage from '../../../images/voting.png';
import ThumbsUp from '../../../images/thumbs-up.png'
import axios from 'axios';
const Voting = ({ auth, poll }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });
    const [isLoaded, setIsLoaded] = useState(false)
    const [index, setIndex] = useState(0);
    const [polls, setPolls] = useState(poll.option_groups)
    const [pollGroup, setPollGroup] = useState(null)
    const [voteSelections, setVoteSelections] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const initVote = () => {
        let selectionList = [];
        let selection = {};

        for (let p of polls) {
            selectionList.push(
                {
                    groupId: p.id,
                    optionId: null
                }
            )
        }

        setVoteSelections(selectionList);
    }
    useEffect(() => {
        initVote();
        setIndex(0)
    }, []);
    useEffect(() => {
        if (isLoaded) {
            setPollGroup(polls[index])

        } else {
            setTimeout(() => {
                setPollGroup(polls[index])
                setIsLoaded(true)
            }, 1500)
        }
    }, [index])


    // save selections on change
    // useEffect(())

    const getSelectedOption = (groupId) => {
        if (voteSelections && voteSelections.length > 0) {
            for (let selection of voteSelections) {
                if (selection.groupId == groupId) {
                    return selection.optionId
                }
            }
        }
        return null;
    }

    const setSelectedOption = (groupId, optionId) => {
        if (voteSelections && voteSelections.length > 0) {
            let tempSelections = [...voteSelections]

            for (let x = 0; x < tempSelections.length; x++) {
                if (tempSelections[x].groupId == groupId) {
                    tempSelections[x].optionId = optionId
                }
            }

            setVoteSelections(tempSelections);
        }
    }


    const submitVote = (e) => {
        e.preventDefault()
        setIsLoading(true)
        var formData = new FormData();
        for (let selection of voteSelections) {
            formData.append('option_ids[]', selection.optionId)
        }

        formData.append('user_id', auth.user.id)
        formData.append('poll_id', poll.id);
        axios.post('/votes/add', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setIsLoading(false)
                console.log('res: ', res)
                window.location = route('voter_poll', { code: poll.poll_code.code });
            })
            .catch(err => {
                setIsLoading(false)
                console.log('error: ', err)
            })
    }

    return (
        <AppLayout auth={auth} noBg>
            <Head title={poll.title} />
            <section className="voters-poll pt-5 mt-3 fw-bolder fs-inter">
                <div className="bg-purple-secondary w-100 ">
                    <div className="container pt-3 pb-2 text-center">
                        <div className='my-0'>
                            <Image fluid className='my-1' src={PollIcon} />
                        </div>
                        <h3 className='my-1 text-light fw-bolder text-center me-2'>
                            {poll.title}
                        </h3>
                        <p className="my-1 text-light fw-medium">{poll.description}</p>
                    </div>
                </div>

                <div className="container mt-3">
                    <button type='button' onClick={() => history.back()} className='btn btn-light border shadow-sm '>
                        <i className='bx bx-arrow-back'></i>
                    </button>
                    {/* <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card p-xl-3 px-3 mb-3 position-relative">
                                <div className="card-body ">
                                    <Image src={PollIcon} fluid className='voting-card-image' />
                                    <div className="row align-items-center gy-3 ">
                                        <div className="col-md">
                                            <div className="">
                                                <h1 className='fw-bold text-uppercase mb-3'>{poll.title}</h1>
                                                <h5>{poll.description}</h5>
                                            </div>
                                            <hr />
                                            <p className=' fw-medium'>You are voting as <span className="fw-bolder">{auth.user.firstname + " " + auth.user.lastname}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <form onSubmit={submitVote}>
                        {
                            pollGroup || index >= polls.length ? (
                                index < polls.length ? (
                                    <div className="card mt-3 bg-dark-purple p-xl-3 p-3 voting-card">
                                        <div className="card-body">
                                            <p className="text-center text-white-50 my-1">
                                                <small>{index + 1} of {polls.length}</small>
                                            </p>
                                            <h3 className=' fw-bold text-light'>{pollGroup.title}</h3>
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
                                                                            checked={getSelectedOption(pollGroup.id) == option.id}
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
                                                                                        checked={getSelectedOption(pollGroup.id) == option.id}
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
                                            <div className="d-flex">
                                                <div className="me-auto">
                                                    <button onClick={() => setIndex(index - 1)} disabled={index - 1 < 0} className="btn btn-secondary px-lg-4 px-3 rounded-1" type='button'>
                                                        <i className='bx bx-arrow-back me-1'></i>
                                                        Back
                                                    </button>
                                                </div>
                                                <div className="">
                                                    <button onClick={() => setIndex(index + 1)} disabled={index + 1 > polls.length || getSelectedOption(pollGroup.id) == null} className="btn btn-light px-lg-4 px-3 rounded-1" type='button'>
                                                        Next <i className='bx bx-right-arrow-alt'></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div className="card mt-3 bg-dark-purple p-xl-4 p-3 voting-card">
                                        <div className="card-body">
                                            <button onClick={() => setIndex(index - 1)} className='btn btn-dark-purple text-uppercase' type='button'>
                                                <i className='bx bx-arrow-back text-light me-1'></i>
                                                <span>
                                                    <small>Go Back</small>
                                                </span>
                                            </button>
                                            <div className="text-center text-light">
                                                <Image src={ThumbsUp} fluid className='mb-4' />
                                                <h1 className='fw-bolder mb-4'>That's it !</h1>
                                                <h5 className='mb-4 fw-medium text-white-50'>You may now can click on the submit button to record your vote.</h5>
                                                <div className="">
                                                    <Button type="submit" disabled={isLoading} variant='light'>
                                                        {isLoading ? (
                                                            <>
                                                                Submit Vote
                                                                <Spinner animation='border' size='sm' />
                                                            </>
                                                        ) : (
                                                            <>
                                                                Submit Vote <i className=' bx bx-right-arrow-alt'></i>
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="text-center">
                                    <div className='mb-4'>
                                        <Spinner animation="border" size='lg' role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                    <p className='fw-medium fs-5'>Preparing poll...</p>
                                </div>
                            )
                        }
                    </form>
                </div>
            </section >
        </AppLayout >
    )
}

export default Voting
