import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { getUsers } from '../shared/userRequests'
import UserProxCard from '../components/Cards/UserProxCard'
import UserProxMapCard from '../components/Cards/UserProxMapCard'

const Discover = ({ history }) => {
  const { user, setUser } = useContext(Context)
  const [ userArr, setUserArr ] = useState([])

  useEffect(() => {
    getUsers(user, setUser, setUserArr, "location", 100, history)
  }, []) // eslint-disable-line

  return (
    <>
      <div className="page-left">
        <UserProxCard 
          user={user}
          setUser={setUser}
          userArr={userArr}
          setUserArr={setUserArr}
          history={history}
        />
      </div>
      <div className="page-right">
        <UserProxMapCard
          user={user}
          userArr={userArr}
        />
      </div>
    </>
  )
}

export default Discover