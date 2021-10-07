import React from 'react'
import './_Spinner.scss'
import { Box, CircularProgress } from '@mui/material'

const Spinner = ({ size, position }) => (
  <div className={`mui-spinner${position ? ` mui-spinner-${position}` : ``}`}>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size ? size : 60}/>
    </Box>
  </div>
)

export default Spinner