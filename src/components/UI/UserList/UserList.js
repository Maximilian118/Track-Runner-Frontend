import React from "react"
import "./_UserList.scss"
import ProfilePicture from "../../utility/ProfilePicture"
import { IconButton } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { updateFollowing } from '../../../shared/userRequests'

const UserList = ({ user, setUser, userArr, setUserArr, header, empty, style, history }) => {
  const isDel = userArr.some(u => user.following.includes(u))
  
  const userClickedHandler = u => {
    updateFollowing(user, setUser, u._id, history)
    setUserArr && setUserArr(userArr.filter(f => f._id !== u._id))
  }

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
        userArr.map((u, i) => (
          <div 
            className={`user ${isDel ? "del" : "add"}`}
            key={i} 
            onClick={e => userClickedHandler(u)}
          >
            <ProfilePicture user={u} heightWidth={30}/>
            <h5>{u.name}</h5>
            <IconButton className="icon-button">
              {isDel ? <Delete/> : <Add/>}
            </IconButton>
          </div>
        ))
      }
    </div>
  )
}

export default UserList