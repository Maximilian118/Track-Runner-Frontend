import React, { useState } from 'react'
import './_ProfilePicture.scss'
import { getInitials } from '../../../shared/utility'

const ProfilePicture = ({ user, heightWidth, style }) => {
  const [ isTall, setIsTall ] = useState(false)

  // Check if the image is portrait or landscape and apply correct style to img.
  const heighOrWide = e => setIsTall(e.target.clientWidth < e.target.clientHeight)

  return (
    <div 
      className={`profile-picture-icon ${!user.icon && `initials-icon`}`} 
      style={{ ...style, height: heightWidth, width: heightWidth }}
    >
      {user.icon ? 
        <img
          alt="Profile"
          style={isTall ? { width: heightWidth } : { height: heightWidth }} 
          src={user.icon}
          key={user.icon}
          onLoad={e => heighOrWide(e)}
        /> 
      :
        <p>{getInitials(user)}</p>
      }
    </div>
  )
}

export default ProfilePicture