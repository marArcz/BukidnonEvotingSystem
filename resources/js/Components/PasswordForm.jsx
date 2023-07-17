import React from 'react'
import { Form } from 'react-bootstrap';
import InputError from './InputError';
import LoadingButton from './LoadingButton';

const PasswordForm = ({
    confirmPassword,
    setConfirmPassword,
    onChangePassword,
    currentPassword,
    setCurrentPassword,
    currentPasswordError,
    newPasswordError,
    newPassword,
    changingPassword,
    setNewPassword
}) => {
    return (
        <div>
            <form onSubmit={onChangePassword} method="post">
                <div className="row mb-3 gy-3">
                    <div className="col-md">
                        <Form.Label className=" text-secondary">
                            Current Password:
                        </Form.Label>
                        <Form.Control
                            className="rounded-1"
                            type="password"
                            name="username"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter your current password"
                        />
                        <InputError
                            className="mt-2"
                            message={currentPasswordError}
                        />
                    </div>
                </div>
                <div className="row mb-3 gy-3">
                    <div className="col-md">
                        <Form.Label className=" text-secondary">
                            New Password:
                        </Form.Label>
                        <Form.Control
                            className="rounded-1"
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <InputError
                            message={newPasswordError}
                            className="mt-2"
                        />
                    </div>
                    <div className="col-md">
                        <Form.Label className=" text-secondary">
                            Confirm Password:
                        </Form.Label>
                        <Form.Control
                            className="rounded-1"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re enter your password"
                        />
                        <InputError
                            message={newPasswordError}
                            className="mt-2"
                        />
                    </div>
                </div>
                <br />
                <div className="text-end">
                    <LoadingButton
                        loading={changingPassword}
                        spinnerVariant="dark"
                        type="submit"
                        variant="dark"
                        size="sm"
                    >
                        Change Password
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default PasswordForm
