import React, { useState } from 'react'
import './_UserProxMapCard.scss'
import MapBox from '../../utility/MapBox'
import Spinner from '../../utility/Spinner'

const UserProxMapCard = ({ user, userArr }) => {
  const [ loading, setLoading ] = useState(true)

  return (
    <div className="card-model upmc">
      {loading && <Spinner position="form"/>}
      {userArr.length > 0 && <MapBox
        location={user.location}
        width={440}
        height={180}
        setLoading={setLoading}
        userArr={[user, ...userArr]}
      />}
    </div>
  )
}

export default UserProxMapCard