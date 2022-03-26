import React from 'react'
import UserList from '../../UI/UserList'
import './_UserProxCard.scss'

const UserProxCard = () => {

  return (
    <div className="card-model user-proximity-card">
      <UserList 
        userArr={[]} 
        header={`Users Near You`}
        empty={"No Users Found! (╯°□°)╯︵ ┻━┻"}
      />
    </div>
  )
}

export default UserProxCard