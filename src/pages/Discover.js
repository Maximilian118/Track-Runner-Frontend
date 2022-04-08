import React, { useContext } from 'react'
import { Context } from '../App'
import UserProxCard from '../components/Cards/UserProxCard'

const Discover = ({ history }) => {
  const { user, setUser } = useContext(Context)

  return (
    <>
      <div className="page-left">
        <UserProxCard user={user} setUser={setUser} history={history}/>
      </div>
      <div className="page-right">

      </div>
    </>
  )
}

export default Discover