import React, { useState } from 'react'
import './_UserProxMapCard.scss'
import MapBox from '../../utility/MapBox'
import Spinner from '../../utility/Spinner'

const UserProxMapCard = ({ user, setUser, userArr, setUserArr, history }) => {
  const [ loading, setLoading ] = useState(true)

  return (
    <div className="card-model upmc">
      {loading && <Spinner position="form"/>}
      {userArr.length > 0 && <MapBox
        user={user}
        setUser={setUser}
        location={user.location}
        width={440}
        height={180}
        setLoading={setLoading}
        userArr={userArr}
        setUserArr={setUserArr}
        history={history}
        zoom={1}
      />}
    </div>
  )
}

export default UserProxMapCard