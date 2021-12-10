import React from 'react'
import './_Comment.scss'
import ProfilePicture from '../../../Utility/ProfilePicture'
import { Link } from 'react-router-dom'

const Comment = ({ comment }) => {

  return (
    <div className="comment">
      <Link to="/profile" onClick={e => e.stopPropagation()}>
        <ProfilePicture 
          user={comment.user} 
          heightWidth={30}
        />
      </Link>
      <div style={{ marginLeft: 10 }}>
        <h6>{comment.user.name}</h6>
        <h5>{comment.comment}</h5>
      </div>
    </div>
  )
}

export default Comment