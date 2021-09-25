import React, { useContext } from 'react'
import { Context } from '../App'
import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { deleteUser } from '../shared/userRequests'

const DeleteAccount = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)

  return (
    <div className="model-wrapper">
      <form className="model">
        <div className="top">
          <h3>Delete Account</h3>
        </div>
        <div className="middle">
          <p style={{ textAlign: "center" }}>
            Are you sure you want to delete your account? All of your data will be deleted. This action is irreversible!
          </p>
        </div>
        <div className="bottom">
          <Button 
            type="submit" 
            className="mui-form-btn" 
            startIcon={<Delete/>} 
            onClick={() => deleteUser(user, setUser, setLoading, history)}
          >
            Delete Account
          </Button>
        </div>
      </form>
      <h6 className="model-outside-txt" style={{ marginTop: 10 }}>
        <strong onClick={() => history.goBack()}>Back</strong>
      </h6>
    </div>
  )
}

export default DeleteAccount