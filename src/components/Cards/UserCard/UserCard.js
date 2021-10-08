import React from 'react'
import DropZone from '../../Utility/DropZone'
import StatsCard from '../StatsCard'
import FollowingCard from '../FollowingCard'
import { userStatsArr } from '../../../shared/utility'

const UserCard = ({ user, setUser }) => 
  <div className="card-model">
    <div className="top">
      <h5>{user.name}</h5>
    </div>
    <DropZone user={user} setUser={setUser} height={200} usage={"profile-picture"}/>
    <StatsCard statsArr={userStatsArr(user)}/>
    <FollowingCard user={user}/>
  </div>

export default UserCard