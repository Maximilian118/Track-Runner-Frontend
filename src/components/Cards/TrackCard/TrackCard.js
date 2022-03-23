import React from 'react'
import './_TrackCard.scss'
import { nextTrack } from '../../../shared/utility'
import StatsCard from '../StatsCard'
import LineGraph from '../../Graphs/LineGraph'
import MapBoxStatic from '../../utility/MapBoxStatic'

const TrackCard = ({ calendar }) => {
  const track = nextTrack(calendar)

  return (
    <div className="card-model track-card">
      <div className="top">
        <h5>{`${track.isToday ? "Current" : "Next"} Track - ${track.name}`}</h5>
      </div>
      {navigator.onLine && <img alt="Track Logo" src={track.logo}/>}
      <StatsCard statsArr={track.trackStatsArr}/>
      {track.geojson && <LineGraph geojson={track.geojson} height={120} paddingTop={10}/>}
      {track.geojson && navigator.onLine && <MapBoxStatic geojson={track.geojson.geojson} width={240} height={200} highRes BRBot/>}
    </div>
  )
}


export default TrackCard