import React from 'react'
import './_Offline.scss'

const Offline = ({ width, height }) => (
  <div className="offline-wrapper" style={{ width: width, height: height }}>
    <h2>Offline!</h2>
  </div>
)

export default Offline