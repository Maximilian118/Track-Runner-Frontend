import React from 'react'
import './_CalendarItem.scss'
import { formatDate } from '../../../shared/utility'

const CalendarItem = ({ data }) => 
  <div className="cal-item">
    <div className="top">
      <h6>{`${formatDate(data.date)} ${data.track ? `- ${data.track.location}` : ``}`}</h6>
    </div>
    {data.track && <div className="img-wrapper">
      <img alt="logo" src={data.track.logo}/>
    </div>}
  </div>

export default CalendarItem