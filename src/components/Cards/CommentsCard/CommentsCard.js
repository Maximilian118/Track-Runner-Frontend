import React, { useState, useContext } from 'react'
import { Context } from '../../../App'
import './_CommentsCard.scss'
import { TextField, Button } from '@mui/material'
import { createComment } from '../../../shared/commentRequests'
import { withRouter } from 'react-router'
import Comment from './Comment'

const CommentsCard = ({ post, feed, setFeed, history }) => {
  const { user, setUser } = useContext(Context)
  const [ value, setValue ] = useState("")
  const [ sendBtn, setSendBtn ] = useState(false)

  const handleSubmit = e => {
    sendBtn && setSendBtn(false)
    setValue("")
    e.target.blur()
    createComment(user, setUser, post._id, value, feed, setFeed, history)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      value.trim() !== "" && handleSubmit(e)
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
      <div className="comments-feed">
        {post.comments.map((comment, i) => <Comment key={i} comment={comment}/>)}
      </div>
      <TextField
        value={value}
        size="small"
        variant="outlined"
        label="Write a comment..."
        name="comment"
        className="mui-text-field-comment"
        onClick={e => e.stopPropagation()}
        inputProps={{
          maxLength: 240,
        }}
        InputProps={{
          endAdornment: sendBtn && <Button
            variant="text"
            className="mui-input-btn"
            onClick={e => value.trim() !== "" && handleSubmit(e)}
          >Send</Button>
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#DDDDDD',
              borderBottom: 'white',
              borderLeft: 'white',
              borderRight: 'white',
            },
          },
        }}
        onKeyPress={e => handleKeyPress(e)}
        onChange={e => handleOnChange(e)}
      />
    </div>
  )
}

export default withRouter(CommentsCard)