import React, { useContext } from 'react'
import { Context } from '../../../../../App'
import './_PCIcons.scss'
import { like } from '../../../../../shared/miscRequests'
import { withRouter } from 'react-router'
import { ForumOutlined, ThumbUpAltOutlined, ThumbUp } from '@mui/icons-material'
import CountButton from '../../../../UI/CountButton'

const PCIcons = ({ post, feed, setFeed, history }) => {
  const { user, setUser } = useContext(Context)
  const liked = post.likes.some(ID => ID === user._id)

  const handleLikeClicked = e => {
    e.stopPropagation()
    like(user, setUser, feed, setFeed, "post", post._id, liked ? "remove" : "add", history)
  }

  return (
    <div className="post-card-icons">
      <CountButton 
        icon={<ForumOutlined/>}
        number={post.comments.length}
      />
      <CountButton 
        icon={liked ? <ThumbUp/> : <ThumbUpAltOutlined/>} 
        number={post.likes.length} 
        onClick={e => handleLikeClicked(e)}
      />
    </div>
  )
}

export default withRouter(PCIcons)