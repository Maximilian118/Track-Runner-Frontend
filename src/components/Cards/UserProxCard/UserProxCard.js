import React from 'react'
import UserList from '../../UI/UserList'
import './_UserProxCard.scss'
import Spinner from '../../utility/Spinner'

const UserProxCard = ({ userArr }) => (
  <div className="card-model user-proximity-card">
    {userArr.length < 0 ? <Spinner position="form"/> : <UserList 
      userArr={userArr} 
      header={`Users Near You`}
      empty={"No Users Found! (╯°□°)╯︵ ┻━┻"}
    />}
  </div>
)

export default UserProxCard