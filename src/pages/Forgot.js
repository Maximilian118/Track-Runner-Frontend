import React, { useState } from 'react'
import { updateForm, errorCheck, formValid } from '../shared/formValidation'
import { forgot } from '../shared/userRequests'
import { TextField, Button } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import Spinner from '../components/utility/Spinner'

const Forgot = ({ history }) => {
  const [ localLoading, setLocalLoading ] = useState(false)
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
    forgot(form.email, setLocalLoading, setBackendError, history)
  }
  
  return (
    <>
      {localLoading && <Spinner/>}
      <div className={`model-wrapper ${localLoading && "model-hide"}`}>
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
    </>
  )
}

export default Forgot