import React from 'react'

const TextProfilePic = ({ bg='purple-secondary',text = 'T',fluid=false,className }) => {
    return (
        <div className={`text-profile-pic bg-${bg} text-light ${fluid?'fluid':''} ${className}`}>{text}</div>
    )
}

export default TextProfilePic
