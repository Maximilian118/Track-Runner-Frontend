import React from 'react'
import './_NavRight.scss'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const NavRight = ({ history }) => {
  let button = <Link to="/"><h5>Create An Account</h5></Link>

  if (history.location.pathname === "/" || history.location.pathname === "/forgot") {
    button = <Link to="/login"><h5>Login</h5></Link>
  }

  return (
    <div className="nav-right">
      {button}
    </div>
  )
}

export default withRouter(NavRight)