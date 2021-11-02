import axios from 'axios'
import { useTokens, checkAuth, getAxiosError, headers } from './utility'
import { initTrack } from './initRequestResult'
import { handleDropZoneError, handleDropZoneSuccess } from '../components/Utility/DropZone/DropZoneUtility'
import { populateTrack } from './requestPopulation'
import { redundantFilesCheck } from './bucketRequests'
import { getGeoInfo } from './miscRequests'

export const createTrack = async (user, setUser, form, postForm, setPostForm, tracks, setTracks, setTracksVal, history) => {
  if (!form.geoID && !form.gpx) {
    console.log("No geojson or gpx found.")
    return
  } else if (!form.coords) {
    console.log("No coordinates found.")
    return
  }

  const geo = await getGeoInfo(form.coords.lat, form.coords.lon)

  try {
    await axios.post('', {
      variables: {
        user_id: user._id,
        name: form.name,
        country: geo.country,
        location: geo.region,
        logo: form.logo,
        stats: form.stats ? JSON.stringify(form.stats) : null,
        gpx: form.gpx ? form.gpx : null,
        geojson: form.geoID ? form.geoID : null,
      },
      query: `
        mutation CreateTrack($user_id: ID, $name: String!, $country: String!, $location: String!, $gpx: String, $geojson: ID, $logo: String, $stats: String) {
          createTrack(trackInput: {user_id: $user_id, name: $name, country: $country, location: $location, gpx: $gpx, geojson: $geojson, logo: $logo, stats: $stats}) {
            ${populateTrack}
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        const track = initTrack(res.data.data.createTrack)

        setPostForm({
          ...postForm,
          trackID: track._id,
        })

        setTracks([
          ...tracks,
          track,
        ])

        setTracksVal(track)
        
        useTokens(user, res.data.data.createTrack.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    console.log(err)
  }
}

export const getTrack = async (user, setUser, user_id, post_id, track_id, name, history) => {
  try {
    await axios.post('', {
      variables: {
        user_id,
        post_id,
        track_id,
        name,
      },
      query: `
        query Track($user_id: ID, $post_id: ID, $track_id: ID, $name: String) {
          track(user_id: $user_id, post_id: $post_id, track_id: $track_id, name: $name) {
            ${populateTrack}
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        console.log(res.data.data.track)
        useTokens(user, res.data.data.track.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    console.log(err)
  }
}

export const getTracks = async (user, setUser, history) => {
  let tracksArr = []

  try {
    await axios.post('', {
      query: `
        query {
          track {
            tracks
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        tracksArr = JSON.parse(res.data.data.track.tracks)
        useTokens(user, res.data.data.track.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    console.log(err)
  }

  return tracksArr
}

export const updateTrackLogo = async (user, setUser, calendar, setCalendar, track_id, name, logo, history, setLocalLoading, setErr, setThumb) => {
  const calledInDropZone = setErr && setThumb && setLocalLoading
  
  try {
    await axios.post('', {
      variables: {
        track_id,
        name,
        logo,
      },
      query: `
        mutation UpdateTrackLogo($track_id: ID, $name: String, $logo: String!) {
          updateTrackLogo(track_id: $track_id, name: $name, logo: $logo) {
            ${populateTrack}
          }
        }
      `
    }, {headers: headers(user.token)}).then(async res => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Track Logo."))
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        const trackName = res.data.data.updateTrackLogo.name 
        const newTrackLogo = res.data.data.updateTrackLogo.logo

        const newCal = await Promise.all(calendar.map(round => {
          if (round.track) {
            return {
              ...round,
              track: {
                ...round.track,
                logo: round.track.name === trackName ? newTrackLogo : round.track.logo,
              }
            }
          } else {
            return round
          }
        }))

        setCalendar(newCal)
        localStorage.setItem('cal', JSON.stringify(newCal))

        useTokens(user, res.data.data.updateTrackLogo.tokens, setUser)
        redundantFilesCheck(user, setUser, history)
        calledInDropZone && handleDropZoneSuccess(setErr, setLocalLoading)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      checkAuth(err.response.data.errors, setUser, history)
      calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Track Logo."))
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    calledInDropZone && console.log(handleDropZoneError(setErr, setThumb, setLocalLoading, "Failed to update Track Logo."))
    process.env.NODE_ENV === 'development' && console.log(err)
  }
}