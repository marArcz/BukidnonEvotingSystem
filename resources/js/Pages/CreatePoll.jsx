import AppBgOverlay from '@/Components/AppBgOverlay'
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import VotingImage from '../../images/voting.png';
import JoinImage from '../../images/join.png';
import CreateImage from '../../images/create.png';
import InputError from '@/Components/InputError'
import ImageUploader from '@/Components/ImageUploader'
import { ShowPageLoader } from '@/Components/PageLoader'
import axios from 'axios'
import CalendarModal from '@/Components/CalendarModal'

const CreatePoll = ({ auth }) => {
    const [showImageUploaderModal, setShowImageUploaderModal] = useState(false)
    const [uploaderOptionGroupIndex, setUploaderOptionGroupIndex] = useState(null)
    const [uploaderOptionIndex, setUploaderOptionIndex] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [processing, setProcessing] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [deadline, setDeadline] = useState(null)

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    // initial empty option group
    let newOptionGroup = {
        title: '',
        type: 'Text only',
        options: [
            {
                image: '',
                name: '',
                description: ''
            },
            {
                image: '',
                name: '',
                description: ''
            }
        ]
    };

    const [optionGroups, setOptionGroups] = useState([newOptionGroup])

    const updateOptionGroup = (key, value, index) => {
        let optionGroup = optionGroups[index];
        optionGroup[key] = value
        let tempOptionGroups = [...optionGroups];
        tempOptionGroups[index] = optionGroup;

        setOptionGroups(tempOptionGroups);
    }

    const setOptionData = (optionGroupIndex, optionIndex, key, value) => {
        let optionGroup = optionGroups[optionGroupIndex];
        let option = optionGroup.options[optionIndex];
        option[key] = value;

        optionGroup.options[optionIndex] = option;
        let tempOptionGroups = [...optionGroups];
        tempOptionGroups[optionGroupIndex] = optionGroup;

        setOptionGroups(tempOptionGroups);
    }

    const addNewOption = (optionGroupIndex) => {
        let optionGroup = optionGroups[optionGroupIndex];
        optionGroup.options = [...optionGroup.options, { image: '', name: '' }]

        let tempOptionGroups = [...optionGroups];
        tempOptionGroups[optionGroupIndex] = optionGroup;

        setOptionGroups(tempOptionGroups);
    }

    const removeOption = (optionGroupIndex, optionIndex) => {
        let optionGroup = { ...optionGroups[optionGroupIndex] };
        let options = optionGroup.options.filter((value, i) => i !== optionIndex);
        optionGroup.options = options;

        let tempOptionGroups = [...optionGroups];
        tempOptionGroups[optionGroupIndex] = optionGroup
        setOptionGroups(tempOptionGroups)
    }

    const addNewOptionGroup = () => {
        let groups = [...optionGroups];
        groups.push(newOptionGroup)
        setOptionGroups(groups);
    }

    const removeOptionGroup = (index) => {
        let tempOptionGroups = optionGroups.filter((val, i) => i !== index);
        setOptionGroups(tempOptionGroups)
    }

    const onImageUploaded = (imageUrl, optionGroupIndex, optionIndex) => {
        setOptionData(optionGroupIndex, optionIndex, 'image', imageUrl);
        setShowImageUploaderModal(false)
    }

    const uploadPollImage = (optionGroupIndex, optionIndex) => {
        setUploaderOptionGroupIndex(optionGroupIndex)
        setUploaderOptionIndex(optionIndex)
        setShowImageUploaderModal(true)
    }

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true)
        // create a poll
        var formData = new FormData();
        formData.append('user_id', auth.user.id)
        formData.append('title', title)
        formData.append('description', description)
        let ddline = `${Number(deadline.getMonth()) + Number(1) < 10 ? '0' : ''}${deadline.getFullYear()}-${Number(deadline.getMonth()) + Number(1) < 10 ? Number(deadline.getMonth()) + Number(1) : Number(deadline.getMonth()) + Number(1)}-${Number(deadline.getDate()) < 10 ? '0' : ''}${deadline.getDate()}`
        formData.append('deadline', ddline)

        axios.post('/polls/add', formData,)
            .then((res) => {
                savePollOptions(res.data.poll);
            })
            .catch(err => {
                console.error(err)
                setProcessing(false)
            })
    }

    const savePollOptions = async (poll) => {
        var index = 0;
        for (let optionGroup of optionGroups) {
            var formData = new FormData()
            formData.append("poll_id", poll.id)

            formData.append('group_title', optionGroup.title);
            formData.append('group_type', optionGroup.type);

            for (let option of optionGroup.options) {

                formData.append('option_names[]', option.name);
                formData.append('option_images[]', option.image);
                formData.append('option_descriptions[]', option.description);
            }
            let res = await axios.post('/polls/options/add', formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
            console.log('res: ', res)
        }

        setProcessing(false);
        window.location = route('dashboard')

    }

    const onSelectDeadline = (date, e) => {
        setShowCalendar(false)
        setDeadline(date)
    }

    const clearDeadline = () => {
        setDeadline(null)
        setShowCalendar(false)
    }

    return (
        <>
            <ImageUploader show={showImageUploaderModal} optionGroupIndex={uploaderOptionGroupIndex} optionIndex={uploaderOptionIndex} handleClose={() => setShowImageUploaderModal(false)} onCompleted={onImageUploaded} />
            <AppLayout auth={auth} noBg>
                <Head title='Create Poll' />
                <CalendarModal handleClear={clearDeadline} show={showCalendar} handleClose={() => setShowCalendar(false)} handleSelect={onSelectDeadline} />
                <section className="poll">
                    <div className="bg-purple-secondary w-100 ">
                        <div className="container py-4 d-flex justify-content-center align-items-center">
                            <h3 className='my-0 text-light text-uppercase fw-bolder text-center me-2'>
                                Create POLL
                            </h3>
                            <div className='my-0'>
                                <div className="circle-icon">
                                    <i className=' bx bxs-plus-circle text-light fs-4'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        {/* <h2 className="text-center page-title fw-bolder mb-4">Create Poll</h2> */}
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <form onSubmit={submit}>
                                    <div className="mt-3 ">
                                        <button type='button' onClick={() => history.back()} className='btn btn-light border shadow-sm mb-3'>
                                            <i className='bx bx-arrow-back'></i>
                                        </button>
                                        <div className="text-dark">
                                            <h5 className="text-center mb-3">Complete all the fields to create your poll.</h5>

                                            <p className='text-cente text-dark-purple text-uppercase fs-5'>poll details</p>
                                        </div>
                                        <hr className=' bg-dark text-white-50' />
                                        <div className='mb-3 mt-2'>
                                            <Form.Label className='text-dark' htmlFor="title">Name of the Poll:</Form.Label>
                                            <Form.Control
                                                size='lg'
                                                type='text'
                                                id="title"
                                                name="title"
                                                value={title}
                                                className="mt-1 border-secondary"
                                                placeholder='Enter the name of the poll'
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mb-3 mt-2'>
                                            <Form.Label className='text-dark' htmlFor="description">Description (Optional):</Form.Label>
                                            <Form.Control
                                                size='lg'
                                                type='text'
                                                id="description"
                                                name="description"
                                                value={description}
                                                className="mt-1 border-secondary"
                                                placeholder='Add some information about this poll'
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3 mt-2'>
                                            <Form.Label className='text-dark' htmlFor="description">Deadline (Optional):</Form.Label>
                                            <div className="d-flex">
                                                <Form.Control
                                                    size='lg'
                                                    type='text'
                                                    readOnly
                                                    id="deadline"
                                                    onClick={() => setShowCalendar(true)}
                                                    name="deadline"
                                                    value={deadline?`${months[deadline.getMonth()]} ${deadline.getDate()<10?`0${deadline.getDate()}`:deadline.getDate()}, ${deadline.getFullYear()}`:'No Deadline'}
                                                    className={`border-secondary ${deadline?'text-dark':'text-secondary'}`}
                                                    placeholder='Set the deadline for this poll'
                                                />
                                                <div>
                                                    {/* <Button size='lg' onClick={() => setShowCalendar(true)} variant='dark' type='button'>Set</Button> */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        optionGroups && optionGroups.map((optionGroup, index) => (
                                            <div className="card bg-dark-purple mt-3 shadow-sm" key={index}>
                                                <div className="card-body p-xl-4 p-3">
                                                    <div className='mb-3'>
                                                        <Form.Label className='text-light' htmlFor={`position-${index}`}>Title or Question:</Form.Label>
                                                        <Form.Control
                                                            size='lg'
                                                            type='text'
                                                            id={`position-${index}`}
                                                            placeholder='Add title or question'
                                                            value={optionGroup.title}
                                                            className="mt-1 custom"
                                                            onChange={(e) => updateOptionGroup('title', e.target.value, index)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='mb-3 mt-2'>
                                                        <Form.Label className='text-light' htmlFor={`position-${index}`}>Voting Type:</Form.Label>
                                                        <Form.Select class onChange={(e) => updateOptionGroup('type', e.target.value, index)} value={optionGroup.type} className='bg-light form-select-lg'>
                                                            <option value="Text only">Text only</option>
                                                            <option value="Text with image">Text with image</option>
                                                        </Form.Select>
                                                    </div>
                                                    <hr />
                                                    <p className=' text-light mt-0 mb-2'>Options</p>
                                                    {
                                                        optionGroup.type.toLowerCase() == 'text only' ? (
                                                            optionGroup.options.map((option, optionIndex) => (
                                                                <div className="option-item mb-3" key={optionIndex}>
                                                                    <Form.Control
                                                                        className='custom'
                                                                        size='lg'
                                                                        type='text'
                                                                        value={option.name}
                                                                        onChange={e => setOptionData(index, optionIndex, 'name', e.target.value)}
                                                                        placeholder={`Option ${optionIndex + 1}`}
                                                                        required
                                                                    />
                                                                    {
                                                                        optionGroup.options.length > 1 && (
                                                                            <button onClick={() => removeOption(index, optionIndex)} className='btn btn-sm close-btn' type='button'>
                                                                                <i className=' fs-3 bx bx-x'></i>
                                                                            </button>
                                                                        )
                                                                    }
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="row">
                                                                {
                                                                    optionGroup.options.map((option, optionIndex) => (
                                                                        <div className="col-md-12">
                                                                            <div className="option-item with-image mb-3" key={optionIndex}>
                                                                                <div className="row gx-2 gy-2">
                                                                                    <div className="col-md-3 text-center">
                                                                                        {
                                                                                            option.image && option.image !== '' ? (
                                                                                                <Image thumbnail fluid src={option.image} />
                                                                                            ) : (
                                                                                                <Button onClick={() => uploadPollImage(index, optionIndex)} variant='dark' className=' h-100 select-image-btn bg-opacity-5'>
                                                                                                    <i className=' bx bx-image me-2'></i>
                                                                                                    Upload an image
                                                                                                </Button>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                    <div className="col-md h-100">
                                                                                        <Form.Control
                                                                                            className='custom'
                                                                                            size='lg'
                                                                                            type='text'
                                                                                            value={option.name}
                                                                                            onChange={e => setOptionData(index, optionIndex, 'name', e.target.value)}
                                                                                            placeholder={`Option ${optionIndex + 1}`}
                                                                                            required
                                                                                        />
                                                                                        <textarea onChange={e => setOptionData(index, optionIndex, 'description', e.target.value)} placeholder='Add Description (optional)' rows={5} value={option.description} className='form-control mt-1 custom'></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                {
                                                                                    optionGroup.options.length > 1 && (
                                                                                        <button onClick={() => removeOption(index, optionIndex)} className='btn btn-sm close-btn' type='button'>
                                                                                            <i className=' fs-3 bx bx-x'></i>
                                                                                        </button>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    <button onClick={() => addNewOption(index)} className="btn btn-light btn-sm " type='button'>
                                                        <i className="bx bx-plus-circle me-2"></i>
                                                        Add Option
                                                    </button>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="d-flex align-items-center">
                                                        <button onClick={addNewOptionGroup} className=' btn btn btn-light me-auto' type='button'>
                                                            <i className=' bx bxs-plus-circle'></i>
                                                        </button>
                                                        {
                                                            optionGroups.length > 1 && (
                                                                <button onClick={() => removeOptionGroup(index)} className=' btn btn btn-danger' type='button'>
                                                                    <i className=' bx bx-trash'></i>
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="row gy-2 mt-3">
                                        <div className="col-md">
                                            <Link href={route('dashboard')} className="btn btn-secondary btn-lg col-12">Discard</Link>
                                        </div>
                                        <div className="col-md">
                                            <button disabled={processing} className="btn btn-purple-secondary btn-lg col-12" type='submit'>
                                                {
                                                    !processing ? (
                                                        <span>Create Poll</span>
                                                    ) : (
                                                        <>
                                                            <span className="me-2">
                                                                Saving poll
                                                            </span>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )
                                                }
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout >
        </>
    )
}

export default CreatePoll
