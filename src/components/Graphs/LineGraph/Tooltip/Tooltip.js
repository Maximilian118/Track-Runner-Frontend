import React from 'react'
import './_Tooltip.scss'

const Tooltip = ({point, circle}) => 
  <div className="tooltip">
    {circle && <div className="tooltip-circle" style={{background: point.serieColor}}/>}
    <h6>{point.data.y}m</h6>
  </div>

export default Tooltip