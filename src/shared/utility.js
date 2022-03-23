import { logout } from './localStorage'
import moment from 'moment'
import * as turf from '@turf/turf'
import { getCalendar } from './miscRequests'
import { AddRoad, RemoveCircleOutline } from '@mui/icons-material'

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

// Return an array of User data for StatsCard.
export const userStatsArr = user => {
  return [
    {
      name: "Posts",
      stat: user.posts.length,
    },
    {
      name: "Tracks",
      stat: user.tracks.length,
    },
    {
      name: "Images",
      stat: postImgArr(user.posts).length,
    },
    {
      name: "Likes",
      stat: user.likes.length,
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

// Find the Axios error. Find it damn it!
export const getAxiosError = error => {
  let e = error
  if (error.response) {
    e = error.response.data
    if (error.response.data && error.response.data.error) {
      e = error.response.data.error
    }
  } else if (error.message) {
    e = error.message
  } else {
    e = "Unknown error occured"
  }
  return e
}

export const endpoint = str => str.substring(str.lastIndexOf("/") + 1)
export const formatString = str => str.toLowerCase().replace(/[^a-z0-9]/g, "-")
export const getEndpoint = passed => endpoint(passed.type ? formatString(passed.name) : passed)

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

  const date = formatString(moment().format()) 
  const filename = formatString(file.name)

  return `${userID ? `${user._id}/` : ""}${category}${date}-${file.size}/${filename}`
}

// Check for a duplicate filename by comparing the filename endpoints.
export const isDuplicateFile = (currentFile, newFile) => {
  if (!currentFile || !newFile) {
    return
  }

  const currentF = endpoint(currentFile)
  const newF = endpoint(newFile)

  if (currentF === newF) {
    return true
  } else {
    return false
  }
}

// Check for a duplicate filename by comparing two arrays to see if any array items match.
// Arrays must contain Files or URL Strings.
export const isDuplicateArrFile = (arr1, arr2) => {
  const endpoints1 = arr1.map(passed => getEndpoint(passed))
  const endpoints2 = arr2.map(passed => getEndpoint(passed))
  return endpoints1.some(str => endpoints2.indexOf(str) >= 0)
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
export const unknownError = (setBackendError, setLoading) => {
  setBackendError({
    type: "email",
    message: "Oops! Something went wrong!"
  })
  setLoading(false)
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
          "y": item ? Number(item.toFixed(2)) : 0,
        }
      }),
    },
  ]
}

// Return an array of user activity for calendars.
export const activityData = (user, amount) => {
  const data = []

  // Initialise array with x amount of days.
  for (let i = 0; i < amount; i++) {
    data.push({
      value: 0,
      day: moment().subtract(i, 'days').format("YYYY-MM-DD"),
      colour: '#DDDDDD',
    })
  }

  // Add data to each array item.
  data.forEach(item => {
    user.posts.forEach(post => {
      if (moment(post.created_at).format("YYYY-MM-DD") === item.day) {
        return { ...item, value: item.value++ }
      } else {
        return item
      }
    })
  })

  // Assign a colour to each array item.
  return data.map(item => {
    if (item.value === 1) {
      return { ...item, colour: '#A7E0A7' } // Light shade of green.
    } else if (item.value === 2) {
      return { ...item, colour: '#7DCD7D' }
    } else if (item.value === 3) {
      return { ...item, colour: '#3FC13F' }
    } else if (item.value >= 4) {
      return { ...item, colour: '#00B200' } // Dark shade if green.
    } else {
      return item
    }
  })
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

export const trackList = trackArr => {
  const tracks = [
    {
      name: "Not a Track",
      logo: <RemoveCircleOutline/>,
    },
    {
      name: "Create a Track",
      logo: <AddRoad/>,
    },
  ]

  trackArr.forEach(track => {
    tracks.push(track)
  })

  return tracks
}

// If number exceeds limit, return limit with adornment.
export const numberLimit = (number, limit, adornment) => {
  if (number > limit) {
    return `${limit}${adornment ? adornment : `+`}`
  } else {
    return number
  }
}

// Update state and localStorage.
export const newStateAndLS = (setState, newState, ls, stringify) => {
  if (newState) {
    setState(newState)
    ls && localStorage.setItem(ls, stringify ? JSON.stringify(newState) : newState)
  }
}

// Convert Meters to km.
export const metersToKm = int => {
  if (int.toFixed(0).length >= 3) {
    return Number((int / 1000).toFixed(3))
  } else {
    return int
  }
}

// Separate a single array in to two arrays. 
// One with only negative numbers and one with only positive numbers.
export const separateNegPos = arr => {
  const neg = []
  const pos = []

  arr.forEach(int => {
    if (int >= 0) {
      pos.push(int)
    } else {
      neg.push(int)
    }
  })

  return {
    neg,
    pos,
  }
}

// Return an Array of images from given Array of Posts.
export const postImgArr = posts => {
  const imgArr = []

  posts.forEach(post => {
    imgArr.unshift(...post.imgs)
  })

  return imgArr
}