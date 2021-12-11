import React, { useEffect, useState } from 'react'
import './_PostCard.scss'
import { postCardContent } from './PostCardUtility'
import PCOverlay from './PCOverlay'
import PCDetails from './PCDetails'

const PostCard = ({ post, feed, setFeed }) => {
  const [ postClicked, setPostClicked ] = useState(false)
  const [ details, setDetails ] = useState(false)
  const [ img, setImg ] = useState(null)

  useEffect(() => !details && postClicked && setDetails(true), [details, postClicked])

  return (
    <div 
      className="card-model post-card" 
      onClick={() => setPostClicked(!postClicked)} 
      style={{ height: postClicked ? 640 : 180 }}
    >
      {details && <PCDetails post={post} feed={feed} setFeed={setFeed}/>}
      {postCardContent(post)}
      {img}
      <PCOverlay post={post} feed={feed} setFeed={setFeed} setImg={setImg}/>
    </div>
  )
}

export default PostCard