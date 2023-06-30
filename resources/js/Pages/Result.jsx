import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import PollIcon from '../../images/poll-icon-1.png';
import { Badge, Button, Collapse, Form, Image, OverlayTrigger, Popover } from 'react-bootstrap';
import VotersImage from '../../images/voters.png';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, elements } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TextProfilePic from '@/Components/TextProfilePic';
import ProfilePhoto from '@/Components/ProfilePhoto';
import LoadingButton from '@/Components/LoadingButton';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
/* ES6 */
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import ModalComponent from '@/Components/ModalComponent';

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = ({ auth, poll, votes }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [optionColors, setOptionColors] = useState([]);
    const [showVotes, setShowVotes] = useState([].fill(false, 0, poll?.option_group?.length))
    const [generatingPdf, setGeneratingPdf] = useState(false)
    const [imageResultUri, setImageResultUri] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        let colorList = []
        for (let group of poll.option_groups) {
            for (let option of group.options) {
                colorList.push({
                    optionId: option.id,
                    color: getRandomColor()
                });
            }
        }
        console.log('colors count: ', colorList)
        setOptionColors(colorList);
    }, [])

    const getOptionColor = (option) => {
        for (let optionColor of optionColors) {
            if (option.id == optionColor.optionId) {
                return optionColor.color;
            }
        }
        return white
    }


    const getChartData = (optionGroup) => {
        var data = {
            labels: [],
            datasets: [],
        }

        let dataset = {
            label: '# of Votes',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }

        dataset.label = optionGroup.title;

        for (let option of optionGroup.options) {
            let color = getOptionColor(option);
            console.log('chart item color: ', color)
            data.labels.push(option.name);
            dataset.data.push(option.votes.length)
            dataset.backgroundColor.push(color)
            dataset.borderColor.push(color)
        }
        data.datasets.push(dataset)

        return data;
    };

    const statsChart = () => {

    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return optionColors.includes(color) ? getRandomColor() : color;
    }

    const votePercentage = (option) => {
        let optionGroupVotes = 0;
        let totalVotes = 0;

        for (let vote of votes) {
            if (option.option_group_id == vote.option.option_group_id) {
                optionGroupVotes++;
            }
            if (vote.option_id == option.id) {
                totalVotes++;
            }
        }

        // get percentage
        let percentage = totalVotes > 0 ? (totalVotes / optionGroupVotes) * 100 : 0;
        percentage = percentage > 0 ? Math.round(percentage) : percentage

        return percentage
    }
    const getVoteCount = (option) => {
        let optionGroupVotes = 0;
        let totalVotes = 0;
        for (let vote of votes) {

            if (vote.option_id == option.id) {
                totalVotes++;
            }
        }
        return totalVotes
    }

    const onShowVoteClicked = (index) => {
        let states = [...showVotes]
        states[index] = !states[index];

        setShowVotes(states)
    }

    const votedCount = () => {
        let count = 0;
        for (let voter of poll.participants) {
            if (voter.has_voted) count++;
        }

        return count;
    }

    const voterInfoPopover = (voter) => {
        return (
            <Popover id={`popover-voter-${voter.id}`} className='rounded-0 px-2'>
                {/* <Popover.Header className=' bg-purple-secondary text-light' as="h3">Voter Info</Popover.Header> */}
                <Popover.Body>
                    <div className="text-start d-flex align-items-center">
                        <div className="my-0 me-2">
                            {
                                voter.photo ? (
                                    <ProfilePhoto className="border border-2 shadow-sm" size='sm' image={voter.photo} />
                                ) : (
                                    <TextProfilePic bg='purple-secondary' classname="sm shadow-sm border mx-auto" fluid text={voter.firstname[0] + voter.lastname[0]} />
                                )
                            }
                        </div>
                        <div>
                            <p className="my-0 fs-5">{voter.firstname} {voter.lastname}</p>
                            <p className="my-0 text-secondary">Voter</p>
                        </div>

                    </div>
                </Popover.Body>
            </Popover>
        )
    }

    const downloadResult = (e) => {
        var element = document.getElementById('poll-result')
        // html2pdf().from(element).set(opt).save()
        // .then()
        setGeneratingPdf(true);
        htmlToImage.toPng(element)
            .then(function (dataUrl) {
                // var img = new Image();
                // img.src = dataUrl;
                // document.body.appendChild(img);
                console.log(dataUrl)
                setGeneratingPdf(false);
                setImageResultUri(dataUrl);
                setShowModal(true)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }

    return (
        <AppLayout noBg auth={auth}>
            <Head title={poll.title} />
            <div className="btn-download-container">
                <LoadingButton loading={generatingPdf} onClick={downloadResult} variant="purple-secondary" spinnerVariant="light" type='button'>
                    Save Result
                    <i className=' bx bx-download ms-2'></i>
                </LoadingButton>
            </div>
            <ModalComponent size="lg" title="Poll Result" show={showModal} handleClose={() => setShowModal(false)}>
                <div>
                    <div className="text-end">
                        <a href={imageResultUri} download={poll.title + ' - Result.jpeg'} target='_blank' className='btn btn-purple-secondary mb-2'>
                            Download
                        </a>
                    </div>
                    <div className=' text-center'>
                        <Image fluid src={imageResultUri} className='' />
                    </div>
                </div>
            </ModalComponent>
            <section className="voters-poll fw-bolder fs-inter">
                <div className="bg-purple-secondary w-100 ">
                    <div className="container py-3 d-flex justify-content-center align-items-end">
                        <h3 className='my-3 text-light fw-bolder text-uppercase text-center me-2'>
                            Poll Result
                        </h3>
                        <div className='my-0'>
                            <Image fluid className='my-3' src={PollIcon} />
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="d-flex align-items-center justify-content-sm-between mb-3">
                        <button type='button' onClick={() => history.back()} className='btn btn-light border shadow-sm '>
                            <i className='bx bx-arrow-back'></i>
                        </button>

                    </div>
                    {/* poll result container */}
                    <div id='poll-result'>
                        <div className="card">
                            <div className="card-body p-xl-4 px-3">
                                <div className="row gy-4 align-items-center">
                                    <div className="col-xl">
                                        <div className='d-flex'>
                                            <h1 className='fw-bold me-2'>
                                                {poll.title}
                                            </h1>
                                            <div>
                                                {
                                                    poll.status == 'Live' ? (
                                                        <Badge bg='success'>Live <i className='bx bx-broadcast'></i></Badge>
                                                    ) : (
                                                        <Badge bg='danger'>{poll.status}</Badge>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <p className=' fw-medium'>{poll.description}</p>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="border-end border-secondary px-1">
                                                    <div className="d-flex align-items-center">
                                                        <div className='me-3'>
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
                                                            <p className="my-0  text-start">{votedCount()}</p>
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
                            {
                                optionColors.length > 0 && poll && poll.option_groups.map((pollGroup, index) => (
                                    <div key={index}>
                                        <div className='card bg-dark-purple p-xl-3 p-3 voting-card mb-3' >
                                            <div className="card-body text-light p-3 p-xl-4">
                                                <h4 className='fw-bold'>{pollGroup.title}</h4>
                                                <div>
                                                    <p className=' text-white-50 mt-0 mb-2 fw-medium'>Options:</p>
                                                    {
                                                        pollGroup.type.toLowerCase() == 'text only' ? (
                                                            <div className="row ">
                                                                <div className="col-lg align-self-end">
                                                                    {
                                                                        pollGroup.options.map((option, optionIndex) => (
                                                                            <div className="option-item p-3 rounded-2 statistics mb-3" onClick={() => setSelectedOption(pollGroup.id, option.id)} key={optionIndex}>
                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        <div className="h-100 ">
                                                                                            <p className="fs-5 my-1 text-light">{option.name}</p>
                                                                                            <div className="vote-line-statistics py-1 rounded-pill my-0" style={{ width: `${votePercentage(option) == 0 ? 1 : votePercentage(option)}%`, backgroundColor: getOptionColor(option) }}>
                                                                                            </div>
                                                                                            <p className='my-0'><small>{getVoteCount(option)}</small></p>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-auto align-self-end">
                                                                                        <p className="my-0">{votePercentage(option)}%</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <Doughnut data={getChartData(pollGroup)} />
                                                                </div>

                                                            </div>
                                                        ) : (
                                                            <div className="row align-items-end gy-3">
                                                                <div className="col-xl">
                                                                    <div className="row">
                                                                        {
                                                                            pollGroup.options.map((option, optionIndex) => (
                                                                                <div className="col-12" key={optionIndex}>
                                                                                    <div onClick={() => setSelectedOption(pollGroup.id, option.id)} className="option-item with-image p-3 statistics mb-3" key={optionIndex}>
                                                                                        <div className="row gx-2">
                                                                                            <div className="col h-100">
                                                                                                <div className="row gx-lg-3 gx-1 gy-2 align-items-center">
                                                                                                    <div className="col-md-auto text-center h-100 d-flex justify-content-center align-items-center">
                                                                                                        {
                                                                                                            option.image && option.image !== '' ? (
                                                                                                                <div className="border-lg-end pe-2 border-secondary image-wrapper">
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
                                                                                                        <div className="h-100 mx-2">
                                                                                                            <p className="fs-5 my-1 text-light">{option.name}</p>
                                                                                                            <p className="fs-6 fw-light mb-3 my-1 text-light">{option.description}</p>
                                                                                                            <div className="vote-line-statistics py-1 rounded-pill my-0" style={{ width: `${votePercentage(option) == 0 ? 1 : votePercentage(option)}%`, backgroundColor: getOptionColor(option) }}>
                                                                                                            </div>
                                                                                                            <Badge bg='secondary' className='my-0 text-light fw-bold'><small>{getVoteCount(option)}</small></Badge>

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-auto align-self-end ">
                                                                                                <p className="my-0">{votePercentage(option)}%</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <Doughnut data={getChartData(pollGroup)} />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <div>
                                                        <button type='button' onClick={() => onShowVoteClicked(index)} className='btn mb-2 btn-secondary bg-opacity-10 mt-3'>
                                                            {showVotes[index] ? 'Hide' : 'Show'} Votes <i className={`bx ${showVotes[index] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                                                        </button>
                                                        <Collapse in={showVotes[index]}>
                                                            <div id="example-collapse-text">
                                                                <hr />
                                                                {
                                                                    <div>
                                                                        {
                                                                            pollGroup.options.map((voteOption, voteOptionIndex) => (
                                                                                <div className="card bg-secondary bg-opacity-10" key={voteOptionIndex}>
                                                                                    <div className="card-body">
                                                                                        <Badge bg='purple-secondary' className='mt-1 mb-3 text-light fs-6 bg-opacity-0'>{voteOption.name}</Badge>
                                                                                        <div className='row gx-2 gy-3'>
                                                                                            <p className='mb-1 text-white-50 fw-light'><small>Users who voted this option:</small></p>
                                                                                            {
                                                                                                voteOption.votes.map((vote, voteIndex) => (
                                                                                                    <div className="col-lg-auto col-auto" key={voteIndex}>

                                                                                                        <OverlayTrigger trigger="hover" placement="top" overlay={voterInfoPopover(vote.participant.user)}>
                                                                                                            <div>
                                                                                                                {
                                                                                                                    vote.participant.user.photo ? (
                                                                                                                        <ProfilePhoto className="border border-3 border-dark-purple shadow-sm" image={vote.participant.user.photo} size='sm' />
                                                                                                                    ) : (
                                                                                                                        <TextProfilePic bg='secondary' classname="sm border shadow-sm" fluid text={vote.participant.user.firstname[0] + vote.participant.user.lastname[0]} />
                                                                                                                    )
                                                                                                                }
                                                                                                            </div>
                                                                                                        </OverlayTrigger>
                                                                                                    </div>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>

                                                                }
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Result
