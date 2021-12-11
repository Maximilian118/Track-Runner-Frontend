import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { createPost } from '../shared/postRequests'
import DropZone from '../components/Utility/DropZone'
import { TextField, Autocomplete, InputAdornment, Box, Button } from '@mui/material'
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab'
import { PostAdd, Gesture, CropOriginal } from '@mui/icons-material'
import momentAdapter from '@date-io/moment'
import { updatePostForm, formValid, formCleanup } from '../shared/formValidation'
import { getTracks } from '../shared/trackRequests'
import PostHelp from '../components/Help/PostHelp'
import HelpIcon from '../components/Help/HelpIcon'
import { trackList } from '../shared/utility'
import CreateTrack from './CreateTrack'
import Spinner from '../components/Utility/Spinner'

const Post = ({ history }) => {
  const { user, setUser } = useContext(Context)
  const [ loading, setLoading ] = useState(false)
  const [ help, setHelp ] = useState(false)
  const [ tracks, setTracks ] = useState([])
  const [ tracksVal, setTracksVal ] = useState(null)
  const [ postForm, setPostForm ] = useState({
    title: "",
    description: "",
    trackID: "",
    geoID: "",
    geoURL: "",
    geoStats: null,
    lapTime: null,
    distance: null,
    timeOfRun: new Date(),
    dateOfRun: new Date(),
    imgs: [],
  })
  const [ formError, setFormError ] = useState({
    title: "",
    trackID: "",
    lapTime: "",
    distance: "",
    timeOfRun: "",
    dateOfRun: "",
  })
  
  useEffect(() => {
    const handleTracksReq = async () => setTracks(trackList(await getTracks(user, setUser, history)))
    handleTracksReq()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => formCleanup(postForm, setPostForm, formError, setFormError), []) // eslint-disable-line

  const handleCreatePost = e => {
    e.preventDefault()
    createPost(postForm, user, setUser, setLoading, history)
  }
  
  const noTrack = postForm.trackID === "" || postForm.trackID === "Not a Track"

  const standardValid = {
    title: postForm.title,
    trackID: postForm.trackID,
    lapTime: postForm.lapTime,
    distance: postForm.distance,
    timeOfRun: postForm.timeOfRun,
    dateOfRun: postForm.dateOfRun,
  }

  const noTrackValid = {
    title: postForm.title,
    geoID: postForm.geoID,
    timeOfRun: postForm.timeOfRun,
    dateOfRun: postForm.dateOfRun,
  }

  return postForm.trackID === "Create a Track" ? 
    <CreateTrack
      postForm={postForm} 
      setPostForm={setPostForm}
      tracks={tracks}
      setTracks={setTracks}
      setTracksVal={setTracksVal}
    /> : (
    <div className="model-wrapper">
      <form className="model">
        <LocalizationProvider dateAdapter={momentAdapter}>
          <div className="top">
            <h3>Post a run</h3>
            <HelpIcon help={help} setHelp={setHelp}/>
          </div>
          {help ? <PostHelp/> : 
            <div className="middle">
              {loading && <Spinner position="form"/>}
              <div className="middle-row">
                <TextField 
                  required
                  defaultValue={postForm.title}
                  error={!!formError.title}
                  variant="standard"
                  label="Title"
                  name="title"
                  className="mui-text-field"
                  inputProps={{
                    maxLength: 34,
                  }}
                  onChange={e => updatePostForm(e, postForm, setPostForm, formError, setFormError)}
                />
              </div>
              <div className="middle-row">
                <TextField
                  variant="standard"
                  defaultValue={postForm.description}
                  label="Description"
                  name="description"
                  multiline
                  maxRows={4}
                  className="mui-text-field"
                  onChange={e => updatePostForm(e, postForm, setPostForm, formError, setFormError)}
                />
              </div>
              <div className="middle-row" style={{ marginTop: 0 }}>
                <DropZone
                  required={postForm.trackID === "Not a Track"}
                  defaultValue={postForm.geoURL}
                  user={user} 
                  setUser={setUser}
                  form={postForm}
                  setForm={setPostForm}
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
                  value={tracksVal}
                  getOptionLabel={track => track.name}
                  onChange={(e, vals) => {
                    updatePostForm({
                      target: {
                        name: "trackID",
                        value: vals ? vals._id ? vals._id : vals.name : "",
                      }
                    }, postForm, setPostForm, formError, setFormError)
                    setTracksVal(vals)
                  }}
                  renderOption={(props, track) => 
                    <Box
                      {...props}
                      component="li" 
                      sx={{
                        '& > img': { mr: 2, flexShrink: 0 },
                        '& > svg': { width: 20, height: 20, mr: 2, flexShrink: 0 }, 
                      }} 
                    >
                      {typeof track.logo === 'string' ? <img loading="lazy" width="20" src={track.logo} alt=""/> : track.logo}
                      {track.name}
                    </Box>
                  }
                  renderInput={params => 
                    <TextField
                      {...params}
                      required
                      error={!!formError.trackID}
                      label="Select a track"  
                      className="mui-text-field"
                    />
                  }
                />
              </div>
              <div className="middle-row">
                <TimePicker
                  disabled={noTrack}
                  label="Best Lap"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  value={postForm.lapTime}
                  onChange={obj => updatePostForm({
                    target: {
                      name: "lapTime",
                      value: obj,
                    }
                  }, postForm, setPostForm, formError, setFormError)}
                  renderInput={(params) => 
                    <TextField
                      {...params}
                      required={postForm.trackID !== "Not a Track"}
                      className="mui-date-time"
                      error={!!formError.lapTime}
                      style={{ marginRight: 20 }}
                    />
                  }
                />
                <TextField
                  required={postForm.trackID !== "Not a Track"}
                  defaultValue={postForm.distance}
                  disabled={noTrack}
                  variant="outlined"
                  label="Total Dist"
                  name="distance"
                  placeholder="0.000"
                  className="mui-date-time"
                  onChange={e => updatePostForm(e, postForm, setPostForm, formError, setFormError)}
                  error={!!formError.distance}
                  InputProps={{
                    endAdornment: <InputAdornment 
                      position="end" 
                      className={noTrack ? "mui-input-ad-disabled" : ""}
                    >km</InputAdornment>,
                  }}
                />
              </div>
              <div className="middle-row">
                <TimePicker
                  label="Time of run *"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  value={postForm.timeOfRun}
                  onChange={(time) => {
                    updatePostForm({
                      target: {
                        name: "timeOfRun",
                        value: time,
                      }
                    }, postForm, setPostForm, formError, setFormError)
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
                  label="Date of run *"
                  mask="__/__/__"
                  inputFormat="DD/MM/YY"
                  className="mui-date-time"
                  value={postForm.dateOfRun}
                  onChange={(date) => {
                    updatePostForm({
                      target: {
                        name: "dateOfRun",
                        value: date,
                      }
                    }, postForm, setPostForm, formError, setFormError)
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
                  defaultValue={postForm.imgs}
                  user={user} 
                  setUser={setUser}
                  form={postForm}
                  setForm={setPostForm}
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
              disabled={!formValid(postForm.trackID === "Not a Track" ? noTrackValid : standardValid, formError)}
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