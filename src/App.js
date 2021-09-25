import React, {useEffect, useState} from 'react'
import './scss/base.scss'
import './scss/_model.scss'
import './scss/_cardModel.scss'
import './scss/_muiStyle.scss'
import Router from './Router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { checkLocalStorage, checkCalLocalStorage } from './shared/localStorage'
import Spinner from './components/utility/Spinner'
import CalendarBar from './components/CalendarBar'
import { createCalendar } from './shared/utility'
import { useHistory } from 'react-router-dom'

const Context = React.createContext()

const calScope = 365

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())
  const [ calendar, setCalendar ] = useState(checkCalLocalStorage(calScope))

  const history = useHistory()

  useEffect(() => {
    createCalendar(user, setUser, calendar, setCalendar, calScope, history)
  }, [user, calendar, history])

  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({loading, user, calendar})

  return (
    <Context.Provider value={{loading, setLoading, user, setUser, calendar, setCalendar}}>
      <Nav user={user}/>
      <CalendarBar calendar={calendar}/>
      <main>
        {loading ? <Spinner/> : <Router user={user}/>}
      </main>
      <Footer/>
    </Context.Provider>
  )
}

export default App
export {Context}