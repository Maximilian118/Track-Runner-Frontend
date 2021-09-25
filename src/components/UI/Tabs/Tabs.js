import React, { useState } from 'react'
import { Tabs as MUITabs, Tab } from '@mui/material'

const Tabs = ({ tabArr, setTab }) => {
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
		<MUITabs 
      value={value}
      onChange={handleChange}
      TabIndicatorProps={{style: {background: '#ff0000'}}}
      style={{flexGrow: 1}}
    >
      {tabArr.map((tab, i) => 
        <Tab
          key={i}
          label={tab.text}
          className="mui-tab"
          onClick={() => setTab(tab.tab)}
        />
      )}
		</MUITabs>
	)
}

export default Tabs