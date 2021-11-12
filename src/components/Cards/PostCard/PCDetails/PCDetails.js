import React from 'react'
import './_PCDetails.scss'
import UsetStatsCard from '../../UserStatsCard'

const PCDetails = ({ post }) => (
  <div className="post-card-details">
    <UsetStatsCard user={post.user}/>
  </div>
)

export default PCDetails