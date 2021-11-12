import React from 'react'
import './_PostCard.scss'
import MapBoxStatic from '../../Utility/MapBoxStatic'
import PCOverlay from './PCOverlay'
import NoGeojson from './NoGeojson'

const PostCard = ({ post, feed, setFeed }) => {
  const getPCContent = geojson => {
    if (geojson) {
      return <MapBoxStatic geojson={geojson} width={440} height={180} padding="25" highRes/>
    } else {
      return <NoGeojson/>
    }
  }

  return (
    <div className="card-model post-card">
      {getPCContent(post.geojson ? post.geojson.geojson : post.track.geojson ? post.track.geojson.geojson : null)}
      <PCOverlay post={post} feed={feed} setFeed={setFeed}/>
    </div>
  )
}

export default PostCard