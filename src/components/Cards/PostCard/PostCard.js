import React, { useEffect, useState } from 'react'
import './_PostCard.scss'
import MapBoxStatic from '../../Utility/MapBoxStatic'
import PCOverlay from './PCOverlay'
import NoGeojson from './NoGeojson'
import PCDetails from './PCDetails'

const PostCard = ({ post, feed, setFeed }) => {
  const [ postClicked, setPostClicked ] = useState(false)
  const [ details, setDetails ] = useState(false)

  const getPCContent = geojson => {
    if (geojson) {
      return <MapBoxStatic geojson={geojson} width={440} height={180} padding="25" highRes/>
    } else {
      return <NoGeojson/>
    }
  }

  useEffect(() => !details && postClicked && setDetails(true), [details, postClicked])

  return (
    <div 
      className="card-model post-card" 
      onClick={() => setPostClicked(!postClicked)} 
      style={{ height: postClicked ? 540 : 180 }}
    >
      {details && <PCDetails post={post}/>}
      {getPCContent(post.geojson ? post.geojson.geojson : post.track.geojson ? post.track.geojson.geojson : null)}
      <PCOverlay post={post} feed={feed} setFeed={setFeed}/>
    </div>
  )
}

export default PostCard