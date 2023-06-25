import React from 'react'

const MaterialIcon = ({icon,className, ...attr}) => {
  return (
    <i className={`micon ${className}`} {...attr}>
      {icon}
    </i>
  )
}

export default MaterialIcon
