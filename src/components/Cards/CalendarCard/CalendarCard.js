import React from 'react'
import './_CalendarCard.scss'
import CalendarItem from '../CalendarItem'

const CalendarCard = ({ calendar }) => 
  <div className="cal-card-wrapper">
    <div className="cal-card">
      {calendar.map((data, i) => <CalendarItem key={i} data={data}/>)}
    </div>
  </div>

export default CalendarCard