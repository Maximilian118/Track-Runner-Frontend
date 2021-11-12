import React from 'react'
import './_PCOverlay.scss'
import moment from 'moment'
import ProfilePicture from '../../../Utility/ProfilePicture'
import PCImages from './PCImages'
import PCIcons from './PCIcons'

const PCOverlay = ({ post, feed, setFeed }) => (
  <div className="post-card-overlay">
    <div className="post-card-top">
      <div className="post-card-top-left">
        <h5>{post.title}</h5>
        <h6>{moment(post.runDT).format("Do MMM HH:mm")}</h6>
        <h6>{post.lap_time}</h6>
      </div>
      <ProfilePicture user={post.user} heightWidth={30}/>
    </div>
    <div className="post-card-bottom">
      <PCImages imgs={post.imgs}/>
      <PCIcons post={post} feed={feed} setFeed={setFeed}/>
    </div>
  </div>
)

export default PCOverlay