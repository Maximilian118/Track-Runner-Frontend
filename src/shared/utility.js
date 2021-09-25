import { logout } from './localStorage'
import moment from 'moment'
import * as turf from '@turf/turf'
import { getCalendar } from './miscRequests'
import { compressImage } from './bucketRequests'

// Create a calendar based on user.calendars.
export const createCalendar = (user, setUser, calendar, setCalendar, calScope, history) => {
  const withTracks = calendar.some(e => e.track)
  const currentCals = localStorage.getItem('currentCals')
  const isSameCals = user.calendars && user.calendars.length > 0 && JSON.stringify(user.calendars) === currentCals
  const isF1Cal = currentCals !== JSON.stringify(["F1"])
  const tokenNoTracks = isSameCals && !withTracks

  if (user.calendars) {
    if (!isSameCals || tokenNoTracks) {
      getCalendar(user, setUser, setCalendar, calScope, history)
    } else if (user.calendars.length === 0 && withTracks) {
      setCalendar(blankCal(calScope))
    }
  } else if (isF1Cal || !withTracks) {
    getCalendar(user, setUser, setCalendar, calScope, history)
  }
}

// Parse a stringified array of rounds.
export const initRoundsString = string => {
  const parsed = JSON.parse(string)

  let roundArr = []

  parsed.forEach(async item => {
    if (item.round) {
      roundArr.push({
        ...item,
        sessions: JSON.parse(item.sessions),
        track: item.track ? {
          ...item.track,
          stats: JSON.parse(item.track.stats),
          geojson: item.track.geojson ? {
            ...item.track.geojson,
            geojson: JSON.parse(item.track.geojson.geojson),
            stats: JSON.parse(item.track.geojson.stats),
          } : null
        } : null
      })
    } else {
      roundArr.push(item)
    }
  })

  return roundArr
}

// Parse a track.
export const initTrack = track => {
  return {
    ...track,
    stats: JSON.parse(track.stats),
    geojson: {
      ...track.geojson,
      geojson: JSON.parse(track.geojson.geojson),
      stats: JSON.parse(track.geojson.stats),
    }
  }
}

// Return an array of User data for StatsCard.
export const userStatsArr = user => {
  return [
    {
      name: "Tracks",
      stat: user.tracks.length,
    },
    {
      name: "Posts",
      stat: user.posts.length,
    },
    {
      name: "Likes",
      stat: user.likes,
    },
  ]
}

// Find the next round date and return it.
export const nextTrack = calendar => {
  let track = {}
  let isToday = false
  let round = 0

  for (let i = 0; i < calendar.length; i++) {
    if (calendar[i].track) {
      track = calendar[i].track
      round = calendar[i].round
      isToday = moment(calendar[i].date).isSame(moment().format(), "day")
      break
    }
  }

  return {
    ...track,
    round,
    isToday,
  }
}

// Return a blank calendar.
export const blankCal = calScope => {
  let cal = []

  for (let i = 0; i < calScope; i++) {
    cal.push({
      date: moment().add(i, "d").format(),
      events: [],
    })
  }

  localStorage.setItem('cal', JSON.stringify(cal))
  return cal
}

// Format moment().format() to date for calendar display.
export const formatDate = date => {
  if (moment(date).format("D") === "1") {
    return moment(date).format("MMM D")
  } else {
    return moment(date).format("D")
  }
}

// Remove a key: value pair from context.
export const removeKey = (obj, prop) => {
  let {[prop]: omit, ...res} = obj
  return res
}

// If req res has tokens, use them. If not, return current token.
// If setUser is passed, setUser with new token as well.
export const useTokens = (user, tokens, setUser) => {
  if (tokens) {
    const parsedTokens = JSON.parse(tokens)

    if (setUser) {
      setUser({
        ...user,
        token: parsedTokens.access_token,
      })
    }

    localStorage.setItem("token", parsedTokens.access_token)
    localStorage.setItem("refresh_token", parsedTokens.refresh_token)
    return parsedTokens.access_token
  } else {
    return user.token
  }
}

