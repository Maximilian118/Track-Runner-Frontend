import React, { useState } from 'react'
import './_PCImages.scss'
import { Gesture } from '@mui/icons-material'

const PCImages = ({ imgs, setImg, setImgHeight }) => {
  const [ currentImg, setCurrentImg ] = useState(null)

  const imgClickedHandler = (e, img) => {
    e.stopPropagation()
    setImg(currentImg === img ? null : <img alt="Post" style={{ width: 440 }} src={img} onLoad={(e) => setImgHeight(e.target.clientHeight - 2)}/>)
    setCurrentImg(currentImg === img ? null : img)
    currentImg === img && setImgHeight(180)
  }

  return (
    <div className="post-card-imgs">
      {imgs.map((img, i) => 
        <div 
          key={i} 
          className="post-card-img-container"
          onClick={e => imgClickedHandler(e, img)}
        >
          {currentImg === img ? <Gesture/> : <img alt="run" src={img}/>}
        </div>
      )}
    </div>
  )
}

export default PCImages