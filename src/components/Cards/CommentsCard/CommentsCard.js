import React, { useState } from 'react'
import './_CommentsCard.scss'
import { TextField, Button } from '@mui/material'

const CommentsCard = ({ post }) => {
  const [ value, setValue ] = useState("")
  const [ sendBtn, setSendBtn ] = useState(false)

  const handleSubmit = e => {
    sendBtn && setSendBtn(false)
    setValue("")
    e.target.blur()
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else {
      !sendBtn && setSendBtn(true)
    }
  }

  const handleOnChange = e => {
    if (e.target.value.trim() === "") {
      sendBtn && setSendBtn(false)
    }

    setValue(e.target.value)
  }

  return (
    <div className="comments-card">
      {post.comments.map(comment => {
        console.log(comment)
      })}
      <TextField
        value={value}
        size="small"
        variant="outlined"
        label="Write a comment..."
        name="comment"
        className="mui-text-field-comment"
        onClick={e => e.stopPropagation()}
        InputProps={{
          endAdornment: sendBtn && <Button
            variant="text"
            className="mui-input-btn"
            onClick={e => handleSubmit(e)}
          >Send</Button>
        }}
        onKeyPress={e => handleKeyPress(e)}
        onChange={e => handleOnChange(e)}
      />
    </div>
  )
}

export default CommentsCard