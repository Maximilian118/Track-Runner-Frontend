import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import TrackCard from '../components/Cards/TrackCard'
import PostCard from '../components/Cards/PostCard'
import { getFeed } from '../shared/miscRequests'
import moment from 'moment'

const Home = ({ history }) => {
  const { user, setUser, calendar } = useContext(Context)
  const [ feed, setFeed ] = useState(!!localStorage.getItem('feed') ? JSON.parse(localStorage.getItem('feed')) : [])

  useEffect(() => {
    const handleFeedReq = async () => {
      if (feed.length === 0) {
        await getFeed(user, setUser, setFeed, moment().format(), 100, history)
      }
    }
    handleFeedReq()
  }, []) // eslint-disable-line

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