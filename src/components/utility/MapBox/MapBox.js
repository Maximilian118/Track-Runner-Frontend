import React, { useRef, useEffect, useState } from 'react'
import './_MapBox.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf'
import { initGeojson } from '../../../shared/utility'

const MapBox = ({ geojson, height, width, pitch, zoom, _3D, BRBot }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoomLevel, setZoom] = useState(zoom ? zoom : 13)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN
    
    if (map.current) {
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4))
        setLat(map.current.getCenter().lat.toFixed(4))
        setZoom(map.current.getZoom().toFixed(2))
      })
    } else {
      const coords = turf.center(geojson).geometry.coordinates

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/track-runner/ckqjpfiyl04t118mugkuokdm6",
        center: coords ? coords : [lng, lat],
        zoom: zoomLevel,
        pitch: pitch ? pitch : 0,
        antialias: true,
      })

      map.current.on("load", () => {
        map.current.addSource("track", {
          type: "geojson",
          data: initGeojson(geojson),
        })
  
        if (_3D) {
          map.current.addLayer({
            id: "track",
            type: "fill-extrusion",
            source: "track",
            paint: {
              "fill-extrusion-color": "#ff0000",
              "fill-extrusion-height": ["get", "elevation"],
              "fill-extrusion-opacity": 0.7,
              "fill-extrusion-base": 0,
            }
          })
        } else {
          map.current.addLayer({
            id: "track",
            type: "line",
            source: "track",
            paint: {
              "line-color": "#ff0000",
              "line-width": 4,
              "line-opacity": 0.7,
            }
          })
        }
      })
    }
  })

  return (
    <div 
      ref={mapContainer}
      className={`map-box ${BRBot && `border-radius-bottom`}`}
      style={{ height: height, width: width }} 
    />
  )
}

export default MapBox