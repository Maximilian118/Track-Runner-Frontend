import React, { useState } from 'react'
import './_PCImages.scss'
import PCImage from '../../PCImage'
import { Gesture } from '@mui/icons-material'

const PCImages = ({ imgs, setImg }) => {
  const [ currentImg, setCurrentImg ] = useState(null)

  const imgClickedHandler = (e, img) => {
    e.stopPropagation()
    setImg(currentImg === img ? null : <PCImage img={img}/>)
    setCurrentImg(currentImg === img ? null : img)
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