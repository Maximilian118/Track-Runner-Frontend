import React from 'react'
import './_CountButton.scss'
import { IconButton } from '@mui/material'
import CountBubble from '../CountBubble'

const CountButton = ({ icon, number, onClick }) => (
  <div className="count-button">
    {number > 0 && <CountBubble number={number}/>}
    <IconButton size="small" onClick={onClick}>
      {icon}
    </IconButton>
  </div>
)

export default CountButton