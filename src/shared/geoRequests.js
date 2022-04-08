import axios from 'axios'
import { useTokens, headers, checkAuth, getAxiosError } from './utility'
import { locationFields } from './requestPopulation'
import { initLocation } from './initRequestResult'

export const updateLocation = async (user, setUser, location, history) => {
  try {
    await axios.post('', {
      variables: {
        location: JSON.stringify(location),
      },
      query: `
        mutation UpdateLocation($location: String!) {
          updateLocation(location: $location) {
            _id
            name
            location ${locationFields}
            tokens
          }
        }
      `
    }, {headers: headers(user.token)}).then(async res => {
      if (res.data.errors) {
        process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      } else {
        const locationData = initLocation(res.data.data.updateLocation.location)

        await setUser({
          ...user,
          location: locationData,
          token: useTokens(user, res.data.data.updateLocation.tokens),
        })
        
        localStorage.setItem('location', JSON.stringify(locationData))
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