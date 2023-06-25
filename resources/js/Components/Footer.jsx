import React from 'react'
import { Image } from 'react-bootstrap'
import AppLogo from '../../images/app-logo.png';
const Footer = () => {
    return (
        <div className='footer'>
            <div className=" bg-dark-purple  py-3 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row mb-3">
                                <div className="col-xl-10 col-md-9 col-7">
                                    <Image fluid src={AppLogo} className='app-log' />
                                </div>
                            </div>
                            <p className=' text-light'>
                                Voting system for all type of voting you have to make.
                            </p>
                        </div>
                        <div className="col-md">

                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 bg-dark-purple border-top border-secondary">
                <div className="container">
                    <p className=' text-light my-0 text-center'>COPYRIGHT © 2023 e-Vote. All rights reserve</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
