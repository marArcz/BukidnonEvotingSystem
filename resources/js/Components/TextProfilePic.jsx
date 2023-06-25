import React from 'react'

const TextProfilePic = ({ bg='purple-secondary',text = 'T',fluid=false,classname }) => {
    return (
        <div className={`text-profile-pic bg-${bg} text-light ${fluid?'fluid':''} ${classname}`}>{text}</div>
    )
}

export default TextProfilePic
