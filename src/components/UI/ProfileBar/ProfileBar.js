import React from 'react'
import './_ProfileBar.scss'
import { ButtonGroup, Button } from '@mui/material'
import { Settings, CropOriginal, SportsMotorsports, ViewCarousel } from '@mui/icons-material'

const ProfileBar = ({ settings, setSettings }) => 
  <ButtonGroup 
    variant="contained" 
    aria-label="outlined primary button group" 
    className="profile-bar"
    color='inherit'
  >
    <Button startIcon={<SportsMotorsports/>}>Tracks</Button>
    <Button startIcon={<ViewCarousel/>}>Posts</Button>
    <Button startIcon={<CropOriginal/>}>Images</Button>
    <Button startIcon={<Settings/>} onClick={() => setSettings(!settings)}>Settings</Button>
  </ButtonGroup>

export default ProfileBar