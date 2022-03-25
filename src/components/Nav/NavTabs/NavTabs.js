import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import { initNavValue, protectedTabs } from '../NavUtility'
import { useLocation } from 'react-router-dom'

const NavTabs = ({ user, history }) => {
  const [ value, setValue ] = useState(0)

  const handleChange = (e, newValue) => {
    const tab = protectedTabs[newValue - 2]
    history.push(tab ? tab.endpoint : "/")
    setValue(newValue)
  }

  const location = useLocation()

  useEffect(() => {
    if (protectedTabs.some(tab => tab.endpoint === location.pathname)) {
      setValue(initNavValue(location))
    } else {
      setValue(0)
    }
  }, [location])

  !user.token && value > 0 && setValue(0)

  return (
		<Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {background: '#ff0000'}}} className="mui-tabs">
      <Tab disabled style={{ minWidth: "fit-content", width: 0, padding: 0, margin: 0}}/>
      <Tab disabled={!user.token} label={<h1>Track-Runner</h1>} className="mui-tab-logo"/>
      {user.token && protectedTabs.map((tab, i) => <Tab key={i} label={tab.label} className="mui-tab"/>)}
		</Tabs>
	)
}

export default NavTabs