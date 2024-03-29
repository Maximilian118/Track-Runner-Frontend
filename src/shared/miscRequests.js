import axios from 'axios'
import { useTokens, checkAuth, getAxiosError, headers, newStateAndLS } from './utility'
import { initRoundsString } from './initRequestResult'
import mbxClient from '@mapbox/mapbox-sdk/services/static'
import { populateLike } from '../shared/requestPopulation'

export const createChampionship = async (user, setUser, championship, history) => {
  try {
    await axios.post('', {
      variables: {
        user_id: user._id,
        championship: JSON.stringify(championship),
      },
      query: `
        mutation CreateChampionship($user_id: ID, $championship: String!) {
          createChampionship(champInput: {user_id: $user_id, championship: $championship}) {
            rounds
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        console.log(initRoundsString(res.data.data.createChampionship.rounds))
        useTokens(user, res.data.data.createChampionship.tokens, setUser)
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

export const createRound = async (user, setUser, roundObj, history) => {
  try {
    await axios.post('', {
      variables: {
        user_id: user._id,
        roundObj: JSON.stringify(roundObj),
      },
      query: `
        mutation CreateRound($user_id: ID, $roundObj: String!) {
          createRound(roundInput: {user_id: $user_id, roundObj: $roundObj}) {
            rounds
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        console.log(res.data.data.createRound.rounds)
        useTokens(user, res.data.data.createRound.tokens, setUser)
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

export const getChampionship = async (user, setUser, championship, history) => {
  try {
    await axios.post('', {
      variables: {
        championship,
      },
      query: `
        query Championship($championship: String!) {
          championship(championship: $championship) {
            rounds
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        console.log(initRoundsString(res.data.data.championship.rounds))
        useTokens(user, res.data.data.championship.tokens, setUser)
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

export const getCalendar = async (user, setUser, setCalendar, calScope, history) => {
  try {
    await axios.post('', {
      variables: {
        calendar: user.calendars ? user.calendars[0] : "F1",
        calScope,
      },
      query: `
        query Calendar($calendar: String!, $calScope: Int) {
          calendar(calendar: $calendar, calScope: $calScope) {
            rounds
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        user.token && checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        localStorage.setItem('currentCals', JSON.stringify(user.calendars ? user.calendars : ["F1"]))
        const parsedCal = initRoundsString(res.data.data.calendar.rounds)
        setCalendar(parsedCal)
        localStorage.setItem('cal', JSON.stringify(parsedCal))
        user.token && useTokens(user, res.data.data.calendar.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      user.token && checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    console.log(err)
  }
}

export const getMapBoxStatic = (geojson, width, height, highRes, withLogo, withAtt, padding) => {
  try {
    const mbxStaticClient = mbxClient({ accessToken: process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN })

    const request = mbxStaticClient.getStaticImage({
      ownerId: 'track-runner',
      styleId: 'ckqjpfiyl04t118mugkuokdm6',
      width: width,
      height: height,
      position: 'auto',
      logo: withLogo ? true : false,
      attribution: withAtt ? true : false,
      highRes: highRes ? true : false,
      padding: padding ? padding : null,
      overlays: [
        {
          path: {
            strokeColor: "FF0000",
            strokeWidth: 2.2,
            strokeOpacity: 1,
            coordinates: geojson.features[0].geometry.coordinates.map(coords => [coords[0], coords[1]]),
          },
        },
      ],
    })

    return request.url()
  } catch (err) {
    console.log(getAxiosError(err))
  }
}

export const getGeoLocation = async (lat, lon) => {
  let info = null

  try {
    await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_POSITION_STACK_KEY}&query=${lat},${lon}`).then(res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        info = {
          ...res.data.data[0],
          longitude: lon,
          latitude: lat,
        }
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      process.env.NODE_ENV === 'development' && console.log(err)
    })
  } catch (err) {
    console.log(err)
  }

  return info
}

export const like = async (user, setUser, feed, setFeed, object_type, object_id, action, history) => {
  let oldFeed = feed
  let newFeed = null

  switch (action) {
    case "add": newFeed = feed.map(post => {
      if (post._id === object_id) {
        return { ...post, likes: [ ...post.likes, user._id ] }
      } else {
        return post
      }
    }); break
    case "remove": newFeed = feed.map(post => {
      if (post._id === object_id) {
        return { ...post, likes: post.likes.filter(user_id => user_id !== user._id) }
      } else {
        return post
      }
    }); break
    default: newFeed = null
  }

  newStateAndLS(setFeed, newFeed, 'feed', true)

  try {
    await axios.post('', {
      variables: {
        object_type,
        object_id,
        action,
      },
      query: `
        mutation Like($object_type: String!, $object_id: ID!, $action: String!) {
          like(object_type: $object_type, object_id: $object_id, action: $action) {
            ${populateLike}
          }
        }
      `
    }, {headers: headers(user.token)}).then(async (res) => {
      if (res.data.errors) {
        newStateAndLS(setFeed, oldFeed, 'feed', true)
        checkAuth(res.data.errors, setUser, history)
        process.env.NODE_ENV === 'development' && console.log(res.data)
      } else {
        useTokens(user, res.data.data.like.tokens, setUser)
        process.env.NODE_ENV === 'development' && console.log(res)
      }
    }).catch(err => {
      newStateAndLS(setFeed, oldFeed, 'feed', true)
      checkAuth(err.response.data.errors, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(getAxiosError(err))
    })
  } catch (err) {
    newStateAndLS(setFeed, oldFeed, 'feed', true)
    console.log(err)
  }
}