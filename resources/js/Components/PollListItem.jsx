import React from 'react'
import PieChart from '../../images/pie-chart.png'
import { Image } from 'react-bootstrap';

const PollListItem = ({ poll }) => {
    const pollImage = poll.status == 'Live' ? PieChart : PieChart;
    return (
        <div className='poll-list-item'>
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <Image src={pollImage} fluid/>
                </div>
                <div className="col-md">

                </div>
            </div>
        </div>
    )
}

export default PollListItem
