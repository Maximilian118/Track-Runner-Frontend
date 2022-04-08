import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import UserProxCard from '../components/Cards/UserProxCard'
import { getUsers } from '../shared/userRequests'

const Discover = ({ history }) => {
  const { user, setUser } = useContext(Context)
  const [ userArr, setUserArr ] = useState([])

  useEffect(() => {
    getUsers(user, setUser, setUserArr, "location", 100, history)
  }, [user, setUser, history])

  return (
    <>
      <div className="page-left">
        <UserProxCard userArr={userArr}/>
      </div>
      <div className="page-right">

      </div>
    </>
  )
}

export default Discover