import React from 'react'
import './_Required.scss'
import { ErrorOutline } from '@mui/icons-material'

const Required = () => (
  <div className="required">
    <p>Required</p>
    <ErrorOutline/>
  </div>
)

export default Required