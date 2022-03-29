import React, { useState } from 'react'
import './_PCImages.scss'
import { Gesture } from '@mui/icons-material'

const PCImages = ({ imgs, setImg, setImgHeight }) => {
  const [ currentImg, setCurrentImg ] = useState(null)

  const imgClickedHandler = (e, img, isGesture) => {
    e.stopPropagation()
    setImg(isGesture ? null : <img alt="Post" style={{ width: 440 }} src={img} onLoad={(e) => setImgHeight(e.target.clientHeight - 2)}/>)
    setCurrentImg(isGesture ? null : img)
    isGesture && setImgHeight(180)
  }

  return (
    <div className="post-card-imgs">
      {imgs.map((img, i) => {
        const isGesture = currentImg === img

        return (
          <div 
            key={i} 
            className="post-card-img-container"
            onClick={e => imgClickedHandler(e, img, isGesture)}
            style={{ background: isGesture ? "white" : "none" }}
          >
            {isGesture ? <Gesture/> : <img alt="run" src={img}/>}
          </div>
        )
      })}
    </div>
  )
}

export default PCImages