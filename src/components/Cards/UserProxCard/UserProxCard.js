import React from 'react'
import UserList from '../../UI/UserList'
import './_UserProxCard.scss'
import Spinner from '../../utility/Spinner'

const UserProxCard = ({ user, setUser, userArr, setUserArr, history }) => (
  <div className="card-model user-proximity-card">
    {userArr.length < 0 ? <Spinner position="form"/> : (
      <UserList 
        user={user}
        setUser={setUser}
        userArr={userArr}
        setUserArr={setUserArr}
        header={`Users Near You`}
        empty={"No Users Found! (╯°□°)╯︵ ┻━┻"}
        history={history}
      />
    )}
  </div>
)

export default UserProxCard