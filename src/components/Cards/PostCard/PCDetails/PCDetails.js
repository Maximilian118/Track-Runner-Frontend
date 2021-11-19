import React from 'react'
import './_PCDetails.scss'
import UsetStatsCard from '../../UserStatsCard'
import LineGraph from '../../../Graphs/LineGraph'
import StatsCard from '../../StatsCard'
import { postStatArr } from '../../../../shared/statArrays'
import { getPostGeojson } from '../../../../shared/utility'

const PCDetails = ({ post }) => {
  const geojson = getPostGeojson(post)
  
  return (
    <div className="post-card-details">
      <UsetStatsCard user={post.user}/>
      {geojson && <LineGraph geojson={geojson} height={60} gradient/>}
      <StatsCard statsArr={postStatArr(post)} statWidth={"20%"}/>
    </div>
  )
}

export default PCDetails