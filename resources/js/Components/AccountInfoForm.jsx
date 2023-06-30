import React from 'react'
import { Form } from 'react-bootstrap'

const AccountInfoForm = ({onInfoSave,data,setData,resetInfo}) => {
    return (
        <div className="container">
            <form onSubmit={onInfoSave} method="post">
                <div className="row mb-3 gy-3">
                    <div className="col-md">
                        <Form.Label className=' text-secondary fw-medium'>Firstname:</Form.Label>
                        <Form.Control
                            className='rounded-1'
                            type='text'
                            name='firstname'
                            value={data.firstname}
                            onChange={e => setData('firstname', e.target.value)}
                            placeholder='Enter your firstname...'
                        />
                    </div>
                    <div className="col-md">
                        <Form.Label className=' text-secondary fw-medium'>Lastname:</Form.Label>
                        <Form.Control
                            className='rounded-1'
                            type='text'
                            name='lastname'
                            value={data.lastname}
                            onChange={e => setData('lastname', e.target.value)}
                            placeholder='Enter your lastname...'
                        />
                    </div>
                </div>
                <div className="row mb-4 gy-3">
                    <div className="col-md">
                        <Form.Label className=' text-secondary fw-medium'>Username:</Form.Label>
                        <Form.Control
                            className='rounded-1'
                            type='text'
                            name='username'
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                            placeholder='Enter your username...'
                        />
                    </div>
                    <div className="col-md">
                        <Form.Label className=' text-secondary fw-medium'>Email Address:</Form.Label>
                        <Form.Control
                            className='rounded-1'
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder='Enter your email...'
                        />
                    </div>
                </div>
                <br />
                <div className="text-end">
                    <button className='btn btn-secondary btn-sm rounded-1 me-2' onClick={resetInfo} type='button'>Reset</button>
                    <button className='btn btn-purple-secondary btn-sm rounded-1' type='submit'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default AccountInfoForm
