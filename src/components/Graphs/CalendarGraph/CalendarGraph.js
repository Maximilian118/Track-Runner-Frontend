import React from "react"
import "./_CalendarGraph.scss"
import { ResponsiveCalendar } from '@nivo/calendar'

const CalendarGraph = ({ data }) => 
  <div className="calendar-graph">
    <ResponsiveCalendar
      data={data.data}
      from={data.date}
      to={data.date}
      emptyColor="#DDDDDD"
      colors={[ '#A7E0A7', '#7DCD7D', '#3FC13F', '#00B200' ]}
      monthBorderColor="#FFFFFF"
      dayBorderWidth={2}
      dayBorderColor="#FFFFFF"
      align="bottom"
    />
  </div>

export default CalendarGraph