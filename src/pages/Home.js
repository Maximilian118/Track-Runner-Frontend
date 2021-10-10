import React, { useContext } from 'react'
import { Context } from '../App'
import TrackCard from '../components/Cards/TrackCard'
import PostCard from '../components/Cards/PostCard'

const Home = () => {
  const { user, calendar } = useContext(Context)

  return (
    <>
      <div className="page-left">
        {calendar.some(e => e.track) && <TrackCard calendar={calendar}/>}
      </div>
      <div className="page-right">
        {user.posts.map((post, i) => <PostCard key={i} post={post}/>)}
      </div>
    </>
  )
}

export default Home