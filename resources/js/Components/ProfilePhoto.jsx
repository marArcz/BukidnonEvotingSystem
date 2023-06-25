import React from 'react'

const ProfilePhoto = ({ image,className, size='md' }) => {
    return (
        <div className={`user-profile-photo ${className} ${size}`} style={{ backgroundImage: `url('${image}')` }}>
        </div>
    )
}

export default ProfilePhoto
