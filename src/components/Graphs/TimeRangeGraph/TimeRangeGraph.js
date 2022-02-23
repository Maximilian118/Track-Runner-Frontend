import React from 'react'
import './_TimeRangeGraph.scss'
import { activityData } from '../../../shared/utility'

const TimeRangeGraph = ({ user }) => 
  <div className="time-range-graph">
    {activityData(user, 175).map((item, i) => 
      <div
        key={i}
        style={{ background: item.colour }}
        className="time-range-graph-item"
      />
    )}
  </div>

export default TimeRangeGraph