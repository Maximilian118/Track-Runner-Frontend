import React from 'react'
import './_StatsCard.scss'

const StatsCard = ({ statsArr }) => 
  <div className="stats-card">
    {statsArr.map((stat, i) => (
      <div className="stat" key={i}>
        <h6>{stat.name}</h6>
        <h5>{stat.stat}</h5>
      </div>
    ))}
  </div>

export default StatsCard