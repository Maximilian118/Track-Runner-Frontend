import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import NextTrackCard from '../components/Cards/NextTrackCard'
import PostCard from '../components/Cards/PostCard'
import { getFeed } from '../shared/feedRequests'
import moment from 'moment'
import { checkGeo } from '../shared/geoUtility'

const Home = ({ history }) => {
  const { user, setUser, calendar } = useContext(Context)
  const [ feed, setFeed ] = useState(!!localStorage.getItem('feed') ? JSON.parse(localStorage.getItem('feed')) : [])

  useEffect(() => {
    const handleFeedReq = async () => {
      await getFeed(user, setUser, feed, setFeed, moment().format(), feed.length === 0 ? null : feed[0].created_at, 20, history)
    }
    
    handleFeedReq()
    checkGeo(user, setUser, history)
    return () => setFeed(feed)
  }, []) // eslint-disable-line

  return (
    <>
      <div className="page-left">
        {calendar.some(e => e.track) && <NextTrackCard calendar={calendar}/>}
      </div>
      <div className="page-right">
        {feed.map((post, i) => <PostCard key={i} post={post} feed={feed} setFeed={setFeed}/>)}
      </div>
    </>
  )
}

export default Home