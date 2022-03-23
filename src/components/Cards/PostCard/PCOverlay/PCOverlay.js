import React from 'react'
import './_PCOverlay.scss'
import moment from 'moment'
import ProfilePicture from '../../../utility/ProfilePicture'
import PCImages from './PCImages'
import PCIcons from './PCIcons'
import { Link } from 'react-router-dom'

const PCOverlay = ({ post, feed, setFeed, setImg }) => (
  <div className="post-card-overlay">
    <div className="post-card-top">
      <div className="post-card-top-left">
        <h5>{post.title}</h5>
        <h6>{moment(post.runDT).format("Do MMM HH:mm")}</h6>
        <h6>{post.lap_time}</h6>
      </div>
      <Link to="/profile" onClick={e => e.stopPropagation()}>
        <ProfilePicture user={post.user} heightWidth={30}/>
      </Link>
    </div>
    <div className="post-card-bottom">
      <PCImages imgs={post.imgs} setImg={setImg}/>
      <PCIcons post={post} feed={feed} setFeed={setFeed}/>
    </div>
  </div>
)

export default PCOverlay