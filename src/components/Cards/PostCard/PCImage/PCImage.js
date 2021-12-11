import React from 'react'
import './_PCImage.scss'

const PCImage = ({ img }) => (
  <div className="post-card-image">
    <img alt="run" src={img}/>
  </div>
)

export default PCImage