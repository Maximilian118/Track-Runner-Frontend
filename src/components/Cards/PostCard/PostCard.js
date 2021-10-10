import React from 'react'
import './_PostCard.scss'
import MapBoxStatic from '../../Utility/MapBoxStatic'
import ProfilePicture from '../../Utility/ProfilePicture'
import PostCardImgs from './PostCardImgs'
import PostCardIcons from './PostCardIcons'

const PostCard = ({ post }) => {

  return (
    <div className="card-model post-card">
      <MapBoxStatic geojson={post.geojson.geojson} width={440} height={180} highRes/>
      <div className="post-card-overlay">
        <div className="post-card-top">
          <h4></h4>
          <ProfilePicture user={post.user} heightWidth={30}/>
        </div>
        <div className="post-card-bottom">
          <PostCardImgs imgs={post.imgs}/>
          <PostCardIcons/>
        </div>
      </div>
    </div>
  )
}

export default PostCard