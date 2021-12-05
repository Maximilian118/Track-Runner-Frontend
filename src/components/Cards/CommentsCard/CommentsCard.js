import React, { useState } from 'react'
import './_CommentsCard.scss'
import { TextField, Button } from '@mui/material'

const CommentsCard = () => {
  const [ sendBtn, setSendBtn ] = useState(false)

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendBtn && setSendBtn(false)
    } else {
      !sendBtn && setSendBtn(true)
    }
  }

  return (
    <div className="comments-card">
      <TextField
        size="small"
        variant="outlined"
        label="Write a comment..."
        name="comment"
        className="mui-text-field-comment"
        onClick={e => e.stopPropagation()}
        InputProps={{
          endAdornment: <Button
            variant="text"
            className="mui-input-btn"
            style={{ opacity: sendBtn ? 1 : 0 }}
            onClick={e => sendBtn && setSendBtn(false)}
          >Send</Button>
        }}
        onKeyPress={e => handleKeyPress(e)}
        onChange={e => e.target.value.trim() === "" && sendBtn && setSendBtn(false)}
      />
    </div>
  )
}

export default CommentsCard