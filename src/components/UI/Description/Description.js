import React, { useEffect, useState } from 'react'
import './_Description.scss'
import { KeyboardArrowDown } from '@mui/icons-material'

const Description = ({ post }) => {
  const [ extend, setExtend ] = useState(false)
  const [ oneLiner, setOneLiner ] = useState(false)

  const onDClickedHandler = e => {
    e.stopPropagation()
    setExtend(!extend)
  }

  useEffect(() => {
    setOneLiner(document.getElementById(`description-${post._id}`).offsetWidth < 390) 
  }, [post._id])

  return (
    <div
      className="description"
      onClick={e => !oneLiner && onDClickedHandler(e)}
      style={{ height: extend ? 340 : 15, overflowY: !oneLiner && extend ? 'scroll' : 'hidden' }}
    >
      {!oneLiner && <KeyboardArrowDown className={extend ? "rotate-180" : ""}/>}
      <h5 id={`description-${post._id}`}>{post.description}</h5>
    </div>
  )
}

export default Description