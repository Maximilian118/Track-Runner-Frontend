import React from 'react'
import './_CalendarBar.scss'
import CalendarItem from '../Cards/CalendarItem'

const CalendarBar = ({ calendar }) => 
  <div className="cal-bar">
    {calendar.map((data, i) => <CalendarItem key={i} data={data}/>)}
  </div>

export default CalendarBar