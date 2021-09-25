import React, { useState } from 'react'
import NavIcons from '../UI/NavIcons'
import NavTabs from '../UI/NavTabs'
import NavRight from '../UI/NavRight'
import NavLogo from '../UI/NavLogo'
import { initNavIndicator } from '../../shared/utility'
import { withRouter } from 'react-router-dom'

const Nav = ({ user, history }) => {
  const [value, setValue] = useState(initNavIndicator(user, history))

  return (
    <nav>
      <div className="nav">
        {user.token ? <NavTabs user={user} value={value} setValue={setValue}/> : <NavLogo/>}
        {user.token ? <NavIcons user={user} setValue={setValue}/> : <NavRight/>}
      </div>
    </nav>
  )
}

export default withRouter(Nav)