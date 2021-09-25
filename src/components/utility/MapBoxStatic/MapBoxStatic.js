import React from 'react'
import mbxClient from '@mapbox/mapbox-sdk/services/static'

const MapBoxStatic = ({ geojson, width, height, highRes, BRBot, withLogo, withAtt, style }) => {
  const mbxStaticClient = mbxClient({ accessToken: process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN })

  const request = mbxStaticClient.getStaticImage({
    ownerId: 'track-runner',
    styleId: 'ckqjpfiyl04t118mugkuokdm6',
    width: width,
    height: height,
    position: 'auto',
    logo: withLogo ? true : false,
    attribution: withAtt ? true : false,
    highRes: highRes ? true : false,
    overlays: [
      {
        path: {
          strokeColor: "FF0000",
          strokeWidth: 3,
          strokeOpacity: 1,
          coordinates: geojson.features[0].geometry.coordinates.map(coords => [coords[0], coords[1]]),
        },
      },
    ],
  })

  return (
    <img 
      alt="Track Map" 
      src={request.url()} 
      className={BRBot && "border-radius-bottom"}
      style={style}
    />
  )
}

export default MapBoxStatic