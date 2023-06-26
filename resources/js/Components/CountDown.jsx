import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const CountDown = ({ endDate }) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        setCountdown(getTimeDifference(new Date(),endDate))
        let i = setInterval(()=> setCountdown(getTimeDifference(new Date(),endDate)), 1000);
    }, [])


    return (
        <>
            <div className='countdown'>
                <div className="text-center me-3">
                    <div className='tick-wrapper'>
                        <p className='my-0 text-light-purple'>{countdown.days >= 10 ? countdown.days : `0${countdown.days}`}</p>
                    </div>
                    <p className='my-0'><small>DAYS</small></p>
                </div>
                <div className="text-center me-3">
                    <div className='tick-wrapper'>
                        <p className='my-0 text-light-purple'>{countdown.hours >= 10 ? countdown.hours : `0${countdown.hours}`}</p>
                    </div>
                    <p className='my-0'><small>HOURS</small></p>
                </div>
                <div className="text-center me-3">
                    <div className='tick-wrapper'>
                        <p className='my-0 text-light-purple'>{countdown.minutes >= 10 ? countdown.minutes : `0${countdown.minutes}`}</p>
                    </div>
                    <p className='my-0'><small>MINUTES</small></p>
                </div>
                <div className="text-center me-3">
                    <div className='tick-wrapper'>
                        <p className='my-0 text-light-purple'>{countdown.seconds >= 10 ? countdown.seconds : `0${countdown.seconds}`}</p>
                    </div>
                    <p className='my-0 mx-1'><small>SECONDS</small></p>
                </div>
            </div>
        </>
    )
}

export const getTimeDifference = (from, to) => {
    const msInDay = 86400000
    const msInHour = 3600000
    const msInMinute = 60000
    const msInSecond = 1000


    let today = from;
    let date = to;

    let todayTime = today.getTime()
    let dateTime = date.getTime();

    var calc;

    if (todayTime > dateTime) {
        calc = new Date(todayTime - dateTime);
    } else {
        calc = new Date(dateTime - todayTime);
    }

    let timeDiff = dateTime - todayTime;
    let daysDiff = timeDiff < msInDay ? 0 : Math.floor(timeDiff / msInDay);
    let hoursDiff = timeDiff % msInDay
    let minutesDiff = hoursDiff % msInHour
    let secondsDiff = minutesDiff % msInMinute

    // convert
    let days = daysDiff;
    let hours = Math.floor(hoursDiff / msInHour)
    let minutes = Math.floor(minutesDiff / msInMinute)
    let seconds = Math.floor(secondsDiff / msInSecond)

    return {
        days,
        hours,
        minutes,
        seconds
    }
}

export default CountDown
