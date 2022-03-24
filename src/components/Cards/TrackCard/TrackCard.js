import React from 'react'
import './_TrackCard.scss'
import { trackCardContent } from './TrackCardUtility'

const TrackCard = ({ track }) => {
  let data = null

  if (track.geojson) {
    data = (
      <>
        <h6>Distance: <span>{`${track.geojson.stats.distance.totalKm}Km`}</span></h6>
        <h6>MaxElev: <span>{`${track.geojson.stats.elevation.max}Km`}</span></h6>
        <h6>MinElev: <span>{`${track.geojson.stats.elevation.min}Km`}</span></h6>
        <h6>ElevChange: <span>{`${track.geojson.stats.elevation.dif}Km`}</span></h6>
      </>
    )
  }
  
  return (
    <div className="card-model track-card">
      {trackCardContent(track)}
      <div className="track-card-overlay">
        <div className="track-card-top">
          <div className="track-card-top-left">
            <h5>{track.name}</h5>
            <h6>{`Country: ${track.country}`}</h6>
            <h6>{`Location: ${track.location}`}</h6>
            {data}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackCard