import React, { useState } from 'react'
import { nextTrack } from '../../../shared/utility'
import StatsCard from '../StatsCard'
import LineGraph from '../../Graphs/LineGraph'
import MapBoxStatic from '../../Utility/MapBoxStatic'

const TrackCard = ({ calendar }) => {
  const [ imgErr, setImgErr ] = useState(!navigator.onLine)
  const track = nextTrack(calendar)
  
  return (
    <div className="card-model">
      <div className="top">
        <h5>{`${track.isToday ? "Current" : "Next"} Track ${imgErr ? `- ${track.name}` : ``}`}</h5>
      </div>
      {!imgErr && <img alt="Track Logo" src={track.logo} onError={e => setImgErr(true)}/>}
      <StatsCard statsArr={track.trackStatsArr}/>
      {track.geojson.stats.elevation.elevArr.length > 0 &&  <LineGraph track={track} height={120}/>}
      {track.geojson && navigator.onLine && <MapBoxStatic geojson={track.geojson.geojson} width={240} height={200} highRes BRBot/>}
    </div>
  )
}


export default TrackCard