import React from 'react'
import { getMapBoxStatic } from '../../../shared/miscRequests'

const MapBoxStatic = ({ geojson, width, height, highRes, withLogo, withAtt, BRBot, style }) => (
  <img 
    alt="Track Map" 
    src={getMapBoxStatic(geojson, width, height, highRes, withLogo, withAtt)}
    className={BRBot && "border-radius-bottom"}
    style={style}
  />
)

export default MapBoxStatic