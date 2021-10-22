import React, { useState } from 'react'
import './_CalendarItem.scss'
import { formatDate } from '../../../shared/utility'
import Offline from '../../UX/Offline'

const CalendarItem = ({ data }) => {
  const [ imgErr, setImgErr ] = useState(false)
  let content = null

  if (data.track) {
    if (imgErr || !navigator.onLine) {
      content = <Offline width={'100%'} height={'100%'}/>
    } else {
      content = (
        <div className="img-wrapper">
          <img alt="logo" src={data.track.logo} onError={e => setImgErr(true)}/>
        </div>
      )
    }
  }

  return (
    <div className="cal-item">
      <div className="top">
        <h6>{`${formatDate(data.date)} ${data.track ? `- ${data.track.location}` : ``}`}</h6>
      </div>
      {content}
    </div>
  )
}

export default CalendarItem