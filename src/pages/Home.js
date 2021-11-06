import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import TrackCard from '../components/Cards/TrackCard'
import PostCard from '../components/Cards/PostCard'
import { getFeed } from '../shared/miscRequests'
import moment from 'moment'

const Home = ({ history }) => {
  const { user, setUser, calendar } = useContext(Context)
  const [ feed, setFeed ] = useState([])

  useEffect(() => {
    const handleFeedReq = async () => await getFeed(user, setUser, setFeed, moment().format(), 100, history)
    handleFeedReq()
  }, [])

  return (
    <>
      <div className="page-left">
        {calendar.some(e => e.track) && <TrackCard calendar={calendar}/>}
      </div>
      <div className="page-right">
        {feed.map((post, i) => <PostCard key={i} post={post}/>)}
      </div>
    </>
  )
}

export default Home