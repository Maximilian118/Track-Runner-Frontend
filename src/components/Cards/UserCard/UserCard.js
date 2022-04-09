import React from 'react'
import DropZone from '../../utility/DropZone'
import StatsCard from '../StatsCard'
import UserList from '../../UI/UserList'
import TimeRangeGraph from '../../Graphs/TimeRangeGraph'
import { userStatsArr } from '../../../shared/utility'

const UserCard = ({ user, setUser, history }) => 
  <div className="card-model sticky">
    <div className="top">
      <h5>{user.name}</h5>
    </div>
    <DropZone user={user} setUser={setUser} height={200} usage={"profile-picture"}/>
    <TimeRangeGraph user={user}/>
    <StatsCard statsArr={userStatsArr(user)} statWidth="25%"/>
    <UserList 
      user={user}
      setUser={setUser}
      userArr={user.following} 
      header={`Following: ${user.following.length}`}
      empty={"You are not following anyone!"}
      style={{ maxHeight: 300, borderTop: "1px solid #DDDDDD" }}
      history={history}
    />
  </div>

export default UserCard