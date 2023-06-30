import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const LoadingButton = ({ spinnerVariant, children, loading, className, ...props }) => {
    return (
        <Button disabled={loading} className={className}  {...props}>
            {
                loading ? (
                    <>
                        <div className="d-flex">
                            <div>
                                {children}
                            </div>
                            <div className='ms-2'>
                                <Spinner
                                    variant={spinnerVariant}
                                    size='sm'
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {children}
                    </>
                )
            }
        </Button>
    )
}

export default LoadingButton
