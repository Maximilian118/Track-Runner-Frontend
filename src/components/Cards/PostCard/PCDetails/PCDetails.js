import React from 'react'
import './_PCDetails.scss'
import UsetStatsCard from '../../UserStatsCard'
import LineGraph from '../../../Graphs/LineGraph'
import StatsCard from '../../StatsCard'
import { postStatArr } from '../../../../shared/statArrays'

const PCDetails = ({ post }) => (
  <div className="post-card-details">
    <UsetStatsCard user={post.user}/>
    <LineGraph track={post.track} height={60}/>
    <StatsCard statsArr={postStatArr(post)} statWidth={"20%"}/>
  </div>
)

export default PCDetails