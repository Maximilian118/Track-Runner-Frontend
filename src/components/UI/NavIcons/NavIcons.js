import React from 'react'
import './_NavIcons.scss'
import ProfilePicture from '../../Utility/ProfilePicture'
import { IconButton } from '@mui/material'
import { PostAdd, NotificationsNoneOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const NavIcons = ({ user, setValue }) => 
  <div className="nav-icons">
    <Link to="/post" onClick={() => setValue(0)}>
      <IconButton aria-label="Post">
        <PostAdd/>
      </IconButton>
    </Link>
    <IconButton aria-label="Notifications">
      <NotificationsNoneOutlined/>
    </IconButton>
    <Link to="/profile" onClick={() => setValue(0)}>
      <ProfilePicture user={user} heightWidth={30} style={{ marginLeft: 6 }}/>
    </Link>
  </div>

export default NavIcons