import React from 'react'
import "./_HelpIcon.scss"
import { InfoOutlined, Close } from '@mui/icons-material'

const HelpIcon = ({ help, setHelp }) => (
  <div className="help-icon" onClick={() => setHelp(!help)}>
    {help ? <Close/> : <InfoOutlined/>}
  </div>
)


export default HelpIcon