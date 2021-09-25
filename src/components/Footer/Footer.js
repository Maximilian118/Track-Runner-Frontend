import React from 'react'
import { Link } from 'react-router-dom'
import { GitHub } from '@mui/icons-material'

const Footer = () => 
  <footer>
    <h5>Maximilian Crosby</h5>
    <Link to={{ pathname: "https://github.com/Maximilian118/Track-Runner-Frontend" }} target="_blank" style={{margin: "1px 30px 0 5px"}}>
      <GitHub/>
    </Link>
    <h5>Powered by</h5>
    <Link to={{ pathname: "https://www.mapbox.com" }} target="_blank">
      <img alt="Mapbox Logo" src="https://track-runner.s3.eu-west-2.amazonaws.com/Logo/mapbox-logo-black.png" style={{margin: "1px 0 0 5px"}}/>
    </Link>
  </footer>

export default Footer