import React from "react"
import "./_CalendarGraph.scss"
import { ResponsiveCalendar } from '@nivo/calendar'
import { nivoActivityData, nivoCalColours } from '../../../shared/utility'
import moment from 'moment'

const CalendarGraph = ({ user }) => 
  <div className="calendar-graph">
    <ResponsiveCalendar
      data={nivoActivityData(user)}
      from={`${moment().format("YYYY")}-01-01`}
      to={moment().format("YYYY-MM-DD")}
      emptyColor="#DDDDDD"
      colors={nivoCalColours}
      monthSpacing={0}
      monthBorderWidth={0}
      monthBorderColor="#FFFFFF"
      dayBorderWidth={1}
      dayBorderColor="#FFFFFF"
    />
  </div>

export default CalendarGraph