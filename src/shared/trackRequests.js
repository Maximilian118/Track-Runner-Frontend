import axios from 'axios'
import { useTokens, checkAuth, getAxiosError, headers, initTrack } from './utility'
import { handleDropZoneError, handleDropZoneSuccess } from '../components/Utility/DropZone/DropZoneUtility'
import { populateTrack } from './requestPopulation'
import { redundantFilesCheck } from './bucketRequests'

export const createTrack = async (user, setUser, track, history) => {
  try {
    await axios.post('', {
      variables: {
        user_id: null,
        name: track.name,
        country: track.country,
        location: track.location,
        logo: track.logo,
        stats: JSON.stringify(track.stats),
        gpx: track.gpx,
      },
      query: `
        mutation CreateTrack($user_id: ID, $name: String!, $country: String!, $location: String!, $gpx: String, $logo: String!, $stats: String!) {
          createTrack(trackInput: {user_id: $user_id, name: $name, country: $country, location: $location, gpx: $gpx, logo: $logo, stats: $stats}) {
            ${populateTrack}
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        console.log(initTrack(res.data.data.createTrack))
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