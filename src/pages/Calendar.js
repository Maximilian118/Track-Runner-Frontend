import React, { useContext } from 'react'
import { Context } from '../App'
import CalenderCard from '../components/Cards/CalendarCard'

const Calendar = () => {
  const { calendar } = useContext(Context)

  return (
    <CalenderCard
      calendar={calendar}
    />
  )
}

export default Calendar