// Add headers to a request
export const headers = token => {
  const refreshToken = localStorage.getItem("refresh_token")

  return {
    "Content-Type": "application/json",
    accessToken: `Bearer ${token}`,
    refreshToken: `Bearer ${refreshToken}`,
  }
}

// If no authentication, logout.
export const checkAuth = (errors, setUser, history) => {
  errors.forEach(err => {
    if (err.message === "Not Authenticated!") {
      setUser(logout(history))
    }
  })
}

// Return an initial array with compressed files for uploadToS3.
export const initFileArr = async (usage, acceptedFile, arrData, setThumb) => {
  let fileArr = []

  switch(usage) {
    case "profile-picture": fileArr = [
      {
        name: "profile-picture",
        blob: await compressImage(acceptedFile, 0.5, setThumb),
      },
      {
        name: "icon",
        blob: await compressImage(acceptedFile, 0.05),
      },
    ]; break
    case "track-logo": fileArr = [
      {
        name: "track-logo",
        blob: await compressImage(acceptedFile, 0.1, setThumb),
      },
    ]; break
    default: fileArr = [
      {
        name: "track-logo",
        blob: await compressImage(acceptedFile, 0.1, setThumb),
      },
    ]
  }

  if (fileArr.length > 0) {
    return fileArr.map(file => {
      if (arrData) {
        return {
          ...file,
          ...arrData,
        }
      } else {
        return file
      }
    })
  } else {
    console.log("fileArr empty")
  }
}

// Format name of all files to be uploaded to s3.
export const formatFilename = (user, file, category) => {
  if (!category) {
    console.log("You must pass a file category")
    return
  } else if (typeof category !== 'string') {
    console.log("category param must be of type string")
    return
  } else if (category.slice(-1) !== "/") {
    console.log("Last character in category string must be /")
    return
  }

  let userID = true
  if (category === "track-logo/") {
    userID = false
  }

  const date = moment().format().toLowerCase().replace(/[^a-z0-9]/g, "-")
  const filename = file.name.toLowerCase().replace(/[^a-z0-9]/g, "-")

  return `${userID ? `${user._id}/` : ""}${category}${date}-${file.size}/${filename}`
}

// Check for a duplicate filename by comparing the filename endpoints.
export const isDuplicateFile = (currentFile, newFile) => {
  const currentF = currentFile.substring(currentFile.lastIndexOf("/") + 1)
  const newF = newFile.substring(newFile.lastIndexOf("/") + 1)

  if (currentF === newF) {
    return true
  } else {
    return false
  }
}

// Get the initials of the user.
export const getInitials = user => {
  let names = user.name.split(' '),
    initials = names[0].substring(0, 1).toUpperCase()
  
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}

// Handle unknown backend errors.
export const unknownError = (setBackendError, setLocalLoading) => {
  setBackendError({
    type: "email",
    message: "Oops! Something went wrong!"
  })
  setLocalLoading(false)
}

// initialise a geojson ready to be used with Mapbox.
export const initGeojson = geojson => {
  const results = []
  const elevationArr = []

  for (let j = 0; j < geojson.features.length; j++) {
  const coords = geojson.features[j].geometry.coordinates

    for (let i = 0; i < coords.length; i++) {
      let feature = {}

      if (i === 0) {
        feature = turf.lineString([
          coords[i].slice(0, 2),
          turf.midpoint(turf.point(coords[i].slice(0, 2)), turf.point(coords[i + 1].slice(0, 2))).geometry.coordinates
        ])
      } else if (i === coords.length - 1) {
        feature = turf.lineString([
          turf.midpoint(turf.point(coords[i - 1].slice(0, 2)), turf.point(coords[i].slice(0, 2))).geometry.coordinates,
          coords[i].slice(0, 2)
        ])
      } else {
        feature = turf.lineString([
          turf.midpoint(turf.point(coords[i - 1].slice(0, 2)), turf.point(coords[i].slice(0, 2))).geometry.coordinates,
          coords[i].slice(0, 2),
          turf.midpoint(turf.point(coords[i].slice(0, 2)), turf.point(coords[i + 1].slice(0, 2))).geometry.coordinates
        ])
      }
      
      feature.properties = Object.assign({}, geojson.features[j].properties)
      feature.properties.elevation = coords[i][2]

      elevationArr.push(coords[i][2])
      results.push(feature)
    }
  }
  
  return {
    "type": "FeatureCollection",
    "features": results.map(feature => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          "elevation": feature.properties.elevation - Math.min(...elevationArr),
        }
      }
    })
  }
}

