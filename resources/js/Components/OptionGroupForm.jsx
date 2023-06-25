import React, { useState } from 'react'

const OptionGroupForm = ({ optionGroup, index }) => {
    // const [first, setfirst] = useState(second)

    return (
        <div className="card bg-light-purple p-xl-4 p-3 mt-2">
            <div className="card-body">
                <div className='mb-3 mt-2'>
                    <Form.Label className='text-light' htmlFor={`position-${index}`}>Title:</Form.Label>
                    <Form.Control
                        type='text'
                        id={`position-${index}`}
                        value={optionGroup.title}
                        className="mt-1 custom"
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>
            </div>
        </div>
    )
}

export default OptionGroupForm
