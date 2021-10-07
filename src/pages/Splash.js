import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { updateForm, errorCheck, formValid } from '../shared/formValidation'
import { createUser } from '../shared/userRequests'

const Splash = () => {
  const { user, setUser, setLoading } = useContext(Context)
  const [ backendError, setBackendError ] = useState({
    type: "",
    message: "",
  })
  const [ form, setForm ] = useState({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
  })
  const [ formError, setFormError ] = useState({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
  })

  const onSubmitHandler = e => {
    e.preventDefault()
    createUser(form, user, setUser, setLoading, setBackendError)
  }

  return (
    <div className="model-wrapper">
      <form className="model" onSubmit={e => onSubmitHandler(e)}>
        <div className="top">
          <h3>Create An Account</h3>
        </div>
        <div className="middle">
          <div className="middle-row">
            <TextField 
              required
              variant="standard"
              error={!!errorCheck(formError, backendError, "name")}
              label="Name"
              name="name"
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError)}
            />
            {errorCheck(formError, backendError, "name")}
          </div>
          <div className="middle-row">
            <TextField 
              required
              variant="standard"
              error={!!errorCheck(formError, backendError, "email")}
              label="Email"
              name="email"
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError)}
            />
            {errorCheck(formError, backendError, "email")}
          </div>
          <div className="middle-row">
            <TextField 
              required
              variant="standard"
              error={!!errorCheck(formError, backendError, "password")}
              label="Password" 
              name="password"
              type="password" 
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError)}
            />
            {errorCheck(formError, backendError, "password")}
          </div>
          <div className="middle-row">
            <TextField 
              required
              variant="standard"
              error={!!errorCheck(formError, backendError, "passConfirm")}
              label="Password Check" 
              name="passConfirm"
              type="password"
              className="mui-text-field"
              onChange={e => updateForm(e, form, setForm, formError, setFormError)}
            />
            {errorCheck(formError, backendError, "passConfirm")}
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
            Sign Up
          </Button>
        </div>
      </form>
      <h6 className="model-outside-txt" style={{ marginTop: 10 }}>By creating in account you agree to the 
        <Link to="terms-and-conditions"><strong>terms and conditions</strong></Link>
      </h6>
    </div>
  )
}

export default Splash