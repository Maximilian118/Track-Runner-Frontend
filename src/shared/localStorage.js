import moment from 'moment'
import { blankCal, removeKey } from '../shared/utility'
import { initPosts, initGeojsons } from '../shared/initRequestResult'

export const checkLocalStorage = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem("refresh_token")

  if (!token && !refreshToken) {
    return logout()
  } else {
    return {
      localStorage: true,
      token,
      _id: localStorage.getItem('_id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      icon: localStorage.getItem('icon'),
      profile_picture: localStorage.getItem('profile_picture'),
      posts: JSON.parse(localStorage.getItem('posts')),
      tracks: JSON.parse(localStorage.getItem('tracks')),
      geojsons: JSON.parse(localStorage.getItem('geojsons')),
      events: JSON.parse(localStorage.getItem('events')),
      following: JSON.parse(localStorage.getItem('following')),
      calendars: JSON.parse(localStorage.getItem('calendars')),
      rounds: JSON.parse(localStorage.getItem('rounds')),
      championships: JSON.parse(localStorage.getItem('championships')),
      likes: Number(localStorage.getItem('likes')),
    }
  }
}

export const logout = history => {
  localStorage.removeItem('_id')
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('icon')
  localStorage.removeItem('profile_picture')
  localStorage.removeItem('posts')
  localStorage.removeItem('tracks')
  localStorage.removeItem('geojsons')
  localStorage.removeItem('events')
  localStorage.removeItem('following')
  localStorage.removeItem('calendars')
  localStorage.removeItem('rounds')
  localStorage.removeItem('championships')
  localStorage.removeItem('likes')

  history && history.push('/login')
  return {}
}

export const logInSuccess = userObj => {
  if (!userObj.localStorage) {
    localStorage.setItem('_id', userObj._id)
    localStorage.setItem('token', userObj.token)
    localStorage.setItem('name', userObj.name)
    localStorage.setItem('email', userObj.email)
    localStorage.setItem('icon', userObj.icon)
    localStorage.setItem('profile_picture', userObj.profile_picture)
    localStorage.setItem('posts', JSON.stringify(initPosts(userObj.posts)))
    localStorage.setItem('tracks', JSON.stringify(userObj.tracks))
    localStorage.setItem('geojsons', JSON.stringify(initGeojsons(userObj.geojsons)))
    localStorage.setItem('events', JSON.stringify(userObj.events))
    localStorage.setItem('following', JSON.stringify(userObj.following))
    localStorage.setItem('calendars', JSON.stringify(userObj.calendars))
    localStorage.setItem('rounds', JSON.stringify(userObj.rounds))
    localStorage.setItem('championships', JSON.stringify(userObj.championships))
    localStorage.setItem('likes', userObj.likes)
  }

  return removeKey(userObj, "tokens")
}

export const checkCalLocalStorage = calScope => {
  const localCal = JSON.parse(localStorage.getItem('cal'))

  if (localCal && localCal.length > 0 && moment(localCal[0].date).isSame(moment().format(), "day")) {
    return localCal
  } else {
    return blankCal(calScope)
  }
}