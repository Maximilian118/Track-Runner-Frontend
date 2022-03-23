import React from 'react'
import './_ProfileBar.scss'
import { ButtonGroup, Button } from '@mui/material'
import { Settings, CropOriginal, SportsMotorsports, ViewCarousel } from '@mui/icons-material'

const ProfileBar = ({ setNav }) => 
  <ButtonGroup 
    variant="contained" 
    aria-label="outlined primary button group" 
    className="profile-bar"
    color='inherit'
  >
    <Button startIcon={<ViewCarousel/>} onClick={() => setNav(0)}>Posts</Button>
    <Button startIcon={<SportsMotorsports/>} onClick={() => setNav(1)}>Tracks</Button>
    <Button startIcon={<CropOriginal/>} onClick={() => setNav(2)}>Images</Button>
    <Button startIcon={<Settings/>} onClick={() => setNav(3)}>Settings</Button>
  </ButtonGroup>

export default ProfileBar