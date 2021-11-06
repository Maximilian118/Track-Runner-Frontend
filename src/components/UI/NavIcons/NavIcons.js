import React from 'react'
import './_NavIcons.scss'
import ProfilePicture from '../../Utility/ProfilePicture'
import { IconButton } from '@mui/material'
import { PostAdd, NotificationsNoneOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const NavIcons = ({ user, setValue }) => 
  <div className="nav-icons">
    <Link to="/post" onClick={() => setValue(0)}>
      <IconButton size="small" aria-label="Post">
        <PostAdd/>
      </IconButton>
    </Link>
    <Link to="/" onClick={() => setValue(0)}>
      <IconButton size="small" aria-label="Notifications">
        <NotificationsNoneOutlined/>
      </IconButton>
    </Link>
    <Link to="/profile" onClick={() => setValue(0)}>
      <ProfilePicture user={user} heightWidth={30}/>
    </Link>
  </div>

export default NavIcons