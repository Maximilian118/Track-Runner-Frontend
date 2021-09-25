import React from 'react'
import './_ProfileBar.scss'
import { Button } from '@mui/material'
import { Settings, CropOriginal, SportsMotorsports, Stars, ViewCarousel } from '@mui/icons-material'

const ProfileBar = ({ settings, setSettings }) => 
  <div className="profile-bar">
    <Button size="small" startIcon={<Stars/>} className="mui-btn">Records</Button>
    <Button size="small" startIcon={<SportsMotorsports/>} className="mui-btn">Tracks</Button>
    <Button size="small" startIcon={<ViewCarousel/>} className="mui-btn">Posts</Button>
    <Button size="small" startIcon={<CropOriginal/>} className="mui-btn">Images</Button>
    <Button size="small" startIcon={<Settings/>} onClick={() => setSettings(!settings)} className="mui-btn">Settings</Button>
  </div>

export default ProfileBar