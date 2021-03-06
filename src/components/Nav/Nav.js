import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import ProfilePicture from '../ProfilePicture'

const Nav = ({ user, history }) => 
  <nav>
    <div className="nav">
      <Link to="/"><h1>Track-Runner</h1></Link>
      {user.token && 
        <div className="nav-btns">
          <Link to="/"><h5>Home</h5></Link>
          <Link to="/calendar"><h5>Calandar</h5></Link>
          <Link to="/profile"><h5>Profile</h5></Link>
        </div>
      }
      <div className="nav-right">
        {user.token ? 
          <ProfilePicture user={user} history={history} heightWidth={25}/>
          : history.location.pathname === "/" || history.location.pathname === "/forgot" ? 
          <Link to="/login"><h5>Login</h5></Link> :
          <Link to="/"><h5>Create An Account</h5></Link>
        }
      </div>
    </div>
  </nav>

export default withRouter(Nav)