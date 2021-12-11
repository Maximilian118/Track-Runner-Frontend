import MapBoxStatic from '../../Utility/MapBoxStatic'
import PCBlank from './PCBlank'

// Return the best geojson available for any passed post.
export const getPostGeojson = post => {
  if (post.geojson) {
    return post.geojson
  } else if (post.track.geojson) {
    return post.track.geojson
  } else {
    return null
  }
}

// Return the main content JSX for a PostCard.
export const postCardContent = (post, width, height) => {
  const geojson = getPostGeojson(post)

  if (geojson) {
    return <MapBoxStatic 
      geojson={geojson.geojson} 
      width={width ? width : 440} 
      height={height ? height : 180} 
      padding="25" 
      highRes
    />
  } else {
    return <PCBlank/>
  }
}