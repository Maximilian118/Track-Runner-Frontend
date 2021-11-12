import React, { useState } from 'react'
import './_ProfilePicture.scss'
import { getInitials } from '../../../shared/utility'
import { IconButton } from '@mui/material'

const ProfilePicture = ({ user, heightWidth, style }) => {
  const [ isTall, setIsTall ] = useState(false)
  const [ err, setErr ] = useState(false)

  // Check if the image is portrait or landscape and apply correct style to img.
  const heighOrWide = e => setIsTall(e.target.clientWidth < e.target.clientHeight)
  const noIcon = !user.icon || err

  return (
    <div 
      className="profile-picture"
      style={{ ...style, height: heightWidth, width: heightWidth }}
    >
      {!noIcon && 
        <img
          alt="Profile"
          style={isTall ? { width: heightWidth } : { height: heightWidth }} 
          src={user.icon}
          key={user.icon}
          onLoad={e => heighOrWide(e)}
          onError={e => setErr(true)}
        />
      }
      <IconButton size="small">
        {noIcon && <p>{getInitials(user)}</p>}
      </IconButton>
    </div>
  )
}

export default ProfilePicture