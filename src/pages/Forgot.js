import React, { useState, useContext } from 'react'
import { Context } from '../App'
import { updateForm, errorCheck, formValid } from '../shared/formValidation'
import { forgot } from '../shared/userRequests'
import { TextField, Button } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'

const Forgot = ({ history }) => {
  const { setLoading } = useContext(Context)
  const [ backendError, setBackendError ] = useState({
    type: "",
    message: "",
  })
  const [ form, setForm ] = useState({
    email: "",
  })
  const [ formError, setFormError ] = useState({
    email: "",
  })

  const onSubmitHandler = e => {
    e.preventDefault()
    forgot(form.email, setLoading, setBackendError, history)
  }
  
  return (
    <div className="model-wrapper">
      <form className="model" onSubmit={e => onSubmitHandler(e)}>
        <div className="top">
          <h3>Forgot Password</h3>
        </div>
        <div className="middle">
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
        </div>
        <div className="bottom">
          <Button 
            size="medium"
            startIcon={<ExitToApp/>}
            type="submit"
            className="mui-form-btn"
            disabled={!formValid(form, formError)}
          >
            Submit
          </Button>
        </div>
      </form>
      <h6 className="model-outside-txt" style={{ marginTop: 10 }}>
        <strong onClick={() => history.goBack()}>Back</strong>
      </h6>
    </div>
  )
}

export default Forgot