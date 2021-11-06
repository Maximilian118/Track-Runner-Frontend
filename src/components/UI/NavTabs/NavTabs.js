import React, { useEffect } from 'react'
import { Tabs, Tab } from '@mui/material'
import { withRouter } from 'react-router'

const NavTabs = ({ user, value, setValue, history }) => {
  const handleChange = (e, endpoint) => {
    history.push(endpoint)
    if (endpoint === '/') {
      setValue(2)
    } else if (endpoint === "/calendar") {
      setValue(3)
    }
  }

  const tabArr = [
    {
      text: "Home",
      endpoint: "/",
    },
    {
      text: "Calendar",
      endpoint: "/calendar",
    },
  ]

  useEffect(() => {
    if (history.location.pathname === "/" || history.location.pathname === "/login") {
      setValue(2)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
		<Tabs
      value={value}
      TabIndicatorProps={{style: {background: '#ff0000'}}}
      style={{flexGrow: 1}}
    >
      <Tab disabled style={{ minWidth: "fit-content", width: 0, padding: 0, margin: 0}}/>
      <Tab 
        label={<h1>Track-Runner</h1>} 
        disabled={!user.token} 
        className="mui-tab-logo"
        onClick={e => handleChange(e, "/")}
      />
      {user.token && tabArr.map((tab, i) => 
        <Tab
          key={i}
          label={tab.text}
          className="mui-tab"
          onClick={e => handleChange(e, tab.endpoint)}
        />
      )}
		</Tabs>
	)
}

export default withRouter(NavTabs)