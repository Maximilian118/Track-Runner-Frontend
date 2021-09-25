import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const ForgotSuccess = () => 
  <div className="model-wrapper">
    <form className="model">
      <div className="top">
        <h3>Check your email</h3>
      </div>
      <div className="middle">
        <p style={{ textAlign: "center" }}>
          An email has been sent to your account email address with a new password. Don't forget to check your Junk inbox!
        </p>
      </div>
      <div className="bottom">
        <Link to="/login">
          <Button type="submit" className="form-btn">
            Back to Login
          </Button>
        </Link>
      </div>
    </form>
  </div>

export default ForgotSuccess