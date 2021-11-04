import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../App'
import { TextField, Button } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { updateForm, errorCheck, formValid, formCleanup, initBackendError } from '../shared/formValidation'
import { login } from '../shared/userRequests'
import Spinner from '../components/Utility/Spinner'

const Login = ({ history }) => {
  const { user, setUser } = useContext(Context)
  const [ loading, setLoading ] = useState(false)
  const [ backendError, setBackendError ] = useState(initBackendError)
  const [ form, setForm ] = useState({
    email: "",
    password: "",
  })
  const [ formError, setFormError ] = useState({
    email: "",
    password: "",
  })

  useEffect(() => () => formCleanup(form, setForm, formError, setFormError, backendError, setBackendError), []) // eslint-disable-line

  const onSubmitHandler = e => {
    e.preventDefault()
    login(form, user, setUser, setLoading, setBackendError, history)
  }

  return (
    <div className="model-wrapper">
      <form className="model" onSubmit={e => onSubmitHandler(e)}>
        <div className="top">
          <h3>Login</h3>
        </div>
        <div className="middle">
          {loading && <Spinner position="form"/>}
          <div className="middle-row">
            <TextField 
              required
              defaultValue={form.email}
              variant="standard"
              error={!!errorCheck(formError, backendError, "email")}
              label="Email"
              name="email"
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError, backendError, setBackendError)}
            />
            {errorCheck(formError, backendError, "email")}
          </div>
          <div className="middle-row">
            <TextField 
              required
              defaultValue={form.password}
              variant="standard"
              error={!!errorCheck(formError, backendError, "password")}
              label="Password" 
              name="password"
              type="password" 
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError, backendError, setBackendError)}
            />
            {errorCheck(formError, backendError, "password")}
          </div>
        </div>
        <div className="bottom">
          <Button 
            size="medium" 
            startIcon={<ExitToApp/>} 
            type="submit"
            className="mui-form-btn"
            disabled={!formValid(form, formError)}
          >
            Login
          </Button>
        </div>
      </form>
      <h6 className="model-outside-txt" style={{ marginTop: 10 }}>I have  
        <Link to="forgot"><strong>forgotten my password</strong></Link>
      </h6>
    </div>
  )
}

export default Login