import React from 'react'
import { Tabs, Tab } from '@mui/material'

const NavLogo = () => 
  <Tabs style={{flexGrow: 1}} value={0} TabIndicatorProps={{style: {display: 'none'}}}>
    <Tab 
      label={<h1>Track-Runner</h1>}
      className="mui-tab-logo"
      disabled
    />
  </Tabs>

export default NavLogo