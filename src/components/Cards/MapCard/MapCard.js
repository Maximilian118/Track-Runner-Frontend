import React from 'react'
import MapBox from '../../utility/MapBox'

const MapCard = ({ track }) => 
  <div className="card-model">
    <div className="top">
      <h5>{track.name}</h5>
    </div>
    <MapBox geojson={track.geojson} height={400} zoom={14} pitch={60} _3D BRBot/>
  </div>

export default MapCard