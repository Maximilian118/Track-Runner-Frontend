import React from 'react'
import './_CommentsCard.scss'
import { TextField } from '@mui/material'

const CommentsCard = () => (
  <div className="comments-card">
    <TextField
      size="small"
      variant="outlined"
      label="Write a comment..."
      name="comment"
      className="mui-text-field-comment"
      onClick={e => e.stopPropagation()}
    />
  </div>
)

export default CommentsCard