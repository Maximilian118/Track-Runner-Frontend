import MapBoxStatic from '../../utility/MapBoxStatic'
import TCBlank from './TCBlank'

// Return the main content JSX for a TrackCard.
export const trackCardContent = track => {
  if (track.geojson) {
    return <MapBoxStatic 
      geojson={track.geojson.geojson} 
      width={440} 
      height={180} 
      padding="25" 
      highRes
    />
  } else {
    return <TCBlank/>
  }
}