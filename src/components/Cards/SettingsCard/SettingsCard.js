import React from 'react'
import { Button } from '@mui/material'
import { Delete, ExitToApp } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { logout } from '../../../shared/localStorage'
import { withRouter } from 'react-router-dom'

const SettingsCard = ({ setUser, history }) =>
  <div className="card-model">
    <div className="top border-bottom">
      <h5>Settings</h5>
    </div>
    <div className="card-body-row">
      <Button size="small" startIcon={<ExitToApp/>} onClick={() => setUser(logout(history))} className="mui-btn">Logout</Button>
      <Link to="/delete-account">
        <Button size="small" startIcon={<Delete/>} className="mui-btn">Delete Account</Button>
      </Link>
    </div>
  </div>

export default withRouter(SettingsCard)