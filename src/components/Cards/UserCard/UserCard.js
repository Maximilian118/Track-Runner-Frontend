import React from 'react'
import DropZone from '../../utility/DropZone'
import StatsCard from '../StatsCard'
import FollowingCard from '../FollowingCard'
import TimeRangeGraph from '../../Graphs/TimeRangeGraph'
import { userStatsArr } from '../../../shared/utility'

const UserCard = ({ user, setUser }) => 
  <div className="card-model sticky">
    <div className="top">
      <h5>{user.name}</h5>
    </div>
    <DropZone user={user} setUser={setUser} height={200} usage={"profile-picture"}/>
    <TimeRangeGraph user={user}/>
    <StatsCard statsArr={userStatsArr(user)} statWidth="25%"/>
    <FollowingCard user={user}/>
  </div>

export default UserCard