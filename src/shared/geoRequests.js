import axios from 'axios'
import { useTokens, headers, checkAuth, getAxiosError, strsToInts } from './utility'

export const updateCoords = async (user, setUser, lng, lat, history) => {
  try {
    await axios.post('', {
      variables: {
        lng: JSON.stringify(lng),
        lat: JSON.stringify(lat),
      },
      query: `
        mutation UpdateCoords($lng: String!, $lat: String!) {
          updateCoords(lng: $lng, lat: $lat) {
            _id
            name
            coords
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        const coords = strsToInts(res.data.data.updateCoords.coords)

        await setUser({
          ...user,
          coords,
          token: useTokens(user, res.data.data.updateCoords.tokens),
        })
        
        localStorage.setItem('coords', JSON.stringify(coords))
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