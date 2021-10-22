import React from 'react'
import { IconButton } from '@mui/material'
import { InfoOutlined, ForumOutlined } from '@mui/icons-material'

const PostCardIcons = () => (
  <div className="post-card-icons">
    <div className="button-wrapper">
      <IconButton size="small">
        <ForumOutlined/>
      </IconButton>
    </div>
    <div className="button-wrapper">
      <IconButton size="small">
        <InfoOutlined/>
      </IconButton>
    </div>
  </div>
)

export default PostCardIcons