import React from 'react'
import './_UserStatsCard.scss'
import ProfilePicture from '../../Utility/ProfilePicture'
import { Link } from 'react-router-dom'
import moment from 'moment'

const UserStatsCard = ({ user }) => (
  <div className="user-stats-card">
    <Link to="/profile">
      <ProfilePicture user={user} heightWidth={50}/>
    </Link>
    <div className="user-stats-card-info">
      <h5>{user.name}</h5>
      <h6>{`Member since: ${moment(user.created_at).format("Do MMM YYYY")}`}</h6>
    </div>
  </div>
)

export default UserStatsCard