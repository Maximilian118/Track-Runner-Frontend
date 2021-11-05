import React from 'react'
import './_PostCardIcons.scss'
import { ForumOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import CountButton from '../../../UI/CountButton'

const PostCardIcons = ({ post }) => (
  <div className="post-card-icons">
    <CountButton icon={<ForumOutlined/>}/>
    <CountButton icon={<ThumbUpAltOutlined/>} number={post.likes}/>
  </div>
)

export default PostCardIcons