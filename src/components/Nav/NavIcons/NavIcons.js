import React from 'react'
import './_NavIcons.scss'
import ProfilePicture from '../../utility/ProfilePicture'
import { IconButton } from '@mui/material'
import { PostAdd, NotificationsNoneOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const NavIcons = ({ user }) => 
  <div className="nav-icons">
    <Link to="/post">
      <IconButton size="small" aria-label="Post">
        <PostAdd/>
      </IconButton>
    </Link>
    <Link to="/">
      <IconButton size="small" aria-label="Notifications">
        <NotificationsNoneOutlined/>
      </IconButton>
    </Link>
    <Link to="/profile">
      <ProfilePicture user={user} heightWidth={30}/>
    </Link>
  </div>

export default NavIcons