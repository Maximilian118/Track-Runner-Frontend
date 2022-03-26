import React from "react"
import "./_UserList.scss"
import ProfilePicture from "../../utility/ProfilePicture"

const UserList = ({ userArr, header, empty, style }) => (
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
      userArr.map((user, i) => (
        <div className="user" key={i}>
          <ProfilePicture user={user} heightWidth={30}/>
          <h5>{user.name}</h5>
        </div>
      ))
    }
  </div>
)

export default UserList