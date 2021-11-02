import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { Button, TextField } from '@mui/material'
import { AddRoad, CropOriginal, Gesture } from '@mui/icons-material'
import HelpIcon from '../components/Help/HelpIcon'
import CreateTrackHelp from '../components/Help/CreateTrackHelp'
import { updateCreateTrackForm, formValid } from '../shared/formValidation'
import DropZone from '../components/Utility/DropZone'

const CreateTrack = ({ postForm, setPostForm, history }) => {
  const { user, setUser } = useContext(Context)
  const [ help, setHelp ] = useState(false)
  const [ form, setForm ] = useState({
    name: "",
    geoID: "",
    geoURL: "",
    coords: null,
    logo: "",
  })
  const [ formError, setFormError ] = useState({
    name: "",
  })

  const handleCreateTrack = e => {
    e.preventDefault()
  }

  return (
    <div className="model-wrapper">
      <form className="model">
          <div className="top">
            <h3>Create a Track</h3>
            <HelpIcon help={help} setHelp={setHelp}/>
          </div>
          {help ? <CreateTrackHelp/> : 
            <div className="middle">
              <div className="middle-row">
                <TextField 
                  required
                  defaultValue={form.name}
                  error={!!formError.name}
                  variant="standard"
                  label="Name"
                  name="name"
                  className="mui-text-field"
                  onChange={e => updateCreateTrackForm(e, form, setForm, formError, setFormError)}
                />
              </div>
              <div className="middle-row">
                <DropZone
                  required
                  defaultValue={form.geoURL}
                  user={user} 
                  setUser={setUser}
                  form={form}
                  setForm={setForm}
                  height={56} 
                  usage="gpx" 
                  history={history}
                  icon={<Gesture/>}
                />
              </div>
              <div className="middle-row">
                <DropZone
                  defaultValue={form.logo}
                  user={user} 
                  setUser={setUser}
                  form={form}
                  setForm={setForm}
                  height={56} 
                  usage="track-logo" 
                  history={history}
                  icon={<CropOriginal/>}
                />
              </div>
            </div>
          }
          <div className="bottom">
            <Button 
              size="medium" 
              startIcon={<AddRoad/>} 
              type="submit"
              className="mui-form-btn"
              disabled={!formValid({
                name: form.name,
                geoID: form.geoID,
              }, formError)}
              onClick={e => handleCreateTrack(e)}
            >
              Create Track
            </Button>
          </div>
      </form>
      {!help ? <h6 className="model-outside-txt" style={{ marginTop: 10 }}>
        <strong onClick={() => !postForm ? history.goBack() :
          setPostForm({
            ...postForm,
            trackID: "",
          })
        }>Back</strong>
      </h6> : <div style={{ height: 22 }}/>}
    </div>
  )
}

export default CreateTrack