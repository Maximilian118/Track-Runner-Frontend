import React from 'react'
import './_PostCard.scss'
import MapBoxStatic from '../../Utility/MapBoxStatic'
import ProfilePicture from '../../Utility/ProfilePicture'
import PostCardImgs from './PostCardImgs'
import PostCardIcons from './PostCardIcons'
import moment from 'moment'

const PostCard = ({ post, feed, setFeed }) => {
  let content = null

  if (navigator.onLine) {
    if (post.geojson) {
      content = <MapBoxStatic geojson={post.geojson.geojson} width={440} height={180} padding="25" highRes/>
    } else if (post.track) {
      if (post.track.geojson) {
        content = <MapBoxStatic geojson={post.track.geojson.geojson} width={440} height={180} padding="25" highRes/>
      } else {
        content = (
          <div className="post-card-no-track-geojson">
            <h5>A new Track!</h5>
            <h5>Be the first to upload a GPX!</h5>
          </div>
        )
      }
    }
  }

  return (
    <div className="card-model post-card">
      {content}
      <div className="post-card-overlay">
        <div className="post-card-top">
          <div className="post-card-top-left">
            <h5>{post.title}</h5>
            <h6>{moment(post.runDT).format("Do MMM HH:mm")}</h6>
            <h6>{post.lap_time}</h6>
          </div>
          <ProfilePicture user={post.user} heightWidth={30}/>
        </div>
        <div className="post-card-bottom">
          <PostCardImgs imgs={post.imgs}/>
          <PostCardIcons post={post} feed={feed} setFeed={setFeed}/>
        </div>
      </div>
    </div>
  )
}

export default PostCard