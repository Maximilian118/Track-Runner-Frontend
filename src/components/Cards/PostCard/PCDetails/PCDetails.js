import React from 'react'
import './_PCDetails.scss'
import UsetStatsCard from '../../UserStatsCard'
import LineGraph from '../../../Graphs/LineGraph'

const PCDetails = ({ post }) => (
  <div className="post-card-details">
    <UsetStatsCard user={post.user}/>
    <LineGraph track={post.track} height={60}/>
  </div>
)

export default PCDetails