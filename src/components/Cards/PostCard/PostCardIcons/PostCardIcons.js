import React, { useContext } from 'react'
import { Context } from '../../../../App'
import './_PostCardIcons.scss'
import { ForumOutlined, ThumbUpAltOutlined, ThumbUp } from '@mui/icons-material'
import CountButton from '../../../UI/CountButton'
import { like } from '../../../../shared/miscRequests'
import { withRouter } from 'react-router'

const PostCardIcons = ({ post, feed, setFeed, history }) => {
  const { user, setUser } = useContext(Context)
  const liked = post.likes.some(ID => ID === user._id)
  const handleLikeClicked = () => like(user, setUser, feed, setFeed, "post", post._id, liked ? "remove" : "add", history)

  return (
    <div className="post-card-icons">
      <CountButton icon={<ForumOutlined/>}/>
      <CountButton 
        icon={liked ? <ThumbUp/> : <ThumbUpAltOutlined/>} 
        number={post.likes.length} 
        onClick={() => handleLikeClicked()}
      />
    </div>
  )
}

export default withRouter(PostCardIcons)