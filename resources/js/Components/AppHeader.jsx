import React, { useState } from 'react'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import AppLogo from '../../images/evote-logo.png'
import MenuIcon from '../../images/menu.png';
import { Link } from '@inertiajs/react';

const AppHeader = ({ auth, removeShadow = false,bg='white',variant }) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <Navbar onToggle={(expanded) => setExpanded(expanded)} bg={expanded?'white':bg} variant={expanded?'light':variant} expand='lg' fixed='top' className={`${removeShadow ? '' : 'shadow'} py-2 `}>
            <Container className=' align-middle align-items-center '>
                <Navbar.Brand href={route('home')}>
                    <Image fluid src={AppLogo} className='navbar-logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    {/* <Image fluid src={MenuIcon} className='icon' /> */}
                    <div className={`menu-icon ${expanded ? 'expanded' : ''}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            auth?.user ? (
                                <Nav.Link className='text-uppercase mx-lg-3 fs-6' as={Link} href={route('dashboard')}>Dashboard</Nav.Link>
                            ) : (
                                <Nav.Link className='text-uppercase mx-lg-3 fs-6' as={Link} href="/">Home</Nav.Link>
                            )
                        }
                        <Nav.Link className='text-uppercase mx-lg-3 fs-6' as={Link} href={route('about')}>About</Nav.Link>
                        <Nav.Link className='text-uppercase mx-lg-3 fs-6' as={Link} href={route('contact')}>Contact</Nav.Link>

                        {
                            auth?.user ? (
                                <>
                                    <Nav.Link className='text-uppercase mx-lg-2 fs-6' as={Link} href={route('profile')}>Profile</Nav.Link>
                                    <Nav.Link className='text-uppercase mx-lg-2 fs-6' method='post' as={Link} href={route('logout')}>Log out</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link className='text-uppercase mx-lg-3 fs-6' as={Link} href={route('login')}>Login</Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppHeader
