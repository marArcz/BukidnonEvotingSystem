import React from 'react'
import { Image } from 'react-bootstrap';
import AppLogo from '../../images/app-logo.png';
import { createRoot } from 'react-dom/client';

export const ShowPageLoader = ({ message = "Bukidnon Classic Customs Voting System" }) => {

    const dialogContainer = document.getElementById('app-page-loader');

    const Dialog = ({ message = "" }) => (
        <div className='page-loader'>
            <div className='inner'>
                <div className="content">
                    <div className="text-center">
                        <Image src={AppLogo} fluid width={150} className='mb-4' />
                        <p className='fs-5 fw-bold'>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
    const root = createRoot(dialogContainer);
    root.render(<Dialog message={message} />);
}

export const hidePageLoader = () => {
    const dialogContainer = document.getElementById('app-page-loader');

    const root = createRoot(dialogContainer);
    root.render(<div></div>);
}

export const PageLoaderDialog = () => {
    return <>
        <div id='app-page-loader'>
        </div>
    </>
}

