import React from 'react'
import './_PCDetails.scss'
import UsetStatsCard from '../../UserStatsCard'
import LineGraph from '../../../Graphs/LineGraph'
import StatsCard from '../../StatsCard'
import { postStatArr } from '../../../../shared/statArrays'
import { getPostGeojson } from '../PostCardUtility'
import CommentsCard from '../../CommentsCard'
import Description from '../../../UI/Description'

const PCDetails = ({ post, feed, setFeed }) => {
  const geojson = getPostGeojson(post)

  return (
    <div className="post-card-details">
      <UsetStatsCard user={post.user}/>
      {post.description && <Description post={post}/>}
      {geojson && <LineGraph geojson={geojson} height={60} gradient/>}
      <StatsCard statsArr={postStatArr(post)} statWidth={"20%"}/>
      <CommentsCard post={post} feed={feed} setFeed={setFeed}/>
    </div>
  )
}

export default PCDetails