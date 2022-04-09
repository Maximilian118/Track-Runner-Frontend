import React from "react"
import "./_UserList.scss"
import ProfilePicture from "../../utility/ProfilePicture"
import { IconButton } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { updateFollowing } from '../../../shared/userRequests'

const UserList = ({ user, setUser, userArr, header, empty, style, history }) => {
  const userClickedHandler = u => updateFollowing(user, setUser, u._id, history)

  return (
    <div className="user-list" style={style}>
      {header && 
        <div className="header">
          <h5>{header}</h5>
        </div>
      }
      {userArr.length === 0 ?
        <div className="user empty">
          <h5>{empty}</h5>
        </div>
        :
        userArr.map((u, i) => {
          const followed = user.following.some(f => u._id === f._id)
  
          return (
            <div className="user" key={i} onClick={e => userClickedHandler(u)}>
              <ProfilePicture user={u} heightWidth={30}/>
              <h5>{u.name}</h5>
              <IconButton className="icon-button">
                {followed ? <Delete className="remove-btn"/> : <Add className="add-btn"/>}
              </IconButton>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserList