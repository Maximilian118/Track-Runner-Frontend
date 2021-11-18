import React from 'react'
import './_StatsCard.scss'

const StatsCard = ({ statsArr, statWidth }) => {
  const itemWidth = Number(statWidth ? statWidth.split("%")[0] : 33.33)
  const perRow = Math.floor(100 / itemWidth)
  const closestMultiple = Math.round(statsArr.length / perRow) * perRow
  const maxStats = closestMultiple > statsArr.length ? closestMultiple - perRow : closestMultiple
  
  if (maxStats > 0) {
    statsArr.length = maxStats
  }

  return (
    <div className="stats-card">
      {statsArr.map((stat, i) => (
        <div 
          key={i}
          className="stat" 
          style={{ 
            width: statWidth ? statWidth : "33.33%",
            borderBottom: i <= statsArr.length - 1 - perRow ? "1px solid #DDDDDD" : null,
          }}
        >
          <h6>{stat.name}</h6>
          <h5>{stat.stat}</h5>
        </div>
      ))}
    </div>
  )
}


export default StatsCard