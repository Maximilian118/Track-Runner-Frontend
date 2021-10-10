import React from 'react'
import './_PostCard.scss'
import MapBoxStatic from '../../Utility/MapBoxStatic'

const PostCard = ({ post }) => {

  return (
    <div className="card-model post-card">
      <MapBoxStatic geojson={post.geojson.geojson} width={440} height={180} highRes/>
    </div>
  )
}

export default PostCard