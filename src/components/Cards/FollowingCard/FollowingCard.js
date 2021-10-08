import React from "react"
import "./_FollowingCard.scss"
import ProfilePicture from "../../Utility/ProfilePicture"

const FollowingCard = ({ user }) => 
  <div className="following-card">
    <div className="header">
      <h5>Following: {user.following.length}</h5>
    </div>
    {user.following.length === 0 && 
      <div className="followed-user empty">
        <h5>You are not following anyone!</h5>
      </div>
    }
    {user.following.map((followed, i) => (
      <div className="followed-user" key={i}>
        <ProfilePicture user={followed} heightWidth={30}/>
        <h5>{followed.name}</h5>
      </div>
    ))}
  </div>

export default FollowingCard