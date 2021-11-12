import React from 'react'
import './_PCImages.scss'

const PCImages = ({ imgs }) => (
  <div className="post-card-imgs">
    {imgs.map(img => (
      <div key={img} className="post-card-img-container">
        <img alt="run" src={img}/>
      </div>
    ))}
  </div>
)

export default PCImages