import React, { useContext, useState } from 'react'
import { Context } from '../App'
import UserCard from '../components/Cards/UserCard'
import ProfileBar from '../components/UI/ProfileBar'
import SettingsCard from '../components/Cards/SettingsCard'
import PostCard from '../components/Cards/PostCard'

const Profile = () => {
  const { user, setUser } = useContext(Context)
  const [ nav, setNav ] = useState(0)
  const [ feed, setFeed ] = useState(user.posts)

  const profileContent = nav => {
    switch (nav) {
      case 1: return <div/>
      case 2: return <div/>
      case 3: return <SettingsCard setUser={setUser}/>
      default: return feed.map((post, i) => <PostCard key={i} post={post} feed={feed} setFeed={setFeed}/>).reverse()
    }
  }

  return (
    <>
      <div className="page-left">
        <UserCard user={user} setUser={setUser}/>
      </div>
      <div className="page-right">
        <ProfileBar setNav={setNav}/>
        {profileContent(nav)}
      </div>
    </>
  )
}

export default Profile
