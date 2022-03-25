import React from 'react'
import NavIcons from './NavIcons'
import NavTabs from './NavTabs'
import NavRight from './NavRight'

const Nav = ({ user, history }) => (
  <nav>
    <div className="nav">
      <NavTabs user={user} history={history}/>
      {user.token ? <NavIcons user={user}/> : <NavRight/>}
    </div>
  </nav>
)

export default Nav