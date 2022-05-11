import React, { useRef, useEffect, useState } from 'react'
import './_MapBox.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf'
import { initGeojson, getInitials } from '../../../shared/utility'
import { updateFollowing } from '../../../shared/userRequests'

const MapBox = ({ user, setUser, geojson, location, height, width, pitch, zoom, _3D, BRBot, setLoading, userArr, setUserArr, history }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(location ? location.longitude : -70.9)
  const [lat, setLat] = useState(location ? location.latitude : 42.35)
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
      const coords = location ? null : turf.center(geojson).geometry.coordinates

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/track-runner/ckqjpfiyl04t118mugkuokdm6",
        center: coords ? coords : [lng, lat],
        zoom: zoomLevel,
        pitch: pitch ? pitch : 0,
        antialias: true,
      })

      setLoading && map.current.on("load", () => setLoading(false))

      if (geojson) {
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
                "line-width": 2.2,
                "line-opacity": 1,
              }
            })
          }
        })
      } else if (userArr) {
        const markers = [user, ...userArr]

        markers.forEach(u => {
          const pp = document.createElement('div')
          pp.className = 'map-box-marker'
          pp.setAttribute('id', u._id)

          if (u.icon) {
            pp.style.backgroundImage = `url(${u.icon})`
          } else {
            const p = document.createElement('p')
            const text = document.createTextNode(`${getInitials(u)}`)
            pp.appendChild(p.appendChild(text))
          }

          if (user._id !== u._id) {
            pp.style.cursor = 'pointer'

            pp.addEventListener('click', () => {
              document.getElementById(u._id).remove()
              const newUserArr = userArr.filter(f => f._id !== u._id)
              updateFollowing(user, setUser, u._id, history)
              setUserArr(newUserArr)
              userArr = newUserArr // eslint-disable-line react-hooks/exhaustive-deps
            })
          }

          new mapboxgl.Marker(pp).setLngLat([u.location.longitude, u.location.latitude]).addTo(map.current)
        })
      }
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