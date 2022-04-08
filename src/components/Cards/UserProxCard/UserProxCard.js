import React, { useEffect, useState } from 'react'
import UserList from '../../UI/UserList'
import './_UserProxCard.scss'
import { getUsers } from '../../../shared/userRequests'

const UserProxCard = ({ user, setUser, history }) => {
  const [ userArr, setUserArr ] = useState([])

  useEffect(() => {
    getUsers(user, setUser, setUserArr, "location", 100, history)
  }, [user, setUser, history])
  
  return (
    <div className="card-model user-proximity-card">
      <UserList 
        userArr={userArr} 
        header={`Users Near You`}
        empty={"No Users Found! (╯°□°)╯︵ ┻━┻"}
      />
    </div>
  )
}

export default UserProxCard