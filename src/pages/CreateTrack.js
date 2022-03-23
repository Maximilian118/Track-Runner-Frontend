import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { Button, TextField } from '@mui/material'
import { AddRoad, CropOriginal, Gesture } from '@mui/icons-material'
import HelpIcon from '../components/help/HelpIcon'
import CreateTrackHelp from '../components/help/CreateTrackHelp'
import { updateCreateTrackForm, formValid, errorCheck, initBackendError, formCleanup } from '../shared/formValidation'
import DropZone from '../components/utility/DropZone'
import { createTrack } from '../shared/trackRequests'
import Spinner from '../components/utility/Spinner'

const CreateTrack = ({ postForm, setPostForm, tracks, setTracks, setTracksVal, history }) => {
  const { user, setUser } = useContext(Context)
  const [ loading, setLoading ] = useState(false)
  const [ help, setHelp ] = useState(false)
  const [ backendError, setBackendError ] = useState(initBackendError)
  const [ form, setForm ] = useState({
    name: "",
    geoID: postForm.geoID ? postForm.geoID : null,
    geoURL: postForm.geoURL ? postForm.geoURL : null,
    geoStats: postForm.geoStats ? postForm.geoStats : null,
    logo: "",
  })
  const [ formError, setFormError ] = useState({
    name: "",
  })

  useEffect(() => setTracksVal(null), [setTracksVal])
  useEffect(() => () => formCleanup(form, setForm, formError, setFormError, backendError, setBackendError), []) // eslint-disable-line
  
  const handleCreateTrack = e => {
    e.preventDefault()
    createTrack(user, setUser, form, postForm, setPostForm, tracks, setTracks, setTracksVal, setBackendError, setLoading, history)
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
              {loading && <Spinner position="form"/>}
              <div className="middle-row">
                <TextField 
                  required
                  defaultValue={form.name}
                  error={!!errorCheck(formError, backendError, "name")}
                  variant="standard"
                  label="Name"
                  name="name"
                  className="mui-text-field"
                  onChange={e => updateCreateTrackForm(e, form, setForm, formError, setFormError, backendError, setBackendError)}
                />
                {errorCheck(formError, backendError, "name")}
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