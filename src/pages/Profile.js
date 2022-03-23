import React, { useContext, useState } from 'react'
import { Context } from '../App'
import UserCard from '../components/Cards/UserCard'
import ProfileBar from '../components/UI/ProfileBar'
import SettingsCard from '../components/Cards/SettingsCard'
import PostCard from '../components/Cards/PostCard'

const Profile = () => {
  const { user, setUser } = useContext(Context)
  const [ settings, setSettings ] = useState(false)
  const [ feed, setFeed ] = useState(user.posts)

  return (
    <>
      <div className="page-left">
        <UserCard user={user} setUser={setUser}/>
      </div>
      <div className="page-right">
        <ProfileBar settings={settings} setSettings={setSettings}/>
        {feed.map((post, i) => <PostCard key={i} post={post} feed={feed} setFeed={setFeed}/>).reverse()}
        {settings && <SettingsCard setUser={setUser}/>}
      </div>
    </>
  )
}

export default Profile
