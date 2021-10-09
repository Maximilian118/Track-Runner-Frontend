import React, { useState } from 'react'
import './_ProfilePicture.scss'
import { getInitials } from '../../../shared/utility'

const ProfilePicture = ({ user, heightWidth, style }) => {
  const [ isTall, setIsTall ] = useState(false)
  const [ err, setErr ] = useState(false)

  // Check if the image is portrait or landscape and apply correct style to img.
  const heighOrWide = e => setIsTall(e.target.clientWidth < e.target.clientHeight)
  const gotImg = !user.icon || err

  return (
    <div 
      className={`profile-picture-icon ${gotImg && `initials-icon`}`} 
      style={{ ...style, height: heightWidth, width: heightWidth }}
    >
      {user.icon && !err ? 
        <img
          alt="Profile"
          style={isTall ? { width: heightWidth } : { height: heightWidth }} 
          src={user.icon}
          key={user.icon}
          onLoad={e => heighOrWide(e)}
          onError={e => setErr(true)}
        /> 
      :
        <p>{getInitials(user)}</p>
      }
    </div>
  )
}

export default ProfilePicture