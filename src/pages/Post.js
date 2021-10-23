import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { createPost } from '../shared/postRequests'
import DropZone from '../components/Utility/DropZone'
import { TextField, Autocomplete, InputAdornment, Box, Button } from '@mui/material'
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab'
import { PostAdd, Gesture, CropOriginal } from '@mui/icons-material'
import momentAdapter from '@date-io/moment'
import { updatePostForm, formValid } from '../shared/formValidation'
import { getTracks } from '../shared/trackRequests'
import PostHelp from '../components/Help/PostHelp'
import HelpIcon from '../components/Help/HelpIcon'

const Post = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  const [ help, setHelp ] = useState(false)
  const [ tracks, setTracks ] = useState([])
  const [ form, setForm ] = useState({
    title: "",
    description: "",
    trackID: "",
    geoID: "",
    lapTime: null,
    distance: null,
    timeOfRun: new Date(),
    dateOfRun: new Date(),
    imgs: [],
  })
  const [ formError, setFormError ] = useState({
    lapTime: "",
    distance: "",
  })

  useEffect(() => {
    const handleTracksReq = async () => {
      setTracks(await getTracks(user, setUser, history))
    }

    handleTracksReq()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreatePost = e => {
    e.preventDefault()
    createPost(form, user, setUser, setLoading, history)
  }

  return (
    <div className="model-wrapper">
      <form className="model">
        <LocalizationProvider dateAdapter={momentAdapter}>
          <div className="top">
            <h3>Post a run</h3>
            <HelpIcon help={help} setHelp={setHelp}/>
          </div>
          {help ? <PostHelp/> : 
            <div className="middle">
              <div className="middle-row">
                <TextField 
                  required
                  variant="standard"
                  label="Title"
                  name="title"
                  className="mui-text-field"
                  onChange={e => updatePostForm(e, form, setForm, formError, setFormError)}
                />
              </div>
              <div className="middle-row">
                <TextField
                  variant="standard"
                  label="Description"
                  name="description"
                  multiline
                  maxRows={4}
                  className="mui-text-field"
                  onChange={e => updatePostForm(e, form, setForm, formError, setFormError)}
                />
              </div>
              <div className="middle-row" style={{ marginTop: 0 }}>
                <DropZone
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
                <Autocomplete
                  disabled={tracks.length === 0}
                  options={tracks}
                  className="mui-text-field"
                  getOptionLabel={track => track.name}
                  onChange={(e, vals) => setForm({...form, trackID: vals ? vals._id : null})}
                  renderOption={(props, track) => 
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={track.logo} alt=""/>
                      {track.name}
                    </Box>
                  }
                  renderInput={params => 
                    <TextField 
                      {...params} 
                      label="Select a track"  
                      className="mui-text-field"
                    />
                  }
                />
              </div>
              <div className="middle-row">
                <TimePicker
                  label="Best Lap"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  value={form.lapTime}
                  onChange={obj => updatePostForm({
                    target: {
                      name: "lapTime",
                      value: obj,
                    }
                  }, form, setForm, formError, setFormError)}
                  renderInput={(params) => 
                    <TextField
                      {...params}
                      required
                      className="mui-date-time"
                      error={!!formError.lapTime}
                      style={{ marginRight: 20 }}
                    />
                  }
                />
                <TextField
                  required
                  variant="outlined"
                  label="Total Dist"
                  name="distance"
                  placeholder="0.000"
                  className="mui-date-time"
                  onChange={e => updatePostForm(e, form, setForm, formError, setFormError)}
                  error={!!formError.distance}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </div>
              <div className="middle-row">
                <TimePicker
                  label="Time of run"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  value={form.timeOfRun}
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      timeOfRun: newValue,
                    })
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params} 
                      className="mui-date-time"
                      style={{ marginRight: 20 }}
                    />
                  }
                />
                <DatePicker
                  label="Date of run"
                  mask="__/__/__"
                  inputFormat="DD/MM/YY"
                  className="mui-date-time"
                  value={form.dateOfRun}
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      dateOfRun: newValue,
                    })
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      className="mui-date-time"
                    />
                  }
                />
              </div>
              <div className="middle-row">
                <DropZone 
                  user={user} 
                  setUser={setUser}
                  form={form}
                  setForm={setForm}
                  height={56} 
                  usage="post" 
                  history={history} 
                  icon={<CropOriginal/>}
                  multiple
                />
              </div>
            </div>
          }
          <div className="bottom">
            <Button 
              size="medium" 
              startIcon={<PostAdd/>} 
              type="submit"
              className="mui-form-btn"
              disabled={!formValid({
                title: form.title,
                lapTime: form.lapTime,
                distance: form.distance,
              }, formError)}
              onClick={e => handleCreatePost(e)}
            >
              Post
            </Button>
          </div>
        </LocalizationProvider>
      </form>
      {!help ? <h6 className="model-outside-txt" style={{ marginTop: 10 }}>
        <strong onClick={() => history.goBack()}>Back</strong>
      </h6> : <div style={{ height: 22 }}/>}
    </div>
  )
}

export default Post