// Convert an Array of Numbers to data for @nivo/line.
export const lineGraphData = (id, arr) => {
  return [
    {
      id,
      data: arr.map((item, i) => {
        return {
          "x": i,
          "y": Number(item.toFixed(2)),
        }
      }),
    },
  ]
}

// Return an array of activity data for CalendarGraph.
export const ActivityData = user => {
  const data = []
  
  // user.posts.forEach(post => {
  //   const dateOfPost = moment(post.created_at).format("YYYY-MM-DD")

  //   if (data.filter((item) => { return item.day === dateOfPost }).length > 0) {
  //     data.forEach(item => {
  //       if (item.day === dateOfPost) {
  //         item.value++
  //       }
  //     })
  //   } else {
  //     data.push({
  //       day: dateOfPost,
  //       value: 1,
  //     })
  //   }
  // })

  return {
    data,
    date: moment().format("YYYY-MM-DD"),
  }
}

export const initNavIndicator = (user, history) => {
  if (user.token) {
    switch (history.location.pathname) {
      case "/": return 2
      case "/calendar": return 3 
      default: return 0
    }
  } else {
    return 0
  }
}

export const dropZoneText = (usage, canDragDrop, multiple, acceptedFiles, fileRejections, err) => {
  const suffix = canDragDrop ? multiple ? "or drag them here" : "or drag it here" : ""
  let text = <h2>Choose an image<br/>{suffix}</h2>

  const fileType = usage === "gpx" ? "Please select a GPX file" : "Please use JPEG or PNG"

  if (!navigator.onLine) {
    text = <h2>Offline!</h2>
  } else {
    // Defaults
    switch (usage) {
      case "gpx": text = <h2>Add a GPX File</h2>; break
      case "post": text = <h2>Add Images</h2>; break
      default: text = <h2>Choose an image<br/>{suffix}</h2>
    }

    // Check for errors/rejections.
    if (acceptedFiles.length > 0 && fileRejections.length > 0) {
      text = <h2>Multiple files!<br/>Please select one image</h2>
    } else if (fileRejections.length > 0) {
      switch (fileRejections[0].errors[0].code) {
        case "too-many-files": text = <h2>Multiple files!<br/>Please select one image</h2>; break
        case "file-invalid-type": text = <h2>Unsupported file type!<br/>{fileType}</h2>; break
        case "file-too-large": text = <h2>Woah there!<br/>10MB Maximum</h2>; break
        default: text = <h2>Choose an image<br/>{suffix}</h2>
        }
    } else if (err) {
      text = err
    }
  }
  
  return text
}

export const dropZoneThumb = (thumb, usage) => {
  let text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>

  switch (usage) {
    case "gpx": text = <h2 className="thumb-text">Change</h2>; break
    default: text = <h2 className="thumb-text">Change<br/>Profile Picture</h2>
  }

  return (
    <>
      {typeof thumb === 'string' ? <img alt="Thumbnail" src={thumb}/> : thumb}
      {text}
    </>
  )
}

export const handleDropZoneError = (setErr, setThumb, setLocalLoading, message, returnValue) => {
  setErr(<h2>{message}</h2>)
  setThumb("")
  setLocalLoading(false)
  return returnValue ? returnValue : message
}

export const handleDropZoneSuccess = (setErr, setLocalLoading, returnValue) => {
  setErr(null)
  setLocalLoading(false)
  return returnValue ? returnValue : "File uploaded!"
}

export const noNegs = (min, numArr) => {
  return numArr.map(num => {
    if (min < 0) {
      return num + Math.abs(min)
    } else {
      return num
    }
  })
}

export const XMLFileToString = async file => {
  return await new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(file)

    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}