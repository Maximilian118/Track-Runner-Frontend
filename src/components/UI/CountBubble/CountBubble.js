import React from 'react'
import './_CountBubble.scss'

const CountBubble = ({ number }) => (
  <div className="count-bubble-container">
    <div className="count-bubble">
      <p>{number}</p>
    </div>
  </div>
)

export default CountBubble